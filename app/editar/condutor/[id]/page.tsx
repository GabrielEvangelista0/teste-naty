"use client";
import { useState, useEffect } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import Menu from "../../../../src/components/menu";
import createItem from "../../../../src/service/createItem";
import { useParams } from "next/navigation";
import putItem from "../../../../src/service/putItem";

interface FormData {
    id: number
    catergoriaHabilitacao: string;
    vencimentoHabilitacao: string;
}

async function getData(id: string) {
    const res = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`)
    return res.data
}

//'https://api-deslocamento.herokuapp.com/api/v1/Condutor'

export default function Cliente() {
    const params = useParams()
    const [formData, setFormData] = useState<FormData>({
        id: Number(params.id),
        catergoriaHabilitacao: '',
        vencimentoHabilitacao: new Date().toISOString()
    });
    const [condutorData, setCondutorData] = useState<Condutor>();
    useEffect(() => {
        const fetchData = async () => {
            const data: Condutor = await getData(params.id);
            setCondutorData(data)
            setFormData({
                id: data.id,
                catergoriaHabilitacao: data.catergoriaHabilitacao,
                vencimentoHabilitacao: data.vencimentoHabilitacao
            });
        };

        fetchData();
    }, [params.id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await putItem(`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${params.id}`, {
            ...formData,
            categoriaHabilitacao: formData.catergoriaHabilitacao
        });
        //Atualiza dados da tabela
        const updatedData: Condutor = await getData(params.id);
        setCondutorData(updatedData);
        setFormData({
            id: updatedData.id,
            catergoriaHabilitacao: updatedData.catergoriaHabilitacao,
            vencimentoHabilitacao: updatedData.vencimentoHabilitacao
        });
    };



    return (
        <main>
            <Menu />
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Categoria Habilitacão"
                    name="catergoriaHabilitacao"
                    value={formData.catergoriaHabilitacao}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    type="date"
                    label="Vencimento Habilitacao"
                    name="vencimentoHabilitacao"
                    value={formData.vencimentoHabilitacao}
                    onChange={handleChange}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    enviar
                </Button>
            </form>
            {condutorData && (
                <TableContainer component={Paper} sx={{width: '70%'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Número Habilitação</TableCell>
                                <TableCell>Categoria Habilitação</TableCell>
                                <TableCell>Vencimento Habilitação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{condutorData.id}</TableCell>
                                <TableCell>{condutorData.nome}</TableCell>
                                <TableCell>{condutorData.numeroHabilitacao}</TableCell>
                                <TableCell>{condutorData.catergoriaHabilitacao}</TableCell>
                                <TableCell>{condutorData.vencimentoHabilitacao}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </main>
    );
}
