'use client';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '../src/lib/icons';
import axios from "axios";
import NavBar from "../src/components/menu";
import Link from "next/link";
import { useState, useEffect } from "react";
import deleteItem from "../src/service/deleteItem";

async function getData() {
    const res = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Cliente')
    return res.data
}

export default function Page() {
    const [data, setData] = useState<Cliente[]>([])
    console.log(data)
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
                <Link href={'/criar/cliente'}>
                    Criar Cliente
                </Link>
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.nome}</TableCell>
                                <TableCell>
                                    <Link href={`/editar/cliente/${item.id}`}>
                                        [Editar]
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => { deleteItem(item.id, 'Cliente') }}>
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