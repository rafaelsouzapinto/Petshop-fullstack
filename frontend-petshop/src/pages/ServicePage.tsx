import axios from "axios";
import OngoingServiceCard from "../components/OngoingServiceCard";

import "../styles/service-page.css";
import { useEffect, useState } from "react";
import Registration from "../interfaces/Registration";

export default function ServicePage() {
  const [registrations, setRegistration] = useState<Registration[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/registration") // ajuste para sua URL
      .then((response) => {
        setRegistration(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços:", error);
      });
  }, []);

  return (
    <div className="service-page-container">
      <div>Serviços disponíveis</div>
      <div>
        <h1>Serviços em andamento</h1>
        <div>
          <h2>filtros: </h2>
        </div>
        <div className="services-container">
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
