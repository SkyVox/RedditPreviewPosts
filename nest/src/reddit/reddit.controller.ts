import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
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

  @Get('/topics/:topic')
  async findPosts(@Param('topic') topic: string): Promise<IPostValue> {
    const url = `https://www.reddit.com/r/${topic}.json`;
    const currentDate = new Date();

    const compareTopic = (value: string) => {
      return topic.toLowerCase() === value.toLowerCase();
    }

    const cachedPost = this.requestedPosts.find(element => compareTopic(element.topic));

    if (cachedPost && cachedPost.request_date > currentDate) {
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

  @Get('/popular:limit?')
  async popularTopics(@Query('limit') limit?: number | undefined) {
    limit = limit ? limit : 5;
    const url = `https://reddit.com/subreddits/popular.json?limit=${limit}`;

    try {
      const data = await this.httpService.get(url).pipe(map(ret => ret.data.data.children));
      return data;
    } catch (error) {
      console.error(error);
    }
    
    return [];
  }

  @Get('/like/:id')
  async like(@Param('id') id: string) {
    let ret = 0;

    try {
      const data = await this.redditService.getData(id, 'like_amount');

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

    for (const property in body) {
      if (property === 'id') continue;

      if (property == 'comments') {
        ret['$push'] = {
          comments: body['comments']
        }
      } else if (body[property]) {
        if (!ret['$inc']) ret['$inc'] = {};
        ret['$inc'][property] = body[property];
      }
    }

    try {
      await this.redditService.updateData(id, ret);
      return true;
    } catch (error) {
      console.error(error);
    }

    return false;
  }
}