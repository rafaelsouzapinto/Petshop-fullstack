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

const url = "http://localhost:8080/pets";

export default function PetsPage() {
  const [pets, setPets] = useState<Pets[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setPets(data);
    };
    fetchData();
  }, []);
  return (
    <div>
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
                  <TableCell>Raça</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map((pets) => {
                  return (
                    <TableRow key={pets.id}>
                      <TableCell>{pets.id}</TableCell>
                      <TableCell>{pets.name}</TableCell>
                      <TableCell>{pets.breed}</TableCell>
                      <TableCell>
                        <div className="crud-buttons">
                          <PrimaryButton variantStyle="primary">
                            <UserPen fontSize="medium" />
                          </PrimaryButton>
                          <PrimaryButton variantStyle="delete">
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
      </>
    </div>
  );
}
