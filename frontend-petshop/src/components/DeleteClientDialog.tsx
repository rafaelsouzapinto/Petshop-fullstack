import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import PrimaryButton from "./PrimaryButton";

interface DeleteClientDialogProps {
  open: boolean;
  onClose: () => void;
  client: { id: number; name: string } | null;
  onClientDeleted: () => void;
  deleteUrl: string;
}

export default function DeleteClientDialog({
  open,
  onClose,
  client,
  onClientDeleted,
  deleteUrl,
}: DeleteClientDialogProps) {
  const handleDelete = async () => {
    const res = await fetch(`${deleteUrl}/${client?.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      onClose();
      onClientDeleted(); // Atualiza a lista de clientes
    } else {
      alert("Erro ao excluir cliente");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir o cliente
          <strong>{client?.name}</strong>?
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
