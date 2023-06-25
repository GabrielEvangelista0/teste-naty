"use client";
import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import NavBar from "../../../../src/components/menu";
import putItem from "../../../../src/service/putItem";
import { useParams } from "next/navigation";

interface FormData {
    id: number;
    marcaModelo: string
    anoFabricacao: number
    kmAtual: number
}

async function getData(id: string) {
    const res = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`)
    return res.data
}

export default function Cliente() {
    const params = useParams()
    const [veiculoData, setVeiculoData] = useState<Veiculo>();
    const [formData, setFormData] = useState<FormData>({
        id: 0,
        marcaModelo: "",
        anoFabricacao: 0,
        kmAtual: 0
    });
    useEffect(() => {
        const fetchData = async () => {
            const data: Veiculo = await getData(params.id);
            setVeiculoData(data)
            setFormData({
                id: data.id,
                marcaModelo: data.marcaModelo,
                anoFabricacao: data.anoFabricacao,
                kmAtual: data.kmAtual
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
        await putItem(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${params.id}`, formData)
        //Atualiza dados da tabela
        const updatedData: Veiculo = await getData(params.id);
        setVeiculoData(updatedData);
        setFormData({
            id: updatedData.id,
            marcaModelo: updatedData.marcaModelo,
            anoFabricacao: updatedData.anoFabricacao,
            kmAtual: updatedData.kmAtual
        });
    };

    return (
        <main>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Marca/modelo"
                    name="marcaModelo"
                    value={formData.marcaModelo}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Ano fabricação"
                    name="anoFabricacao"
                    type="number"
                    value={formData.anoFabricacao}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Km Atual"
                    name="kmAtual"
                    type="number"
                    value={formData.kmAtual}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    enviar
                </Button>
            </form>
            {veiculoData && (
                <TableContainer component={Paper} sx={{ width: '70%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Marca/Modelo</TableCell>
                                <TableCell>Placa</TableCell>
                                <TableCell>km Atual</TableCell>
                                <TableCell>Ano Fabricacao</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{veiculoData.id}</TableCell>
                                <TableCell>{veiculoData.marcaModelo}</TableCell>
                                <TableCell>{veiculoData.placa}</TableCell>
                                <TableCell>{veiculoData.kmAtual}</TableCell>
                                <TableCell>{veiculoData.anoFabricacao}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </main>
    );
}
