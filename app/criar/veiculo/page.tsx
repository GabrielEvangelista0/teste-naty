"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import NavBar from "../../../src/components/menu";
import createItem from "../../../src/service/createItem";

interface FormData {
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

export default function Cliente() {
  const [formData, setFormData] = useState<FormData>({
    placa: "",
    marcaModelo: "",
    anoFabricacao: 0,
    kmAtual: 0
  });
  console.log(formData)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //'https://api-deslocamento.herokuapp.com/api/v1/Veiculo'
    createItem('https://api-deslocamento.herokuapp.com/api/v1/Veiculo', formData);
  }

  return (
    <main>
      <NavBar/>
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
          label="Placa"
          name="placa"
          value={formData.placa}
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
    </main>
  );
}
