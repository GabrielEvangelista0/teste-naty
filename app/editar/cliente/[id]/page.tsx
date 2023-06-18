"use client";
import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useParams } from "next/navigation";
import axios from "axios";
import Menu from "../../../../src/components/menu";

interface FormData {
    nome: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
}

async function getData(id: string) {
    const res = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`)
    return res.data
}

export default function EditarCliente() {
    const params = useParams()
    const [formData, setFormData] = useState<FormData>({
        nome: "",
        bairro: '',
        cidade: '',
        logradouro: '',
        numero: '',
        uf: ''
    });

    useEffect(() => {
        const fetchData = async () => {
          const data: FormData = await getData(params.id);
          console.log(data);
          setFormData(data);
        };
    
        fetchData();
      }, [params.id]);
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            axios.put(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${params.id}`, formData)
            alert("Item editado")
        } catch (error) {
            alert(error)
        }
    };

    return (
        <main>
            <Menu/>
            <form onSubmit={handleSubmit}>

                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Logradouro"
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="Cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    variant="standard"
                    sx={{ m: 3 }}
                    label="UF"
                    name="uf"
                    value={formData.uf}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    enviar
                </Button>
            </form>
        </main>
    );
}