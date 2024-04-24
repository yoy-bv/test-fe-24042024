import React from 'react';
import Header from '@/components/common/header/index.component'; import { Container } from 'react-bootstrap';

import PostDetailComponent from '@/components/posts/postDetail.component';

export default function PostDetailPage() {
  return (
    <div>
      <Header />
      <Container>
        <PostDetailComponent />
      </Container>
    </div>
  );
}
