'use client'

import Pagina from '../components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'  

export default function AtividadesPage() {

  const [atividades, setAtividades] = useState([])  
  const router = useRouter()  

  useEffect(() => {
    const atividadesLocalStorage = JSON.parse(localStorage.getItem("atividades")) || []
    setAtividades(atividadesLocalStorage)  
    console.log(atividadesLocalStorage)  
  }, [])

  function excluir(atividade) {
    if (window.confirm(`Deseja realmente excluir a atividade de ${atividade.nome}?`)) {
      const novaLista = atividades.filter(item => item.id !== atividade.id)  
      localStorage.setItem('atividades', JSON.stringify(novaLista))  
      setAtividades(novaLista) 
      alert("Atividade excluída com sucesso!")  
    }
  }

  function navegarParaFormulario() {
    router.push('/atividades/form')  
  }

  return (
    <Pagina titulo={"Lista de Atividades"}>
      <div className='text-end mb-2'>
        <Button onClick={navegarParaFormulario}><FaPlusCircle /> Nova Atividade</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Tipo de Atividade</th>
            <th>Duração</th>
            <th>Data de Início</th>
            <th>Local</th>
            <th>Instrutor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {atividades.map(atividade => {
            return (
              <tr key={atividade.id}>
                <td>{atividade.nome}</td>
                <td>{atividade.email}</td>  
                <td>{atividade.telefone}</td>  
                <td>{atividade.tipoAtividade}</td>
                <td>{atividade.duracao}</td>
                <td>{new Date(atividade.dataInicio).toLocaleDateString()}</td>   
                <td>{atividade.local}</td>
                <td>{atividade.instrutor}</td>
                <td className='text-center'>
                  <Button className='me-2' onClick={() => router.push(`/atividades/form?id=${atividade.id}`)}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(atividade)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
