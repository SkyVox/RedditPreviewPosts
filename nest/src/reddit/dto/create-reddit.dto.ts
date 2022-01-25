import { CommentDto } from "./reddit-comments.dto";

export class CreateRedditDto {
    id: string;
    like_amount: number;
    dislike_amount: number;
    comments: CommentDto[];
}