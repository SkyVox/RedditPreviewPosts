import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../services/api';
import {
    StyledBox,
    StyledLine,
    Title,
    Content,
    CenteredDiv
} from './style';

export const ShowPosts = () => {
    const { community } = useParams();
    const [ posts, setPosts ] = useState<any[] | undefined>(undefined);

    const loadTopics = async () => {
        const value: any = await get(`topics/${community}`);
        setPosts(value.data);
    }

    useEffect(() => {
        loadTopics();
    }, []);

    return (
        <CenteredDiv>
            {
                posts && posts.length > 0 ?
                posts.map((post, index) => <ShowPost key={post.data.id | index} post={post.data} />) :
                <NoPostsFound />
            }
        </CenteredDiv>
    );
}

const ShowPost = (props: any) => {
    const { post } = props;
    const isMedia: boolean = post.thumbnail && post.thumbnail !== 'self';

    return (
        <>
            <StyledBox>
                <Title>{post.title}</Title>
                <Content>
                    {
                        isMedia ?
                        <LoadMedia isVideo={post.is_video} {...props} /> :
                        <LoadText text={post.selftext} />
                    }
                </Content>
            </StyledBox>
            <StyledLine />
        </>
    );
}

const LoadMedia = (props: any) => {
    const { post, isVideo } = props;
    const [ imageSrc, setImageSrc ] = useState<string | undefined>(post.url);

    return (
        <>
            {
                isVideo ?
                <video width={'50%'} height={'50%'} controls={true}>
                    <source src={post.media.reddit_video.fallback_url} />
                </video> :
                <img src={imageSrc} width={'50%'} height={'50%'} onError={() => setImageSrc(post.thumbnail)} />
            }
            {
                post.selftext ?
                <LoadText text={post.selftext} /> :
                null
            }
        </>
    );
}

const LoadText = (props: any) => {
    const { text } = props;

    return (
        <>
            {text}
        </>
    );
}

const NoPostsFound = () => {
    return (
        <div>
            <p>Could not found any posts with this specific topic. Please try again.</p>
        </div>
    );
}