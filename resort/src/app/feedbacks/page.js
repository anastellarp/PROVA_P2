'use client'

import Pagina from '../components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'  
export default function FeedbacksPage() {

  const [feedbacks, setFeedbacks] = useState([])  
  const router = useRouter()  

  useEffect(() => {
    const feedbacksLocalStorage = JSON.parse(localStorage.getItem("feedbacks")) || []
    setFeedbacks(feedbacksLocalStorage)  
    console.log(feedbacksLocalStorage)  
  }, [])

  function excluir(feedback) {
    if (window.confirm(`Deseja realmente excluir o feedback de ${feedback.nome}?`)) {
      const novaLista = feedbacks.filter(item => item.id !== feedback.id)  
      localStorage.setItem('feedbacks', JSON.stringify(novaLista))  
      setFeedbacks(novaLista)  
      alert("Feedback excluído com sucesso!")  
    }
  }

  function navegarParaFormulario() {
    router.push('/feedbacks/form')  
  }

  return (
    <Pagina titulo={"Lista de Feedbacks"}>
      <div className='text-end mb-2'>
        <Button onClick={navegarParaFormulario}><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>  
            <th>Telefone</th>  
            <th>Motivo do Feedback</th>
            <th>Avaliação</th>
            <th>Data</th>
            <th>Satisfação Geral</th> 
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => {
            return (
              <tr key={feedback.id}>
                <td>{feedback.nome}</td>
                <td>{feedback.email}</td>  
                <td>{feedback.telefone}</td>  
                <td>{feedback.motivoFeedback}</td>
                <td>{feedback.avaliacao} / 5</td>
                <td>{new Date(feedback.data).toLocaleDateString()}</td>  
                <td>{feedback.satisfacao}</td>  
                <td className='text-center'>
                  <Button className='me-2' onClick={() => router.push(`/feedbacks/form?id=${feedback.id}`)}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(feedback)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

    </Pagina>
  )
}
