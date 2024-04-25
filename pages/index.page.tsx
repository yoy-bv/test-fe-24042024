import { Container } from 'react-bootstrap';
import React from 'react';
import Link from 'next/link';

import Header from '@/components/common/header/index.component';

function IndexPage() {
  return <div >
    <Header />
    <Container>
      <h1 className="text-center mb-3">Home Page</h1>
      <ul>
        <li>List Post: Button <Link href='/posts'>Posts Page</Link>
          <p>- Vì api POST comment k có nên e đang xử lí post comment local</p>
        </li>
        <li>List Albums: Button <Link href='/albums'>Album Images</Link></li>
      </ul>
    </Container>
  </div>;
}

export default IndexPage;
