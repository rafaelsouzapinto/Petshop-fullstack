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

const url = "http://localhost:8080/clients";

export default function ClientPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const [clients, setClients] = useState<Client[]>([]);

  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="filter-container">
        {/* Botão para adicionar usuário */}
        <PrimaryButton variantStyle="primary">
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
                        <PrimaryButton variantStyle="primary">
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
      <DeleteClientDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        client={clientToDelete}
        onClientDeleted={fetchData}
        deleteUrl={url}
      />
    </>
  );
}
