'use client'

import { Container, Nav, Navbar } from "react-bootstrap"


export default function Pagina({ titulo, children }) {

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/hospedes">Hóspedes</Nav.Link>
            <Nav.Link href="/atividades">Atividades</Nav.Link>
            <Nav.Link href="/funcionarios">Funcionários</Nav.Link>
            <Nav.Link href="/veiculos">Veículos Espaciais</Nav.Link>
            <Nav.Link href="/feedbacks">Feedbacks</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="bg-secondary text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}
