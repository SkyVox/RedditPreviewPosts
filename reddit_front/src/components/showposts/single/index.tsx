import { useEffect, useState } from "react";
import { faThumbsUp, faThumbsDown, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Preview } from "../../preview";
import { Comments } from "../../comments";
import {
    CenteredDiv,
    PostInformation,
    InteractiveButtons,
    InteractiveIcon
} from './style';
import { get, put } from '../../../services/api';

type thumbs = 'like_amount' | 'dislike_amount';
interface IComment {
    user: string;
    date: Date;
    comment: string;
}
interface IPostUpdate {
    id: string;
    like_amount?: number;
    dislike_amount?: number;
    comments?: IComment;
}

export const ShowPost = (props: any) => {
    const { id, post } = props;

    return (
        <CenteredDiv>
            {
                post ?
                <LoadPost {...props} /> :
                <p>We could not find this post: {id}</p>
            }
        </CenteredDiv>
    );
}

const LoadPost = (props: any) => {
    const [ postData, setPostData ] = useState<any>(null);
    const { id, post } = props;

    const handleThumbs = async (type: thumbs) => {
        const data: IPostUpdate = {
            id: id
        }
        data[type] = 1;
        const updated: boolean = await updatePostData(data);
        
        if (updated) {
            const value = {...postData};
            value[type]+=1;
            setPostData(value);
        }
    }

    const loadPostData = async () => {
        const data: any = await get(`data/${id}`);
        setPostData(data);
    };

    const updatePostData = async (data: IPostUpdate) => {
        const ret = await put('update', data);
        return ret;
    }

    useEffect(() => {
        loadPostData();
    }, []);

    return (
        <CenteredDiv>
            <Preview post={post.data} />

            <PostInformation>
                <InteractiveButtons>
                    {postData?.like_amount}
                    <InteractiveIcon icon={faThumbsUp} size={'2x'} onClick={() => handleThumbs('like_amount')} />
                    {postData?.dislike_amount}
                    <InteractiveIcon icon={faThumbsDown} size={'2x'} onClick={() => handleThumbs('dislike_amount')} />
                    <InteractiveIcon icon={faCommentDots} size={'2x'} />
                </InteractiveButtons>
                <Comments id={id} postData={postData} setPostData={setPostData} />
            </PostInformation>
        </CenteredDiv>
    );
}