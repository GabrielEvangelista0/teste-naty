"use client";
import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import NavBar from "../../../../src/components/menu";
import { useParams } from "next/navigation";
import putItem from "../../../../src/service/putItem";

interface FormData {
    id: number;
    kmFinal: number;
    fimDeslocamento: string;
    observacao: string;
}

async function getData(id: string) {
    const res = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${id}`)
    return res.data
}

export default function Cliente() {
    const params = useParams();
    const [deslocamentoData, setDeslocamentoData] = useState<Deslocamento>()
    const [formData, setFormData] = useState<FormData>({
        id: Number(params.id),
        kmFinal: 1,
        fimDeslocamento: new Date().toISOString(),
        observacao: ''
    });
    console.log(formData)
    useEffect(() => {
        const fetchData = async () => {
            const data: Deslocamento = await getData(params.id);
            setDeslocamentoData(data)
            setFormData({
                ...formData,
                observacao: data.observacao,
                kmFinal: data.kmInicial
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
        await putItem(`https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${params.id}/EncerrarDeslocamento`, formData);
        //Atualiza dados da tabela e formulario
        const updatedData: Deslocamento = await getData(params.id);
        setDeslocamentoData(updatedData);
        setFormData({
            id: updatedData.id,
            kmFinal: updatedData.kmFinal,
            fimDeslocamento: updatedData.fimDeslocamento,
            observacao: updatedData.observacao
        });
    };

    return (
        <main>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="KM Final"
                    name="kmFinal"
                    type="number"
                    value={formData.kmFinal}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Fim do deslocamento"
                    name="fimDeslocamento"
                    value={formData.fimDeslocamento}
                    onChange={handleChange}
                    required
                    fullWidth
                />


                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Observacao"
                    name="observacao"
                    value={formData.observacao}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <Button type="submit" variant="contained" color="primary">
                    Encerrar deslocamento
                </Button>
            </form>
            {deslocamentoData && (
                <TableContainer component={Paper} sx={{ width: '90%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>ID Cliente</TableCell>
                                <TableCell>ID Condutor</TableCell>
                                <TableCell>ID Veiculo</TableCell>
                                <TableCell>Inicio Deslocamento</TableCell>
                                <TableCell>Motivo</TableCell>
                                <TableCell>km Inicial</TableCell>
                                <TableCell>km Final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{deslocamentoData.id}</TableCell>
                                <TableCell>{deslocamentoData.idCliente}</TableCell>
                                <TableCell>{deslocamentoData.idCondutor}</TableCell>
                                <TableCell>{deslocamentoData.idVeiculo}</TableCell>
                                <TableCell>{deslocamentoData.inicioDeslocamento}</TableCell>
                                <TableCell>{deslocamentoData.motivo}</TableCell>
                                <TableCell>{deslocamentoData.kmInicial}</TableCell>
                                <TableCell>{deslocamentoData.kmFinal}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </main>
    );
}
