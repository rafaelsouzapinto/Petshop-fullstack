import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";

interface EditClientDialogProps {
  open: boolean;
  onClose: () => void;
  client: { id: number; name: string; cpf: string } | null;
  onClientUpdated: () => void;
  putUrl: string;
}

export default function EditClientDialog({
  open,
  onClose,
  client,
  onClientUpdated,
  putUrl,
}: EditClientDialogProps) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    if (client) {
      setName(client.name);
      setCpf(client.cpf);
    }
  }, [client]);

  const handleUpdateClient = async () => {
    if (!client) return;

    const updatedClient = { id: client.id, name, cpf };

    try {
      await axios.put(`${putUrl}/${client.id}`, updatedClient);
      onClose();
      onClientUpdated(); // Atualiza a lista de clientes
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Cliente</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="CPF"
          fullWidth
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <PrimaryButton onClick={onClose} variantStyle="delete">
          Cancelar
        </PrimaryButton>
        <PrimaryButton
          onClick={handleUpdateClient}
          variant="contained"
          color="primary"
          variantStyle="primary"
        >
          Salvar
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
