import Header from "../components/Header";
import "../styles/pets-page.css";

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
import Pets from "../interfaces/Pets";
import { UserPen, UserRoundPlus } from "lucide-react";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import EditPetDialog from "../components/EditPetDialog";
import DeletePetDialog from "../components/DeletePetDialog";

const url = "http://localhost:8080/pets";

export default function PetsPage() {
  const [pets, setPets] = useState<Pets[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedPet, setSelectedPet] = useState<Pets | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [petToDelete, setPetToDelete] = useState<Pets | null>(null);

  const handleOpenEditDialog = (pet: Pets) => {
    setSelectedPet(pet);
    setEditDialogOpen(true);
  };

  const handlePetUpdated = async () => {
    await fetchData();
  };

  const handleOpenDeleteDialog = (pet: Pets) => {
    setPetToDelete(pet);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setPetToDelete(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<Pets[]>(url);
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar os pets:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <>
        <Header />
        <div className="filter-container">
          {/* Botão para adicionar pet */}
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
                  <TableCell>Raça</TableCell>
                  <TableCell>Espécie</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map((pet: Pets) => {
                  return (
                    <TableRow key={pet.id}>
                      <TableCell>{pet.id}</TableCell>
                      <TableCell>{pet.name}</TableCell>
                      <TableCell>{pet.breed}</TableCell>
                      <TableCell>{pet.type}</TableCell>
                      <TableCell>
                        <div className="crud-buttons">
                          <PrimaryButton
                            variantStyle="primary"
                            onClick={() => handleOpenEditDialog(pet)}
                          >
                            <UserPen fontSize="medium" />
                          </PrimaryButton>
                          <PrimaryButton
                            variantStyle="delete"
                            onClick={() => handleOpenDeleteDialog(pet)}
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
        <EditPetDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          pet={selectedPet}
          onPetUpdated={handlePetUpdated}
          putUrl={url}
        />
        <DeletePetDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          pet={petToDelete}
          onPetDeleted={fetchData}
          deleteUrl={url}
        />
      </>
    </div>
  );
}
