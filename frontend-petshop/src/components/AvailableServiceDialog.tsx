import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";

interface AvailableService {
  id: number;
  category: string;
  isAvailable: boolean;
  basePrice: number;
  serviceImage: string;
}

interface AvailableServiceDialogProps {
  open: boolean;
  onClose: () => void;
  service: AvailableService | null;
  onSave: (updatedService: AvailableService) => void;
}

export const AvailableServiceDialog = ({
  open,
  onClose,
  service,
  onSave,
}: AvailableServiceDialogProps) => {
  const [basePrice, setBasePrice] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  useEffect(() => {
    if (service) {
      setBasePrice(service.basePrice);
      setIsAvailable(service.isAvailable);
    }
  }, [service]);

  if (!service) return null;

  const handleSave = () => {
    const updatedService: AvailableService = {
      ...service,
      basePrice,
      isAvailable,
    };
    onSave(updatedService);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        variant="h2"
        component="h1"
        sx={{
          fontSize: "2em",
        }}
      >
        Editar Serviço
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6">{service.category}</Typography>

        <img
          src={service.serviceImage}
          alt={service.category}
          style={{ width: "100%", borderRadius: "8px" }}
        />

        <TextField
          label="Preço Base (R$)"
          type="number"
          value={basePrice}
          onChange={(e) => setBasePrice(parseFloat(e.target.value))}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
          }
          label={isAvailable ? "Disponível" : "Indisponível"}
        />
      </DialogContent>

      <DialogActions>
        <PrimaryButton
          onClick={handleSave}
          variant="contained"
          color="primary"
          variantStyle="primary"
        >
          Salvar
        </PrimaryButton>
        <PrimaryButton onClick={onClose} variantStyle="delete">
          Cancelar
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
