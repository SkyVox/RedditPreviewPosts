import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommentDto } from '../dto/reddit-comments.dto';

export type RedditDocument = Reddit & Document;

@Schema()
export class Reddit {

    @Prop()
    id: string;

    @Prop()
    like_amount: number;

    @Prop()
    dislike_amount: number;

    @Prop()
    comments: CommentDto[];
}

export const RedditSchema = SchemaFactory.createForClass(Reddit);