import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
  onClientAdded: () => void;
  postUrl: string;
}

export default function AddClientDialog({
  open,
  onClose,
  onClientAdded,
  postUrl,
}: AddClientDialogProps) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const handleAddClient = async () => {
    const newClient = { name, cpf };

    const res = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    });

    if (res.ok) {
      setName("");
      setCpf("");
      onClose();
      onClientAdded(); // notifica o componente pai para recarregar a lista
    } else {
      alert("Erro ao adicionar cliente");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Cliente</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
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
          onClick={handleAddClient}
          variant="contained"
          color="primary"
          variantStyle="primary"
        >
          Adicionar
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
