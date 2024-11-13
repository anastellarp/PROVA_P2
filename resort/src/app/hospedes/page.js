'use client'

import Pagina from '../components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function HospedesPage() {

  const [hospedes, setHospedes] = useState([])  
  const router = useRouter()  

  useEffect(() => {
    const hospedesLocalStorage = JSON.parse(localStorage.getItem("hospedes")) || []
    setHospedes(hospedesLocalStorage) 
    console.log(hospedesLocalStorage) 
  }, [])

  function excluir(hospede) {
    if (window.confirm(`Deseja realmente excluir o hóspede ${hospede.nome}?`)) {
      const novaLista = hospedes.filter(item => item.id !== hospede.id)  
      localStorage.setItem('hospedes', JSON.stringify(novaLista))  
      setHospedes(novaLista) 
      alert("Hóspede excluído com sucesso!") 
    }
  }

  function navegarParaFormulario() {
    router.push('/hospedes/form') 
  }

  return (
    <Pagina titulo={"Lista de Hóspedes"}>
      <div className='text-end mb-2'>
        <Button onClick={navegarParaFormulario}><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela de Hóspedes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>País</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {hospedes.map(hospede => {
            return (
              <tr key={hospede.id}>
                <td>{hospede.nome}</td>
                <td>{hospede.email}</td>
                <td>{hospede.telefone}</td>
                <td>{hospede.cidade}</td>
                <td>{hospede.pais}</td>
                <td className='text-center'>
                  <Button className='me-2' onClick={() => router.push(`/hospedes/form?id=${hospede.id}`)}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(hospede)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

    </Pagina>
  )
}
