import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import Image from 'next/image';


import { fetchAlbums, fetchPhotosByIdAlbum } from '@/api/albums';
import { Photos, Albums } from '@/base/types/albums';
import Loading from '../loader/index.component';

const AlbumComponent = () => {
  const [albums, setAlbums] = useState<Albums[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const response = await fetchAlbums()
        console.log({ response })
        setAlbums(response?.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    getAlbums();
  }, []);

  const handleAlbumClick = async (albumId: string) => {
    setLoading(true)
    setSelectedAlbum(albumId);
    try {
      const response = await fetchPhotosByIdAlbum(albumId)
      setPhotos(response?.data);
      setSearchKeyword('')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching photos:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Container>
      <h1 className="text-center my-4">Albums</h1>

      {!albums && <Loading />}
      <Row xs={1} md={2} lg={3} className="g-4">
        {albums?.map((album) => {
          return (
            <Col key={album.id}>
              <Card onClick={() => handleAlbumClick(`${album.id}`)} className="cursor-pointer album-card">
                <Card.Body>
                  <Card.Title>{album.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
      <Modal show={selectedAlbum !== null} onHide={() => setSelectedAlbum(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="searchKeyword">
            <Form.Control
              type="text"
              placeholder="Search photos..."
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </Form.Group>
          <div className="photo-grid mt-3">
            {loading ? <Loading /> : filteredPhotos.map((photo) => (
              <div key={photo.id} className="photo-item">
                <Image
                  src={photo.thumbnailUrl}
                  width={150}
                  height={150}
                  alt="Picture of the author"
                />
                <p>{photo.title}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedAlbum(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AlbumComponent;
