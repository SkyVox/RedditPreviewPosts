import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import { get } from '../../services/api';
import { ShowPost } from '../../components/showposts/single';
import { ShowTopics } from '../../components/showposts/multiples';

export const ShowPosts = () => {
    const [ posts, setPosts ] = useState<any[] | undefined>(undefined);
    const { community } = useParams();
    const [ search ] = useSearchParams();
    const id: string | null | undefined = search.get('id');

    const loadTopics = useCallback(async () => {
        const value: any = await get(`topics/${community}`);
        setPosts(value.data);
    }, [community]);

    useEffect(() => {
        loadTopics();
    }, [loadTopics]);

    return id ? <ShowPost id={id} post={posts?.filter(element => element.data.id === id)[0]} /> : <ShowTopics posts={posts} />
}