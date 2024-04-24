import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link'

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >
          <Link href="/">FrontEnd Test</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/posts">Posts Page</Link>
            <Link href="/albums">Album Images</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
