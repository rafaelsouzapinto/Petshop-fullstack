import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import PrimaryButton from "./PrimaryButton";

interface DeletePetDialogProps {
  open: boolean;
  onClose: () => void;
  pet: { id: number; name: string } | null;
  onPetDeleted: () => void;
  deleteUrl: string;
}

export default function DeletePetDialog({
  open,
  onClose,
  pet,
  onPetDeleted,
  deleteUrl,
}: DeletePetDialogProps) {
  const handleDelete = async () => {
    const res = await fetch(`${deleteUrl}/${pet?.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      onClose();
      onPetDeleted(); // Atualiza a lista de pets
    } else {
      alert("Erro ao excluir pet");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir o pet <strong>{pet?.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <PrimaryButton
          onClick={handleDelete}
          color="error"
          variant="contained"
          variantStyle="delete"
        >
          Excluir
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
