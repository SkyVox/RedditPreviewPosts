import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { CommentDto } from './dto/reddit-comments.dto';

interface IPostValue {
  topic: string;
  data: any;
  request_date: Date;
}

/**
 * Any value on this object is optional.
 */
interface IPostUpdate {
  id: string;
  like_amount?: number;
  dislike_amount?: number;
  comments?: CommentDto;
}

/**
 * TODO: Status Code.
 */

@Controller('reddit/post')
export class RedditController {
  private requestedPosts: IPostValue[] = [];

  // Constructor.
  constructor(private readonly redditService: RedditService, private httpService: HttpService) {}

  @Get('/:topic')
  async findPosts(@Param('topic') topic: string): Promise<IPostValue> {
    const url = `https://www.reddit.com/r/${topic}.json`;
    const currentDate = new Date();

    const compareTopic = (value: string) => {
      return topic.toLowerCase() === value.toLowerCase();
    }

    const cachedPost = this.requestedPosts.find(element => compareTopic(element.topic));

    if (cachedPost && cachedPost.request_date > currentDate) {
      console.log('cached!');
      return cachedPost;
    } else {
      // We could edit the existing one instead of removing it.
      this.requestedPosts = this.requestedPosts.filter(element => !compareTopic(element.topic));
    }

    try {
      const data = await lastValueFrom(this.httpService.get(url).pipe(map(ret => ret.data.data.children)));
      
      const ret = {
        topic: topic,
        data: data,
        request_date: new Date(currentDate.getTime() + 1 * 60000)
      }

      this.requestedPosts.push(ret);

      return ret;
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/like/:id')
  async like(@Param('id') id: string) {
    let ret = 0;

    try {
      const data = await this.redditService.getValue(id, 'like_amount');

      if (data) {
        ret = data.like_amount;
      }
    } catch (error) {
      console.error(error);
    }

    // Return the amount of stored likes that this post have.
    return ret;
  }

  @Put('/update')
  async update(@Body() body: IPostUpdate) {
    const id = body.id;
    const ret = {};

    const buildUpdate = (field: string) => {
      const value = body[field];
      if (value) {
        ret[field] = value;
      }
    }
    
    buildUpdate('like_amount');
    buildUpdate('dislike_amount');
    buildUpdate('comments');
  }
}