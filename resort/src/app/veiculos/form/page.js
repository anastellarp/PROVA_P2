'use client'
import Pagina from '@/app/components/Pagina'
import { Formik } from 'formik'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { ReactInputMask } from 'react-input-mask'

export default function VeiculosFormPage() {
  const router = useRouter()

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    tipo: '',
    modelo: '',
    capacidade: '',
    status: '',
    dataLancamento: '',
    identificacao: '',
    sistema: '',
  }

  // Função para salvar os dados do formulário
  function salvar(dados) {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || []
    dados.id = v4()
    veiculos.push(dados)
    localStorage.setItem('veiculos', JSON.stringify(veiculos))

    alert('Veículo cadastrado com sucesso!')
    router.push('/veiculos')
  }

  // Validação dos campos
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    tipo: Yup.string().required('Campo obrigatório'),
    modelo: Yup.string().required('Campo obrigatório'),
    capacidade: Yup.number().positive('Capacidade deve ser um número positivo').required('Campo obrigatório'),
    status: Yup.string().required('Campo obrigatório'),
    dataLancamento: Yup.string().required('Campo obrigatório'),
    identificacao: Yup.string().required('Campo obrigatório'),
    sistema: Yup.string().required('Campo obrigatório'),
  })

  return (
    <Pagina titulo={'Cadastro de Veículo Espacial'}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome do Veículo:</Form.Label>
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
                <Form.Label>Tipo de Veículo:</Form.Label>
                <Form.Control
                  name="tipo"
                  as="select"
                  value={values.tipo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.tipo && !errors.tipo}
                  isInvalid={touched.tipo && errors.tipo}
                >
                  <option value="">Selecione...</option>
                  <option value="nave">Nave</option>
                  <option value="modulo">Módulo</option>
                  <option value="satélite">Satélite</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.tipo}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Modelo:</Form.Label>
                <Form.Control
                  name="modelo"
                  type="text"
                  value={values.modelo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.modelo && !errors.modelo}
                  isInvalid={touched.modelo && errors.modelo}
                />
                <Form.Control.Feedback type="invalid">{errors.modelo}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Capacidade (pessoas/carga):</Form.Label>
                <Form.Control
                  name="capacidade"
                  type="number"
                  value={values.capacidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.capacidade && !errors.capacidade}
                  isInvalid={touched.capacidade && errors.capacidade}
                />
                <Form.Control.Feedback type="invalid">{errors.capacidade}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Status de Operação:</Form.Label>
                <Form.Control
                  name="status"
                  as="select"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.status && !errors.status}
                  isInvalid={touched.status && errors.status}
                >
                  <option value="">Selecione...</option>
                  <option value="em_operacao">Em Operação</option>
                  <option value="em_manutencao">Em Manutenção</option>
                  <option value="fora_servico">Fora de Serviço</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Data de Lançamento:</Form.Label>
                <Form.Control
                  name="dataLancamento"
                  type="date"
                  value={values.dataLancamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataLancamento && !errors.dataLancamento}
                  isInvalid={touched.dataLancamento && errors.dataLancamento}
                />
                <Form.Control.Feedback type="invalid">{errors.dataLancamento}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Identificação do Veículo (ID):</Form.Label>
                <Form.Control
                  as={ReactInputMask}
                  mask="**-***-****"
                  name="identificacao"
                  type="text"
                  placeholder="Ex: AB-1234-5678"
                  value={values.identificacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.identificacao && !errors.identificacao}
                  isInvalid={touched.identificacao && errors.identificacao}
                />
                <Form.Control.Feedback type="invalid">{errors.identificacao}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
            <Form.Group as={Col}>
                <Form.Label>Sistema Operacional:</Form.Label>
                <Form.Control
                name="sistema"
                as="select"
                value={values.sistema}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.sistema && !errors.sistema}
                isInvalid={touched.sistema && errors.sistema}
                >
                <option value="">Selecione...</option>
                <option value="Linux (RTOS)">Linux (RTOS)</option>
                <option value="FreeRTOS">FreeRTOS</option>
                <option value="Falcon OS">Falcon OS</option>
                <option value="Mission Control OS">Mission Control OS</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.sistema}</Form.Control.Feedback>
            </Form.Group>
            </Row>


            <Form.Group className="text-end">
              <Button className="me-2" href="/veiculos">
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
