import "../styles/available-service-card.css";

interface AvailableServiceProps {
  category: string;
  isAvailable: boolean;
  basePrice: number;
  //serviceImage: string;
}

export default function AvailableServiceCard({
  category,
  basePrice,
}: AvailableServiceProps) {
  return (
    <div className="available-service-container">
      <div className="available-service">
        <div className="available-service-image">
          <img src="#" alt="imagem-do-serviço" />
          {/* <img src={serviceImage} alt={`Imagem do serviço ${category}`} /> */}
        </div>
        <div className="available-service-details">
          <h3>{category}</h3>
          <p>Valor: R${basePrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
