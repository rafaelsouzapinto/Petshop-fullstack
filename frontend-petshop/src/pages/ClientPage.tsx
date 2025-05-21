import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import "../styles/client-page.css";
import { useState, useEffect } from "react";
import Client from "../interfaces/Client";
import { UserPen, UserRoundPlus } from "lucide-react";
import PrimaryButton from "../components/PrimaryButton";
import Header from "../components/Header";
import DeleteClientDialog from "../components/DeleteClientDialog";
import axios from "axios";
import AddClientDialog from "../components/AddClientDialog";
import EditClientDialog from "../components/EditClientDialog";

const url = "http://localhost:8080/clients";

export default function ClientPage() {
  const [clients, setClients] = useState<Client[]>([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<{
    id: number;
    name: string;
    cpf: string;
  } | null>(null);

  const handleEditClick = (client: {
    id: number;
    name: string;
    cpf: string;
  }) => {
    setSelectedClient(client);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const handleClientAdded = async () => {
    await fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<Client[]>(url);
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="filter-container">
        {/* Botão para adicionar usuário */}
        <PrimaryButton variantStyle="primary" onClick={handleOpenAddDialog}>
          <UserRoundPlus size={18} /> adicionar
        </PrimaryButton>
      </div>
      <div className="container">
        <div className="table-container"></div>
        <div className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Cpf</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => {
                return (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.cpf}</TableCell>
                    <TableCell>
                      <div className="crud-buttons">
                        <PrimaryButton
                          variantStyle="primary"
                          onClick={() => handleEditClick(client)}
                        >
                          <UserPen fontSize="medium" />
                        </PrimaryButton>
                        <PrimaryButton
                          variantStyle="delete"
                          onClick={() => handleDeleteClick(client)}
                        >
                          <DeleteIcon fontSize="medium" />
                        </PrimaryButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <EditClientDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        client={selectedClient}
        onClientUpdated={handleClientAdded}
        putUrl={url}
      />

      <DeleteClientDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        client={clientToDelete}
        onClientDeleted={fetchData}
        deleteUrl={url}
      />

      <AddClientDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        onClientAdded={handleClientAdded}
        postUrl={url}
      />
    </>
  );
}
