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
import { MenuItem, TextField } from "@mui/material";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ServicePage() {
  const [registrations, setRegistration] = useState<Registration[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [searchPetName, setSearchPetName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredRegistrations, setFilteredRegistrations] =
    useState(registrations);

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
        setRegistration(response.data);
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

  return (
    <div className="service-page-container">
      <div className="services-container">
        <div className="services-initial">
          <h1>Bem vindo de volta!</h1>
          <p>Pronto para cuidar de alguns bichinhos?</p>
        </div>
        <div className="caroussel-container">
          <Swiper>
            {services.map((service) => (
              <SwiperSlide>
                <div key={service.id}>
                  <AvailableServiceCard
                    category={service.category}
                    isAvailable={service.isAvailable}
                    basePrice={service.basePrice}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="registration-container">
        <div className="registration-details">
          <h1>Serviços em andamento</h1>
          <div className="registration-filter">
            <div className="registration-filter-item">
              <Search size={"18px"} />
              <TextField
                id="search-pet"
                label="Nome do pet"
                variant="outlined"
                size="small"
                value={searchPetName}
                onChange={(e) => setSearchPetName(e.target.value)}
              />
            </div>

            <div className="registration-filter-item">
              <SlidersHorizontal size={"18px"} />
              <TextField
                id="filter-status"
                select
                label="Filtrar por status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
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
          {filteredRegistrations.map((registration) => (
            <OngoingServiceCard
              key={registration.id}
              finalPrice={registration.finalPrice}
              serviceStatus={registration.serviceStatus}
              pet={{ name: registration.pet.name }}
              service={{
                category: registration.service.category,
                // imageUrl: getImageUrl(service.service.category)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para simular retorno de imagem baseado na categoria
/*
  function getImageUrl(category: string): string {
    const categoryMap: { [key: string]: string } = {
      "Banho e Tosa Médio Porte": "/images/banho_tosa_medio.jpg",
      "Vacinação": "/images/vacinacao.jpg",
      // etc.
    };
  return categoryMap[category] || "/images/servico_padrao.jpg";
  }
*/
