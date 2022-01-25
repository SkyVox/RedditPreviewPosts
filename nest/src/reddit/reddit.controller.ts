import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { CreateRedditDto } from './dto/create-reddit.dto';
import { UpdateRedditDto } from './dto/update-reddit.dto';
import { HttpService } from '@nestjs/axios';

@Controller('reddit')
export class RedditController {

  // Constructor.
  constructor(private readonly redditService: RedditService, private httpService: HttpService) {}

  @Post()
  create(@Body() createRedditDto: CreateRedditDto) {
    return this.redditService.create(createRedditDto);
  }

  @Get()
  findAll() {
    return this.redditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redditService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRedditDto: UpdateRedditDto) {
    return this.redditService.update(+id, updateRedditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redditService.remove(+id);
  }
}