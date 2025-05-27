import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import "../styles/registration-page.css";
import Header from "../components/Header";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Pets from "../interfaces/Pets";
import Service from "../interfaces/Service";
import PrimaryButton from "../components/PrimaryButton";
import { Save } from "lucide-react";

export default function RegistrationPage() {
  const [statusList, setStatusList] = useState<ServiceStatus[]>([]);
  const [pets, setPets] = useState<Pets[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [formData, setFormData] = useState({
    amount: "",
    status: "",
    description: "",
    petId: "",
    serviceId: "",
  });

  const handleSubmit = async () => {
    if (
      !formData.amount ||
      !formData.status ||
      !formData.petId ||
      !formData.serviceId
    ) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const dataToSend = {
        finalPrice: parseFloat(formData.amount),
        serviceStatus: formData.status,
        description: formData.description,
        pet: {
          id: parseInt(formData.petId),
        },
        service: {
          id: parseInt(formData.serviceId),
        },
      };

      await axios.post("http://localhost:8080/registration", dataToSend);

      alert("Consulta cadastrada com sucesso!");

      setFormData({
        amount: "",
        status: "",
        description: "",
        petId: "",
        serviceId: "",
      });
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      alert("Erro ao salvar. Tente novamente.");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  {
    /* Método get de status*/
  }
  type ServiceStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  const StatusFetchData = useCallback(async () => {
    try {
      const response = await axios.get<ServiceStatus[]>(
        "http://localhost:8080/status"
      );
      setStatusList(response.data);
    } catch (error) {
      console.error("Erro ao buscar os status:", error);
    }
  }, []);

  {
    /* Método get de pets*/
  }
  const PetsFetchData = async () => {
    try {
      const response = await axios.get<Pets[]>("http://localhost:8080/pets");
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
    }
  };

  {
    /* Método get de serviços*/
  }
  const ServiceFetchData = async () => {
    try {
      const response = await axios.get<Service[]>(
        "http://localhost:8080/available-service"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar os serviços:", error);
    }
  };

  {
    /* Faz a requisição dos métodos ao carregar a página */
  }
  useEffect(() => {
    PetsFetchData();
    StatusFetchData();
    ServiceFetchData();
  }, [StatusFetchData]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="form-container">
          <img
            src="../pegada-pet-390.png"
            className="pegada-pet-390"
            alt="pegada-pet"
          />
          <img
            src="../pegada-pet-220.png"
            className="pegada-pet-220"
            alt="pegada-pet"
          />

          <div className="form-title">
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: "2.5em",
              }}
            >
              Cadastro de consultas
            </Typography>
          </div>

          <div className="form">
            <div className="form-item">
              <Typography variant="h6" component="h2" color="textSecondary">
                Valor:
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  m: 1,
                  width: "31ch",
                  borderRadius: "5px",
                }}
                variant="filled"
              >
                <InputLabel htmlFor="filled-adornment-amount">
                  Amount
                </InputLabel>
                <FilledInput
                  id="filled-adornment-amount"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  inputProps={{ inputMode: "decimal" }}
                />
              </FormControl>
            </div>

            <div className="form-item">
              <Typography variant="h6" component="h2" color="textSecondary">
                Status:
              </Typography>

              <FormControl required sx={{ m: 1, minWidth: 280 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={formData.status}
                  label="Status"
                  onChange={handleSelectChange}
                  name="status"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {statusList.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="form-item">
              <Typography variant="h6" component="h2" color="textSecondary">
                Pet:
              </Typography>

              <FormControl required sx={{ m: 1, minWidth: 280 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Pet
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={formData.petId}
                  label="Pets"
                  onChange={handleSelectChange}
                  name="petId"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {pets.map((pet) => (
                    <MenuItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="form-item">
              <Typography variant="h6" component="h2" color="textSecondary">
                Serviço:
              </Typography>
              <FormControl required sx={{ m: 1, minWidth: 280 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Serviços
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={formData.serviceId}
                  label="Serviços"
                  onChange={handleSelectChange}
                  name="serviceId"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="form-item">
              <Typography variant="h6" component="h2" color="textSecondary">
                Descrição:
              </Typography>
              <TextField
                id="outlined-multiline-static"
                name="description"
                label="Descrição"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                defaultValue=""
                sx={{
                  m: 1,
                  width: "280px",
                }}
              />
            </div>
            <PrimaryButton
              variant="contained"
              variantStyle="primary"
              sx={{ width: "120px" }}
              onClick={handleSubmit}
            >
              <Save size={18} />
              Salvar
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
