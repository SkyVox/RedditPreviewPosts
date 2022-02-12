import { useState } from 'react';
import {
    CommentWrap,
    CommentBox,
    AddCommentBox,
    AddCommentInput,
    AddCommentButton,
    Comment
} from './style';
import { put } from '../../services/api';

export const Comments = (props: any) => {
    const [ commentInput, setCommentInput ] = useState<string>("");
    const { id, postData, setPostData } = props;

    const handleAddCommend = () => {
        const data = {...postData};
        data?.comments?.push({
            user: "Admin",
            date: new Date().toISOString(),
            comment: commentInput
        });

        setPostData(data);
        setCommentInput("");

        // Save this comment.
        updateComment();
    }

    const updateComment = async () => {
        const data = {
            id: id,
            comments: postData.comments
        }
        const ret = await put('update', data);
        return ret;
    }

    const handleKeyUp = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleAddCommend();
        }
    }

    return (
        <CommentWrap>
            <h3>List of comments:</h3>
            <CommentBox>
                {
                    postData?.comments?.map((comment: any, index: number) => <LoadComment key={index} comment={comment} />)
                }
            </CommentBox>
            <AddCommentBox>
                <AddCommentInput type="text" placeholder={"What you think about the post you see?"} onKeyUp={(event) => handleKeyUp(event)} value={commentInput} onChange={event => setCommentInput(event.target.value)} />
                <AddCommentButton onClick={handleAddCommend}>Add Comment</AddCommentButton>
            </AddCommentBox>
        </CommentWrap>
    );
}

const LoadComment = (props: any) => {
    const { comment } = props;

    return (
        <Comment>
            <h4>{comment.user}</h4>
            <h6>{comment.date}</h6>
            <h5>{comment.comment}</h5>
        </Comment>
    );
}