'use client'

import { useState, useEffect } from 'react'
import Pagina from './components/Pagina'
import { Button, Card, Carousel, ListGroup } from 'react-bootstrap'

export default function HomePage() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || []
    setFeedbacks(storedFeedbacks)
  }, [])

  return (
    <Pagina titulo={"Bem-vindo ao Resort Espacial"}>
      <p>Experimente o luxo interestelar com serviços exclusivos, atividades emocionantes e acomodações de tirar o fôlego no nosso Resort Espacial. Venha explorar o universo conosco!</p>

      <div className="my-5">
        <h3>Novidades & Ofertas Especiais</h3>
        <p>Fique de olho nas nossas ofertas de viagem espacial! Descontos exclusivos para aventuras em gravidade zero e muito mais.</p>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Pacote de Lua de Mel em Gravidade Zero</Card.Title>
            <Card.Text>
              Surpreenda seu amor com uma experiência única nas estrelas! Pacote com desconto especial para reservas até o final do mês.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="my-5">
        <h3>Galeria do Resort Espacial</h3>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.pinimg.com/736x/19/07/3c/19073cc583c25fcc55f92d2eae9a5a6e.jpg"
              alt="Vista do espaço"
              style={{ height: '500px', objectFit: 'cover' }} 
            />
            <Carousel.Caption>
              <h3>Vista Deslumbrante do Espaço</h3>
              <p>Desfrute de uma vista inigualável das estrelas e planetas.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.pinimg.com/736x/c4/e9/19/c4e91953f4c203c792f832728be6cffd.jpg"
              alt="Acomodações espaciais"
              style={{ height: '500px', objectFit: 'cover' }} 
            />
            <Carousel.Caption>
              <h3>Acomodações Espaciais</h3>
              <p>Suítes confortáveis com uma experiência de luxo galáctico.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.pinimg.com/736x/51/1f/c0/511fc0b5a2c54a757ff2e3a2883fe594.jpg"
              alt="Atividades no resort"
              style={{ height: '500px', objectFit: 'cover' }} 
            />
            <Carousel.Caption>
              <h3>Atividades Únicas</h3>
              <p>Participe de aventuras emocionantes e experiências únicas.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="my-5">
        <h3>Feedbacks dos Hóspedes</h3>
        {feedbacks.length === 0 ? (
          <p>Ainda não há feedbacks registrados.</p>
        ) : (
          <ListGroup>
            {feedbacks.map((feedback, index) => (
              <ListGroup.Item key={index}>
                <h5>{feedback.nome}</h5>
                <p><strong>Data:</strong> {feedback.data}</p>
                <p><strong>Avaliação Geral:</strong> {feedback.avaliacao}</p>
                <p><strong>Satisfação Geral:</strong> {feedback.satisfacao}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}


        <Button href="/feedbacks/form" variant="primary" className="mt-3">
          Registrar Novo Feedback
        </Button>

      </div>

    </Pagina> 
  )
}
