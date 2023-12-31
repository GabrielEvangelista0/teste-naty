'use client';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '../../src/lib/icons';
import axios from "axios";
import NavBar from "../../src/components/menu";
import Link from "next/link";
import { useState, useEffect } from "react";
import deleteItem from "../../src/service/deleteItem";

async function getData() {
    const res = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Veiculo')
    return res.data
}

export default function Deslocamento() {
    const [data, setData] = useState<Veiculo[]>([])
    useEffect(() => {
        const fetchData = async () => {
          const data = await getData();
          setData(data);
        };
    
        fetchData();
      }, []);
    
    return (
        <main>
            <NavBar />
            <Button variant="contained" sx={{ width: '50%', margin: '2rem auto' }}>
                <Link href={'/criar/veiculo'}>
                    Criar Veículo
                </Link>
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Placa</TableCell>
                            <TableCell>Marca/Modelo</TableCell>
                            <TableCell>Ano Fabricacão</TableCell>
                            <TableCell>KM Atual</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.placa}</TableCell>
                                <TableCell>{item.marcaModelo}</TableCell>
                                <TableCell>{item.anoFabricacao}</TableCell>
                                <TableCell>{item.kmAtual}</TableCell>
                                <TableCell>
                                    <Link href={`/editar/veiculo/${item.id}`}>
                                        [Editar]
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => { deleteItem(item.id, 'Veiculo') }}>
                                        <DeleteIcon color="error" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    )
}