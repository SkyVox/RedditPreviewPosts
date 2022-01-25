import { Module } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { RedditController } from './reddit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reddit, RedditSchema } from './schema/reddit.schema';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reddit.name, schema: RedditSchema }]),
    HttpService
  ],
  controllers: [RedditController],
  providers: [RedditService]
})

export class RedditModule {}