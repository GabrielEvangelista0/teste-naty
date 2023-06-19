"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Menu from "../../../src/components/menu";

export default function Cliente() {
  const [formData, setFormData] = useState<Condutor>({
    nome: "",
    catergoriaHabilitacao: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: '',
    vencimentoHabilitacao: new Date()
  });
  console.log(formData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Condutor', formData, {
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
          label="Numero do documento"
          name="numeroHabilitacao"
          value={formData.numeroHabilitacao}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="Categoria Habilitacao"
          name="categoriaHabilitacao"
          value={formData.categoriaHabilitacao}
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
