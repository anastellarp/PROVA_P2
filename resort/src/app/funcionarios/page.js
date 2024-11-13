'use client'

import Pagina from '../components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'  

export default function FuncionariosPage() {

  const [funcionarios, setFuncionarios] = useState([])  
  const router = useRouter()  

  useEffect(() => {
    const funcionariosLocalStorage = JSON.parse(localStorage.getItem("funcionarios")) || []
    setFuncionarios(funcionariosLocalStorage)  
    console.log(funcionariosLocalStorage) 
  }, [])

  function excluir(funcionario) {
    if (window.confirm(`Deseja realmente excluir o funcionário ${funcionario.nome}?`)) {
      const novaLista = funcionarios.filter(item => item.id !== funcionario.id)  
      localStorage.setItem('funcionarios', JSON.stringify(novaLista))  
      setFuncionarios(novaLista)  
      alert("Funcionário excluído com sucesso!")  
    }
  }

  function navegarParaFormulario() {
    router.push('/funcionarios/form')  
  }

  return (
    <Pagina titulo={"Lista de Funcionários"}>
      <div className='text-end mb-2'>
        <Button onClick={navegarParaFormulario}><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>  
            <th>Telefone</th>  
            <th>Cargo</th>  
            <th>Data de Contratação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => {
            return (
              <tr key={funcionario.id}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.email}</td> 
                <td>{funcionario.telefone}</td>  
                <td>{funcionario.cargo}</td>  
                <td>{new Date(funcionario.dataAdmissao).toLocaleDateString()}</td>  
                <td className='text-center'>
                  <Button className='me-2' onClick={() => router.push(`/funcionarios/form?id=${funcionario.id}`)}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(funcionario)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

    </Pagina>
  )
}
