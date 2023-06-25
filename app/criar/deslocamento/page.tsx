"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Menu from "../../../src/components/menu";
import createItem from "../../../src/service/createItem";

interface Deslocamento{
  kmInicial: number;
  inicioDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export default function Cliente() {
  const [formData, setFormData] = useState<Deslocamento>({
    kmInicial: 0,
    inicioDeslocamento: new Date().toISOString(),
    checkList: '',
    motivo: '',
    observacao: '',
    idCondutor: 0,
    idVeiculo: 0,
    idCliente: 0
  });
  console.log(formData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //'https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento'
   createItem('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento', formData)
  };

  return (
    <main>
      <Menu/>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="KM Inicial"
          name="kmInicial"
          value={formData.kmInicial}
          onChange={handleChange}
          required
          fullWidth
        />
        
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="motivo"
          name="motivo"
          value={formData.motivo}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="Observacão"
          name="observacao"
          value={formData.observacao}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="checkList"
          name="checkList"
          value={formData.checkList}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="ID Condutor"
          name="idCondutor"
          value={formData.idCondutor}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="ID Veiculo"
          name="idVeiculo"
          value={formData.idVeiculo}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          variant="standard"
          sx={{ m: 3 }}
          label="ID Cliente"
          name="idCliente"
          value={formData.idCliente}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Iniciar deslocamento
        </Button>
      </form>
    </main>
  );
}
