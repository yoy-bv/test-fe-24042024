import React from 'react';
import { Container } from 'react-bootstrap';

import AlbumComponent from '@/components/albums/index.component';
import Header from '@/components/common/header/index.component';

export default function AlbumPage() {
  return (
    <>
      <Header />
      <Container>
        <AlbumComponent />
      </Container>
    </>
  );
}
