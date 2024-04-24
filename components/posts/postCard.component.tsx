
import { Posts } from '@/base/types/posts';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PostCard = {
  post: Posts
}
export default function PostCard({ post }: PostCard) {

  return (
    <>
      <div className='post-card'>
        <Link href={`posts/${post.id}`}><h2 className='title'>{post.title}</h2></Link>
        <p>{post.body}</p>
      </div>
    </>
  )
}
