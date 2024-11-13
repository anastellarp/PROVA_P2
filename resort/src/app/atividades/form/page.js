'use client'

import Pagina from '@/app/components/Pagina'
import { Formik } from 'formik'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { ReactInputMask } from 'react-input-mask'


export default function AtividadesFormPage() {
  const router = useRouter()

  const initialValues = {
    nome: '',
    email: '',
    telefone: '',
    tipoAtividade: '',
    duracao: '',
    dataInicio: '',
    local: '',
    instrutor: '',
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    telefone: Yup.string().required('Campo obrigatório'),
    tipoAtividade: Yup.string().required('Campo obrigatório'),
    duracao: Yup.string().required('Campo obrigatório'),
    dataInicio: Yup.string().required('Campo obrigatório'),
    local: Yup.string().required('Campo obrigatório'),
    instrutor: Yup.string().required('Campo obrigatório'),
  })

  // Função para salvar a atividade
  function salvar(dados) {
    const atividades = JSON.parse(localStorage.getItem('atividades')) || []
    dados.id = v4()
    atividades.push(dados)
    localStorage.setItem('atividades', JSON.stringify(atividades))

    alert('Atividade salva com sucesso!')
    router.push('./atividades')
  }

  function getLocais(tipoAtividade) {
    const locaisPorTipo = {
      passeioEspacial: ['Estação Espacial Lunar', 'Estação Espacial Internacional'],
      visitaALua: ['Base Lunar', 'Observatório Lunar'],
      exploracaoDeMarte: ['Colônia de Marte', 'Cratera Gale'],
      anéisDeSaturno: ['Órbita de Saturno', 'Anéis de Saturno'],
      observacaoBuracosNegros: ['Perto de um Buraco Negro', 'Observatório Espacial'],
      turismoIntergalactico: ['Galáxia Andromeda', 'Nebulosa de Órion'],
      passeioSistemaSolar: ['Sistema Solar Exterior', 'Sistema Solar Interior'],
      caminhadaEspaco: ['Espaço Profundo', 'Viajante Espacial'],
      passeioEstelar: ['Sistema Estelar Alfa', 'Constelação de Órion'],
      simuladorGravidadeZero: ['Simulador de Gravidade Zero'],
      estacaoEspacialFutura: ['Estação Espacial do Futuro', 'Cidade Espacial Futurista'],
      cacaTesouroEspacial: ['Planeta Tesouro', 'Asteroide Perdido']
    }
    return locaisPorTipo[tipoAtividade] || []
  }

  function getGuiasEspaciais() {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || []
    return funcionarios.filter(funcionario => funcionario.cargo === 'guiaEspacial') || []
  }

  return (
    <Pagina titulo={'Cadastro de Atividade'}>
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
                  mask={"(99)99999-9999"}
                  placeholder='(99)99999-9999'
                  name="telefone"
                  type="text"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && errors.telefone}
                />
                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} xs={12} sm={6}>
                <Form.Label>Tipo de Atividade:</Form.Label>
                <Form.Control
                  name="tipoAtividade"
                  as="select"
                  value={values.tipoAtividade}
                  onChange={(e) => {
                    handleChange(e)
                    values.local = '' 
                  }}
                  onBlur={handleBlur}
                  isValid={touched.tipoAtividade && !errors.tipoAtividade}
                  isInvalid={touched.tipoAtividade && errors.tipoAtividade}
                >
                  <option value="">Selecione...</option>
                  <option value="passeioEspacial">Passeio Espacial</option>
                  <option value="visitaALua">Visita à Lua</option>
                  <option value="exploracaoDeMarte">Exploração de Marte</option>
                  <option value="anéisDeSaturno">Passeio aos Anéis de Saturno</option>
                  <option value="observacaoBuracosNegros">Observação de Buracos Negros</option>
                  <option value="turismoIntergalactico">Turismo Intergaláctico</option>
                  <option value="passeioSistemaSolar">Passeio pelo Sistema Solar</option>
                  <option value="caminhadaEspaco">Caminhada no Espaço</option>
                  <option value="passeioEstelar">Passeio Estelar</option>
                  <option value="simuladorGravidadeZero">Simulador de Gravidade Zero</option>
                  <option value="estacaoEspacialFutura">Passeio a uma Estação Espacial Futura</option>
                  <option value="cacaTesouroEspacial">Caça ao Tesouro Espacial</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.tipoAtividade}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Local:</Form.Label>
                <Form.Control
                  name="local"
                  as="select"
                  value={values.local}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.local && !errors.local}
                  isInvalid={touched.local && errors.local}
                >
                  <option value="">Selecione...</option>
                  {getLocais(values.tipoAtividade).map((local, index) => (
                    <option key={index} value={local}>{local}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.local}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Instrutor:</Form.Label>
                <Form.Control
                  name="instrutor"
                  as="select"
                  value={values.instrutor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.instrutor && !errors.instrutor}
                  isInvalid={touched.instrutor && errors.instrutor}
                >
                  <option value="">Selecione...</option>
                  {getGuiasEspaciais().map((guia, index) => (
                    <option key={index} value={guia.nome}>{guia.nome}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.instrutor}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/atividades">
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
