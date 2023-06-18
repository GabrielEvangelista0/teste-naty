"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Menu from "../../../src/components/menu";

interface FormData {
  nome: string;
  tipoDocumento: string;
  numeroDocumento: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export default function Cliente() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    tipoDocumento: "",
    numeroDocumento: "",
    bairro: '',
    cidade: '',
    logradouro: '',
    numero: '',
    uf: ''
  });
  console.log(formData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Cliente', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('Item criado', res)
    } catch (error) {
      console.log(error)
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
          label="Tipo do documento"
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="Numero do documento"
          name="numeroDocumento"
          value={formData.numeroDocumento}
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
