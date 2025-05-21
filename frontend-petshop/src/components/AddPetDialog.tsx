import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

interface Client {
  id: number;
  name: string;
  cpf: string;
}

interface AddPetDialogProps {
  open: boolean;
  onClose: () => void;
  onPetAdded: () => void;
  postUrl: string;
  availableClients: Client[];
}

export default function AddPetDialog({
  open,
  onClose,
  onPetAdded,
  postUrl,
  availableClients,
}: AddPetDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [months, setMonths] = useState(0);
  const [sex, setSex] = useState("MALE");
  const [weight, setWeight] = useState(0);
  const [clientId, setClientId] = useState<number | "">("");

  const resetForm = () => {
    setName("");
    setType("");
    setBreed("");
    setMonths(0);
    setSex("MALE");
    setWeight(0);
    setClientId("");
  };

  const handleAddPet = async () => {
    if (clientId === "") {
      alert("Selecione um cliente responsável pelo pet.");
      return;
    }

    const newPet = {
      name,
      type,
      breed,
      months,
      sex,
      weight,
      client: {
        id: clientId,
      },
    };

    const res = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPet),
    });

    if (res.ok) {
      resetForm();
      onClose();
      onPetAdded(); // notifica o pai para recarregar a lista
    } else {
      alert("Erro ao adicionar pet.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar Pet</DialogTitle>
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
          label="Tipo"
          fullWidth
          select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="Cachorro">Cachorro</MenuItem>
          <MenuItem value="Gato">Gato</MenuItem>
          <MenuItem value="Outro">Outro</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Raça"
          fullWidth
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Idade (meses)"
          type="number"
          fullWidth
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label="Sexo"
          select
          fullWidth
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        >
          <MenuItem value="MALE">Macho</MenuItem>
          <MenuItem value="FEMALE">Fêmea</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Peso (kg)"
          type="number"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label="Cliente Responsável"
          select
          fullWidth
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
        >
          {availableClients.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name} (CPF: {client.cpf})
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <PrimaryButton onClick={onClose} variantStyle="delete">
          Cancelar
        </PrimaryButton>
        <PrimaryButton
          onClick={handleAddPet}
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
