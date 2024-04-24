import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image'
import _ from 'lodash';


import { fetchDetailPost, fetchCommentByIdPost } from '@/api/posts';
import PostCard from './postCard.component';
import { Posts, Comment } from '@/base/types/posts';
import Loading from '../loader/index.component';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import Textarea from '../input/typing/Textarea';


type FormComment = Comment;

export default function PostDetailComponent() {
  const [postDetail, setPostDetail] = useState<Posts | {}>({})
  const [comments, setComments] = useState<Comment[]>([])
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const listPosts = async () => {
      try {
        const res = await fetchDetailPost(`${id}`)
        setPostDetail(res.data)
      } catch (error) {
        console.error('Error:', error)
      }
    };

    const listComments = async () => {
      try {
        const res = await fetchCommentByIdPost(`${id}`)
        setComments(res.data)
      } catch (error) {
        console.error('Error:', error)
      }
    };

    if (id) {
      listPosts();
      listComments();
    }

  }, [id])

  const { handleSubmit, control, reset } = useForm<FormComment>();
  const onComment = (formData: FormComment) => {
    const newComment = {
      userId: 1,
      id: comments.length + 1,
      postId: postDetail.id,
      email: '',
      name: 'Current User Test',
      body: formData.body
    }
    setComments([...comments, newComment])
    reset()
  };

  return (
    <div className='post-detail-page'>
      <h1 className='text-center'>Post Detail</h1>
      {
        _.isEmpty(postDetail) ? <Loading /> :
          <>
            <div className='mt-4 mb-4'>
              <div className='post-card'>
                <h2>{postDetail.title}</h2>
                <p>{postDetail.body}</p>
              </div>
            </div>
            <div className="">
              <div className="be-comment-block">
                <h1 className="comments-title">Comments ({comments?.length || 0})</h1>
                <div className="be-comment">
                  {comments.map((comment) =>
                    <div key={comment.id}>
                      <div className="be-img-comment">
                        <a href="blog-detail-2.html">
                          <Image width={30} height={30} src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="be-ava-comment" />
                        </a>
                      </div>
                      <div className="be-comment-content">

                        <span className="be-comment-name">
                          {comment.name}
                        </span>

                        <p className="be-comment-text">
                          {comment.body}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
                <Form onSubmit={handleSubmit(onComment)} className="d-flex flex-column w-100 gap-24px mt-4">
                  <Form.Group controlId="body">
                    <Textarea
                      control={control}
                      name="body"
                      type="text"
                      placeholder='your text'
                      data-testid="password_input"
                    />
                  </Form.Group>
                  <button type="submit" className="btn btn-primary pull-right">Comment</button>
                </Form>
              </div>
            </div>
          </>
      }

    </div>
  );
}
