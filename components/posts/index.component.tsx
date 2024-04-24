import { Container } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'redux/store'
import { storePosts } from '@/base/redux/reducers/posts.reducer';
import { fetchPosts } from '@/api/posts';
import { Posts } from '@/base/types/posts';
import PostCard from './postCard.component';
import Loading from '../loader/index.component';

export default function PostsComponent() {
  const dispatch = useDispatch();
  const posts = useAppSelector((state) => state.posts.posts)
  const limit = 100

  useEffect(() => {
    const listPosts = async () => {
      try {
        const res = await fetchPosts(`${limit}`)
        dispatch(storePosts(res.data))
      } catch (error) {
        console.error('Error:', error)
      }
    };
    listPosts();

  }, [])

  return (
    <div className='posts-page'>
      <h1 className='text-center mb-3'>List Posts</h1>
      <div>
        {!posts && <Loading />}
        {posts?.map((post: Posts) => {
          return <PostCard key={post.id} post={post} />
        })}
      </div>
    </div>
  );
}
