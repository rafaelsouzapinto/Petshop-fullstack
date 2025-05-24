import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Pets from "../interfaces/Pets";

interface EditPetDialogProps {
  open: boolean;
  onClose: () => void;
  pet: Pets | null;
  onPetUpdated: () => void;
  putUrl: string;
}

export default function EditPetDialog({
  open,
  onClose,
  pet,
  onPetUpdated,
  putUrl,
}: EditPetDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [months, setMonths] = useState(0);
  const [sex, setSex] = useState<"FEMALE" | "MALE">("MALE");
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setType(pet.type);
      setBreed(pet.breed);
      setMonths(pet.months);
      setSex(pet.sex);
      setWeight(pet.weight);
    }
  }, [pet]);

  const handleUpdatePet = async () => {
    if (!pet) return;

    const updatedPet: Pets = {
      ...pet,
      name,
      type,
      breed,
      months,
      sex,
      weight,
    };

    try {
      console.log("Enviando pet atualizado:", updatedPet);
      await axios.put(`${putUrl}/${pet.id}`, updatedPet);
      onClose();
      onPetUpdated();
    } catch (error) {
      console.error("Erro ao atualizar pet:", error);
      alert("Erro ao atualizar pet");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Pet</DialogTitle>
      <DialogContent>
        <TextField
          id="edit-pet-name"
          margin="dense"
          label="Nome"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="edit-pet-type"
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
          id="edit-pet-breed"
          margin="dense"
          label="Raça"
          fullWidth
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <TextField
          id="edit-pet-months"
          margin="dense"
          label="Idade (meses)"
          fullWidth
          type="number"
          value={months}
          onChange={(e) => setMonths(parseInt(e.target.value))}
        />
        <TextField
          id="edit-pet-sex"
          margin="dense"
          label="Sexo"
          fullWidth
          select
          value={sex}
          onChange={(e) => setSex(e.target.value as "FEMALE" | "MALE")}
        >
          <MenuItem value="FEMALE">Fêmea</MenuItem>
          <MenuItem value="MALE">Macho</MenuItem>
        </TextField>
        <TextField
          id="edit-pet-weight"
          margin="dense"
          label="Peso (kg)"
          fullWidth
          type="number"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
        <TextField
          id="edit-pet-client"
          margin="dense"
          label="Cliente"
          fullWidth
          disabled
          value={pet?.client?.name || ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleUpdatePet} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
