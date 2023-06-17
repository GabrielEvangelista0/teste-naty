"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

interface FormData {
  name: string;
  tipoDoDocumento: string;
  numeroDoDocumento: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export default function Cliente() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    tipoDoDocumento: "",
    numeroDoDocumento: "",
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform form submission logic here
    // e.g., send data to the server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Tipo do documento"
        name="tipoDoDocumento"
        value={formData.tipoDoDocumento}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Numero do documento"
        name="numeroDoDocumento"
        value={formData.numeroDoDocumento}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Logradouro"
        name="logradouro"
        value={formData.logradouro}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Numero"
        name="numero"
        value={formData.numero}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Bairro"
        name="bairro"
        value={formData.bairro}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Cidade"
        name="cidade"
        value={formData.cidade}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
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
  );
}
