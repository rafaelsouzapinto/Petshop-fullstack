import "../styles/ongoing-service-card.css";

interface OngoingServiceProps {
  finalPrice: number;
  serviceStatus: string;
  pet: {
    name: string;
  };
  service: {
    category: string;
    // imageUrl: string; virá a imagem aqui futuramente
  };
}

export default function OngoingServiceCard({
  finalPrice,
  serviceStatus,
  pet,
  service,
}: OngoingServiceProps) {
  return (
    <div>
      <div className="ongoing-service">
        <div className="ongoing-service-image">
          <img src="#" alt="imagem-do-serviço" />
          {/* <img src={service.imageUrl} alt={`Imagem do serviço ${service.category}`} /> */}
        </div>
        <div className="ongoing-service-details">
          <h3>{service.category}</h3>
          <p>
            Pet: <strong>{pet.name}</strong>
          </p>
          <p>
            Status: <strong>{serviceStatus}</strong>
          </p>
          <p>Preço final: R${finalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
