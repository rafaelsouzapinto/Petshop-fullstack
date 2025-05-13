import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

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
    const updatedClient = { id: client?.id, name, cpf };

    const res = await fetch(`${putUrl}/${client?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedClient),
    });

    if (res.ok) {
      onClose();
      onClientUpdated(); // Atualiza a lista
    } else {
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
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleUpdateClient}
          variant="contained"
          color="primary"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
