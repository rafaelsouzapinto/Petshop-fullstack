import axios from "axios";
import OngoingServiceCard from "../components/OngoingServiceCard";

import "../styles/service-page.css";
import { useEffect, useState } from "react";
import Registration from "../interfaces/Registration";
import Service from "../interfaces/Service";
import AvailableServiceCard from "../components/AvailableServiceCard";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { MenuItem, Pagination, TextField, Typography } from "@mui/material";
import { Search, SlidersHorizontal } from "lucide-react";
import { ServiceDialog } from "../components/ServiceDialog";
import { AvailableServiceDialog } from "../components/AvailableServiceDialog";
import RegistrationPage from "./RegistrationPage";
import Footer from "../components/Footer";

export type ServiceStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export default function ServicePage() {
  const [registrations, setRegistration] = useState<Registration[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [searchPetName, setSearchPetName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredRegistrations, setFilteredRegistrations] =
    useState(registrations);

  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);

  const handleOpenDialog = (registration: Registration) => {
    setSelectedRegistration(registration);
    setOpenRegistrationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenRegistrationDialog(false);
    setSelectedRegistration(null);
  };

  const handleOpenServiceDialog = (service: Service) => {
    setSelectedService(service);
    setServiceDialogOpen(true);
  };

  const handleCloseServiceDialog = () => {
    setServiceDialogOpen(false);
    setSelectedService(null);
  };

  const handleUpdateStatus = (newStatus: ServiceStatus) => {
    if (!selectedRegistration) return;

    const updatedRegistration = {
      ...selectedRegistration,
      serviceStatus: newStatus,
    };
    axios
      .put(
        `http://localhost:8080/registration/${selectedRegistration.id}`,
        updatedRegistration
      )
      .then(() => {
        setRegistration((prev) =>
          prev.map((item) =>
            item.id === selectedRegistration.id ? updatedRegistration : item
          )
        );
        handleCloseDialog();
      })
      .catch((error) => {
        console.error("Erro ao atualizar status:", error);
      });
  };

  const handleSaveService = (updatedService: Service) => {
    const updatedServices = services.map((s) =>
      s.id === updatedService.id ? updatedService : s
    );
    setServices(updatedServices);

    axios
      .put(
        `http://localhost:8080/available-service/${updatedService.id}`,
        updatedService
      )
      .then(() => {
        console.log("Serviço atualizado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao atualizar serviço:", error);
      });
  };

  useEffect(() => {
    if (!registrations) return;

    const filtered = registrations.filter((registration) => {
      const matchesName = registration.pet.name
        .toLowerCase()
        .includes(searchPetName.toLowerCase());

      const matchesStatus =
        !filterStatus || registration.serviceStatus === filterStatus;

      return matchesName && matchesStatus;
    });

    setFilteredRegistrations(filtered);
  }, [searchPetName, filterStatus, registrations]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/registration")
      .then((response) => {
        const activeRegistrations = response.data.filter(
          (r: Registration) =>
            r.serviceStatus === "PENDING" || r.serviceStatus === "IN_PROGRESS"
        );
        setRegistration(activeRegistrations);
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços em andamento:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/available-service")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços disponíveis:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegistrations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

  return (
    <div className="service-page-container">
      <div className="services-container">
        <img src="../osso-pet.png" className="osso-pet" alt="osso-pet" />
        <div className="services-title">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: "3em",
            }}
          >
            Bem vindo de volta!
          </Typography>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{
              fontSize: "1.1em",
            }}
          >
            Pronto para cuidar de alguns bichinhos?
          </Typography>
        </div>
        <div className="caroussel-container">
          <Swiper slidesPerView={1} navigation autoplay>
            {services.map((service) => (
              <SwiperSlide>
                <div
                  key={service.id}
                  onClick={() => handleOpenServiceDialog(service)}
                >
                  <AvailableServiceCard
                    category={service.category}
                    isAvailable={service.isAvailable}
                    basePrice={service.basePrice}
                    serviceImage={service.serviceImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="register-container">
        <RegistrationPage />
      </div>
      <div className="registration-container">
        <div className="registration-details">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: "3em",
            }}
          >
            Serviços em andamento
          </Typography>
          <div className="registration-filter">
            <div className="registration-filter-item">
              <Search size={"18px"} />
              <TextField
                id="search-pet"
                label="Nome do pet"
                variant="outlined"
                size="small"
                value={searchPetName}
                onChange={(e) => {
                  setSearchPetName(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="registration-filter-item">
              <SlidersHorizontal size={"18px"} />
              <TextField
                id="filter-status"
                select
                label="Filtrar por status"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                size="small"
                sx={{
                  width: "200px",
                }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="PENDING">Pendente</MenuItem>
                <MenuItem value="IN_PROGRESS">Em andamento</MenuItem>
                <MenuItem value="COMPLETED">Concluído</MenuItem>
                <MenuItem value="CANCELLED">Cancelado</MenuItem>
              </TextField>
            </div>
          </div>
        </div>
        <div className="registration-items">
          {currentItems.map((registration) => (
            <OngoingServiceCard
              key={registration.id}
              finalPrice={registration.finalPrice}
              serviceStatus={registration.serviceStatus}
              pet={{ name: registration.pet.name }}
              service={{
                category: registration.service.category,
                serviceImage: registration.service.serviceImage,
              }}
              onClick={() => handleOpenDialog(registration)}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
      <ServiceDialog
        open={openRegistrationDialog}
        onClose={handleCloseDialog}
        registration={selectedRegistration}
        onUpdateStatus={handleUpdateStatus}
      />
      <AvailableServiceDialog
        open={serviceDialogOpen}
        onClose={handleCloseServiceDialog}
        service={selectedService}
        onSave={handleSaveService}
      />
      <Footer />
    </div>
  );
}
