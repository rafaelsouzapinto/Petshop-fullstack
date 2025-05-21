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

export default function ServicePage() {
  const [registrations, setRegistration] = useState<Registration[]>([]);
  const [services, setServices] = useState<Service[]>([]);

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

      <div>
        <h1>Serviços em andamento</h1>
        <div>
          <h2>filtros: </h2>
        </div>
        <div className="registrations-container">
          {registrations.map((registration) => (
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
