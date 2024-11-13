'use client'
import Pagina from '@/app/components/Pagina'
import { Formik } from 'formik'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import {ReactInputMask} from 'react-input-mask'
import { useState, useEffect } from 'react'

export default function FeedbackFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || []
  const feedbackEditado = feedbacks.find(item => item.id == id)

  function salvar(dados) {
    console.log('Função salvar foi chamada');
    console.log(dados);
    if (feedbackEditado) {
      Object.assign(feedbackEditado, dados)
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks))
    } else {
      dados.id = v4()
      feedbacks.push(dados)
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks))
    }

    alert('Feedback salvo com sucesso!')
    router.push('/feedbacks')
  }
  

  const initialValues = {
    nome: '',
    email: '',
    telefone: '',
    tipoServico: '',
    avaliacao: '',
    comentario: '',
    data: '',
    satisfacao: '',
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    telefone: Yup.string().required('Campo obrigatório'),
    tipoServico: Yup.string().required('Campo obrigatório'),
    avaliacao: Yup.number().min(1).max(5).required('Campo obrigatório'),
    comentario: Yup.string().required('Campo obrigatório'),
    data: Yup.string().required('Campo obrigatório'),
    satisfacao: Yup.string().required('Campo obrigatório'),
  })


  return (
    <Pagina titulo={'Cadastro de Feedback'}>
      <Formik
        initialValues={feedbackEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
            <Form.Group as={Col} md={6}>
              <Form.Label>Telefone:</Form.Label>
              <Form.Control as={ReactInputMask}
                mask={"(99)99999-9999"}
                placeholder='(99)99999-9999'
                name='telefone'
                type='text'
                value={values.telefone}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.telefone && !errors.telefone}
                isInvalid={touched.telefone && !!errors.telefone}
              />
              <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
            </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} xs={12} sm={6}>
                <Form.Label>Motivo do Feedback:</Form.Label>
                <Form.Control
                  name="motivoFeedback"
                  as="select"
                  value={values.motivoFeedback}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.motivoFeedback && !errors.motivoFeedback}
                  isInvalid={touched.motivoFeedback && errors.motivoFeedback}
                >
                  <option value="">Selecione...</option>
                  <option value="elogio">Elogio</option>
                  <option value="critica">Crítica</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="problema">Problema</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.motivoFeedback}</Form.Control.Feedback>
              </Form.Group>
            </Row>


            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Avaliação (1 a 5):</Form.Label>
                <Form.Control
                  name="avaliacao"
                  type="number"
                  min={1}
                  max={5}
                  value={values.avaliacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.avaliacao && !errors.avaliacao}
                  isInvalid={touched.avaliacao && errors.avaliacao}
                />
                <Form.Control.Feedback type="invalid">{errors.avaliacao}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Comentário:</Form.Label>
                <Form.Control
                  name="comentario"
                  as="textarea"
                  rows={4}
                  value={values.comentario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.comentario && !errors.comentario}
                  isInvalid={touched.comentario && errors.comentario}
                />
                <Form.Control.Feedback type="invalid">{errors.comentario}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} xs={12} sm={4}>
                <Form.Label>Data do Feedback:</Form.Label>
                <Form.Control
                  name="data"
                  type="date"
                  value={values.data}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.data && !errors.data}
                  isInvalid={touched.data && errors.data}
                />
                <Form.Control.Feedback type="invalid">{errors.data}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Satisfação Geral:</Form.Label>
                <Form.Control
                  name="satisfacao"
                  type="text"
                  value={values.satisfacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.satisfacao && !errors.satisfacao}
                  isInvalid={touched.satisfacao && errors.satisfacao}
                />
                <Form.Control.Feedback type="invalid">{errors.satisfacao}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/feedbacks">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>

            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
