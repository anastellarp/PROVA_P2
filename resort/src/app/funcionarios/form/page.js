'use client'

import Pagina from '@/app/components/Pagina'
import { Formik } from 'formik'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { ReactInputMask } from 'react-input-mask'

export default function FuncionariosFormPage() {
  const router = useRouter()

  const initialValues = {
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    departamento: '',
    salario: '',
    dataAdmissao: '',
    dataNascimento: '',
  }
  function salvar(dados) {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || []
    dados.id = v4()
    funcionarios.push(dados)
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios))

    alert('Funcionário cadastrado com sucesso!')
    router.push('/funcionarios')
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    telefone: Yup.string().required('Campo obrigatório'),
    cargo: Yup.string().required('Campo obrigatório'),
    departamento: Yup.string().required('Campo obrigatório'),
    salario: Yup.number().positive('Salário deve ser um número positivo').required('Campo obrigatório'),
    dataAdmissao: Yup.string().required('Campo obrigatório'),
    dataNascimento: Yup.string().required('Campo obrigatório'),
  })

  function getDepartamentos(cargo) {
    const departamentosPorCargo = {
      'comandanteNave': ['Operações Espaciais', 'Coordenação de Missões'],
      'engenheiroSistemaEspacial': ['Engenharia', 'Pesquisa e Desenvolvimento'],
      'astroChef': ['Cozinha Espacial', 'Suprimentos'],
      'medicoEspacial': ['Saúde Espacial', 'Emergência'],
      'oficialOperacoes': ['Operações de Navegação', 'Segurança'],
      'especialistaGravidadeZero': ['Pesquisa', 'Desenvolvimento de Tecnologias'],
      'astrofisicoTurismo': ['Turismo Espacial', 'Pesquisas Científicas'],
      'guiaEspacial': ['Turismo Espacial', 'Exploração de Novos Mundos'],
    }
    return departamentosPorCargo[cargo] || []
  }

  return (
    <Pagina titulo={'Cadastro de Funcionário'}>
      <Formik
        initialValues={initialValues}
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
                <Form.Control
                  as={ReactInputMask}
                  mask="(99)99999-9999"
                  placeholder='(99)99999-9999'
                  name="telefone"
                  type="text"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && !!errors.telefone}
                />
                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} xs={12} sm={6}>
                <Form.Label>Cargo:</Form.Label>
                <Form.Control
                  name="cargo"
                  as="select"
                  value={values.cargo}
                  onChange={(e) => {
                    handleChange(e)
                    values.departamento = ''  
                  }}
                  onBlur={handleBlur}
                  isValid={touched.cargo && !errors.cargo}
                  isInvalid={touched.cargo && errors.cargo}
                >
                  <option value="">Selecione...</option>
                  <option value="comandanteNave">Comandante de Nave</option>
                  <option value="engenheiroSistemaEspacial">Engenheiro de Sistema Espacial</option>
                  <option value="astroChef">Astro-chef</option>
                  <option value="medicoEspacial">Médico Espacial</option>
                  <option value="oficialOperacoes">Oficial de Operações</option>
                  <option value="especialistaGravidadeZero">Especialista em Gravidade Zero</option>
                  <option value="astrofisicoTurismo">Astrofísico de Turismo</option>
                  <option value="guiaEspacial">Guia Espacial</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.cargo}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Departamento:</Form.Label>
                <Form.Control
                  name="departamento"
                  as="select"
                  value={values.departamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.departamento && !errors.departamento}
                  isInvalid={touched.departamento && errors.departamento}
                >
                  <option value="">Selecione...</option>
                  {getDepartamentos(values.cargo).map((departamento, index) => (
                    <option key={index} value={departamento}>{departamento}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.departamento}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Salário:</Form.Label>
                <Form.Control
                  name="salario"
                  type="number"
                  value={values.salario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.salario && !errors.salario}
                  isInvalid={touched.salario && errors.salario}
                />
                <Form.Control.Feedback type="invalid">{errors.salario}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} xs={12} sm={6}>
                <Form.Label>Data de Admissão:</Form.Label>
                <Form.Control
                  name="dataAdmissao"
                  type="date"
                  value={values.dataAdmissao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataAdmissao && !errors.dataAdmissao}
                  isInvalid={touched.dataAdmissao && errors.dataAdmissao}
                />
                <Form.Control.Feedback type="invalid">{errors.dataAdmissao}</Form.Control.Feedback>
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

            <Form.Group className="text-end">
              <Button className="me-2" href="/funcionarios">
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
