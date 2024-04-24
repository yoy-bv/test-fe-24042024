import { Container } from 'react-bootstrap';
import React from 'react';

import Header from '@/components/common/header/index.component';
import PostsComponent from '@/components/posts/index.component';

function PostsPage() {
  return <div >
    <Header />
    <Container>
      <PostsComponent />
    </Container>
  </div>;
}

export default PostsPage;
