"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Menu from "../../../src/components/menu";

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Veiculo', formData, {
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