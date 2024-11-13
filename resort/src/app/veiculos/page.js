'use client'

import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Pagina from '../components/Pagina';

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;
  return (
    <Form.Control
      type="text"
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder={`Buscar em ${count} registros...`}
      className="mb-2"
    />
  );
}

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const veiculosLocalStorage = JSON.parse(localStorage.getItem('veiculos')) || [];
    setVeiculos(veiculosLocalStorage);
  }, []);

  function excluir(veiculo) {
    if (window.confirm(`Deseja realmente excluir o veículo ${veiculo.nome}?`)) {
      const novaLista = veiculos.filter(item => item.id !== veiculo.id);
      localStorage.setItem('veiculos', JSON.stringify(novaLista));
      setVeiculos(novaLista);
    }
  }

  function navegarParaFormulario() {
    router.push('/veiculos/form');
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'nome',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Tipo',
        accessor: 'tipo',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Modelo',
        accessor: 'modelo',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Capacidade',
        accessor: 'capacidade',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Data de Lançamento',
        accessor: 'dataLancamento',
        Filter: DefaultColumnFilter,
        Cell: ({ value }) => new Date(value).toLocaleDateString() 
      },
      {
        Header: 'Sistema Operacional',
        accessor: 'sistema',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Ações',
        Cell: ({ row }) => (
          <div className="text-center">
            <Button 
              variant="warning" 
              className="me-2" 
              onClick={() => router.push(`/veiculos/form?id=${row.original.id}`)}>
              <FaPen />
            </Button>
            <Button 
              variant="danger" 
              onClick={() => excluir(row.original)}>
              <FaTrash />
            </Button>
          </div>
        ),
      }
    ],
    [veiculos]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: veiculos,
    },
    useFilters,
    useSortBy
  );

  return (
    <Pagina titulo="Lista de Veículos">
      <Container>
        <Row className="my-4">
          <Col className="text-end">
            <Button 
              variant="success" 
              onClick={navegarParaFormulario}
              className="mb-3">
              <FaPlusCircle /> Novo
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive {...getTableProps()}>
          <thead className="table-dark">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="text-center">
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="text-center">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Pagina>
  );
}
