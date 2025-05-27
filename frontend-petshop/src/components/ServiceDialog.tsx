import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Registration from "../interfaces/Registration";
import PrimaryButton from "./PrimaryButton";

export type ServiceStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type ServiceDialogProps = {
  open: boolean;
  onClose: () => void;
  registration: Registration | null;
  onUpdateStatus: (status: ServiceStatus) => void;
};

export const ServiceDialog = ({
  open,
  onClose,
  registration,
  onUpdateStatus,
}: ServiceDialogProps) => {
  if (!registration) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        variant="h2"
        component="h1"
        sx={{
          fontSize: "2em",
        }}
      >
        Detalhes do Serviço
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Pet: <strong>{registration.pet.name}</strong>
        </Typography>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Serviço: <strong>{registration.service.category} </strong>
        </Typography>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Descrição: <strong>{registration.description} </strong>
        </Typography>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Preço Final:<strong> R$ {registration.finalPrice}</strong>
        </Typography>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Status Atual: <strong>{registration.serviceStatus} </strong>
        </Typography>

        <TextField
          select
          label="Alterar Status"
          value={registration.serviceStatus}
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => onUpdateStatus(e.target.value as ServiceStatus)}
        >
          <MenuItem value="PENDING">Pendente</MenuItem>
          <MenuItem value="IN_PROGRESS">Em andamento</MenuItem>
          <MenuItem value="COMPLETED">Concluído</MenuItem>
          <MenuItem value="CANCELLED">Cancelado</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <PrimaryButton onClick={onClose} variantStyle="delete">
          Fechar
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
