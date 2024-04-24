import { Container } from 'react-bootstrap';
import React from 'react';

import Header from '@/components/common/header/index.component';

function IndexPage() {
  return <div >
    <Header />
    <Container>
      <h1>Home Page</h1>
    </Container>
  </div>;
}

export default IndexPage;
