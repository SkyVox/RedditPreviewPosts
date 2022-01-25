import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reddit, RedditDocument } from './schema/reddit.schema';

type search_type = 'like_amount' | 'dislike_amount';

@Injectable()
export class RedditService {

  // Constructor.
  constructor(@InjectModel(Reddit.name) private redditModel: Model<RedditDocument>) {}

  getValue(id: string, select_field: search_type) {
    return this.redditModel.findOne({ id: id.toLowerCase() }).select(select_field);
  }
}