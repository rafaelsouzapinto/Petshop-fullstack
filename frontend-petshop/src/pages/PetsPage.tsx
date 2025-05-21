import Header from "../components/Header";
import "../styles/pets-page.css";

import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import "../styles/client-page.css";
import { useState, useEffect } from "react";
import Pets from "../interfaces/Pets";
import {
  Search,
  SlidersHorizontal,
  UserPen,
  UserRoundPlus,
} from "lucide-react";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import EditPetDialog from "../components/EditPetDialog";
import DeletePetDialog from "../components/DeletePetDialog";
import Client from "../interfaces/Client";
import AddPetDialog from "../components/AddPetDialog";

const url = "http://localhost:8080/pets";

export default function PetsPage() {
  const [pets, setPets] = useState<Pets[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedPet, setSelectedPet] = useState<Pets | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [petToDelete, setPetToDelete] = useState<Pets | null>(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const handleOpenEditDialog = (pet: Pets) => {
    setSelectedPet(pet);
    setEditDialogOpen(true);
  };

  const handlePetUpdated = async () => {
    await fetchPetsData();
  };

  const handleOpenDeleteDialog = (pet: Pets) => {
    setPetToDelete(pet);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setPetToDelete(null);
  };

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const fetchPetsData = async () => {
    try {
      const response = await axios.get<Pets[]>(url);
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar os pets:", error);
    }
  };

  const fetchClientsData = async () => {
    try {
      const response = await axios.get<Client[]>(
        "http://localhost:8080/clients"
      );
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
    }
  };

  useEffect(() => {
    fetchPetsData();
    fetchClientsData();
  }, []);

  return (
    <div>
      <>
        <Header />
        <div className="filter-container">
          <PrimaryButton variantStyle="primary" onClick={handleOpenAddDialog}>
            <UserRoundPlus size={18} /> adicionar
          </PrimaryButton>

          <div className="filter">
            <div className="filter-item">
              <Search size={"18px"} />
              <TextField
                label="Buscar por nome"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-item">
              <SlidersHorizontal size={"18px"} />
              <TextField
                select
                label="Filtrar por espécie"
                variant="outlined"
                size="small"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{ minWidth: 150 }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Cachorro">Cachorro</MenuItem>
                <MenuItem value="Gato">Gato</MenuItem>
                <MenuItem value="Outros">Outros</MenuItem>
              </TextField>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="table-container"></div>
          <div className="table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Raça</TableCell>
                  <TableCell>Espécie</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets
                  .filter((pet) => {
                    const matchesSearch = pet.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                    const matchesType = typeFilter
                      ? pet.type === typeFilter
                      : true;
                    return matchesSearch && matchesType;
                  })
                  .map((pet: Pets) => {
                    return (
                      <TableRow key={pet.id}>
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
          onPetDeleted={fetchPetsData}
          deleteUrl={url}
        />
        <AddPetDialog
          open={openAddDialog}
          onClose={handleCloseAddDialog}
          onPetAdded={fetchPetsData}
          availableClients={clients}
          postUrl={url}
        />
      </>
    </div>
  );
}
