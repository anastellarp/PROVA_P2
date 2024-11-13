'use client'
import { useState, useEffect } from 'react';
import Pagina from '@/app/components/Pagina';
import { Formik } from 'formik';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { ReactInputMask } from 'react-input-mask';
import { useSearchParams } from 'next/navigation';

export default function HospedesFormPage() {
  const [countries, setCountries] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
  const hospedeEditado = hospedes.find(item => item.id == id);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Erro ao buscar países:', error);
      }
    }
    fetchCountries();
  }, []);

  function salvar(dados) {
    if (hospedeEditado) {
      Object.assign(hospedeEditado, dados);
      localStorage.setItem('hospedes', JSON.stringify(hospedes));
    } else {
      dados.id = v4();
      hospedes.push(dados);
      localStorage.setItem('hospedes', JSON.stringify(hospedes));
    }
    alert('Hóspede salvo com sucesso!');
    router.push('/hospedes');
  }

  const initialValues = {
    nome: '',
    email: '',
    telefone: '',
    numeroDocumento: '',
    dataNascimento: '',
    endereco: '',
    cidade: '',
    pais: '',
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    telefone: Yup.string().required('Campo obrigatório'),
    numeroDocumento: Yup.string().required('Campo obrigatório'),
    dataNascimento: Yup.string().required('Campo obrigatório'),
    endereco: Yup.string().required('Campo obrigatório'),
    cidade: Yup.string().required('Campo obrigatório'),
    pais: Yup.string().required('Campo obrigatório'),
  });

  return (
    <Pagina titulo={'Cadastro de Hóspede'}>
      <Formik
        initialValues={hospedeEditado || initialValues}
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
              <Form.Group as={Col}>
                <Form.Label>Número do Documento:</Form.Label>
                <Form.Control
                  name="numeroDocumento"
                  type="text"
                  value={values.numeroDocumento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.numeroDocumento && !errors.numeroDocumento}
                  isInvalid={touched.numeroDocumento && errors.numeroDocumento}
                />
                <Form.Control.Feedback type="invalid">{errors.numeroDocumento}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control
                  name="dataNascimento"
                  type="date"
                  value={values.dataNascimento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataNascimento && !errors.dataNascimento}
                  isInvalid={touched.dataNascimento && errors.dataNascimento}
                />
                <Form.Control.Feedback type="invalid">{errors.dataNascimento}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name="endereco"
                  type="text"
                  value={values.endereco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.endereco && !errors.endereco}
                  isInvalid={touched.endereco && errors.endereco}
                />
                <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control
                  name="cidade"
                  type="text"
                  value={values.cidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cidade && !errors.cidade}
                  isInvalid={touched.cidade && errors.cidade}
                />
                <Form.Control.Feedback type="invalid">{errors.cidade}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>País:</Form.Label>
                <Form.Control
                  as="select"
                  name="pais"
                  value={values.pais}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.pais && !errors.pais}
                  isInvalid={touched.pais && errors.pais}
                >
                  <option value="">Selecione um país...</option>
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.pais}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/hospedes">
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
  );
}
