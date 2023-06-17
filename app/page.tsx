import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "../lib/mui";
import DeleteIcon from '../lib/icons';
import axios from "axios";
import Menu from "../src/components/menu";
import Link from "next/link";

async function getData() {
    const res = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Cliente')
    return res.data
}

export default async function Page() {
    const data = await getData();
    console.log(data)
    return (
        <main>
            <Menu />
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
                        {data.map((item: typeof data) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.nome}</TableCell>
                                <TableCell>
                                    <Link href={`${item.id}`}>
                                        [Editar]
                                    </Link>
                                </TableCell>
                                <TableCell><DeleteIcon color="error" sx={{cursor: 'pointer'}}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    )
}