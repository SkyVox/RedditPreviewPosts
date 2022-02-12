import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import {
    StyledLine,
    Title,
    Content,
    StyledBox,
    RedirectPageBox,
    RedirectButton
} from './style';
import { REDDIT_URL } from "../../services/api";

export const Preview = (props: any) => {
    const { post, redirect } = props;
    const isMedia: boolean = post.thumbnail && post.thumbnail !== 'self';
    const navigate = useNavigate();

    const handleRedirectButton = () => {
        navigate({
            pathname: '',
            search: `?${createSearchParams({
                id: `${post.id}`
            })}`
        });
    }

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

                {
                    redirect ?
                    <RedirectPageBox>
                        <RedirectButton onClick={handleRedirectButton}>Full Post Information</RedirectButton>
                        <RedirectButton onClick={() => window.open(`${REDDIT_URL}${post.permalink}`, '_blank')}>See on Reddit</RedirectButton>
                    </RedirectPageBox> :
                    null
                }
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
                <img src={imageSrc} alt={post.id} width={'50%'} height={'50%'} onError={() => setImageSrc(post.thumbnail)} />
            }
        </>
    );
}

const LoadText = (props: any) => {
    const { text } = props;
    return <span>{text}</span>;
}