import { Preview } from '../../preview';
import {
    CenteredDiv
} from './style';

export const ShowTopics = (props: any) => {
    const { posts } = props;

    return (
        <CenteredDiv>
            {
                posts && posts.length > 0 ?
                posts.map((post: any, index: number) => <Preview redirect={true} key={post.data.id | index} post={post.data} />) :
                <NoPostsFound />
            }
        </CenteredDiv>
    );
}

const NoPostsFound = () => {
    return (
        <div>
            <p>Could not found any posts with this specific topic. Please try again.</p>
        </div>
    );
}