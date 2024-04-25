import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'redux/store';
import { storePosts } from '@/base/redux/reducers/posts.reducer';
import { fetchPosts } from '@/api/posts';
import { Posts } from '@/base/types/posts';
import PostCard from './postCard.component';
import Loading from '../loader/index.component';

const DEFAULT_LIMIT = 10
export default function PostsComponent() {
  const dispatch = useDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    loadPosts();
  }, [limit])

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetchPosts(`${limit}`);
      dispatch(storePosts(res.data));
      setLoading(false);

      if (limit > res.data.length) {
        setAllLoaded(true)
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight && !allLoaded
    ) {
      setLimit((prevLimit) => prevLimit + DEFAULT_LIMIT);
    }
  };

  useEffect(() => {
    !allLoaded && window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [allLoaded]);

  return (
    <div className="posts-page">
      <h1 className="text-center mb-3">List Posts</h1>
      <div>
        {Array.isArray(posts) && posts?.map((post: Posts) => {
          return <PostCard key={post.id} post={post} />;
        })}
        {loading && <Loading />}
      </div>
    </div>
  );
}
