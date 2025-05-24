import { Typography } from "@mui/material";
import "../styles/available-service-card.css";

interface AvailableServiceProps {
  category: string;
  isAvailable: boolean;
  basePrice: number;
  serviceImage: string;
}

export default function AvailableServiceCard({
  category,
  basePrice,
  serviceImage,
}: AvailableServiceProps) {
  return (
    <div className="available-service-container">
      <div className="available-service">
        <div className="available-service-image">
          {
            <img
              src={serviceImage}
              className="available-service-image-item"
              alt={`Imagem do serviço "${category}"`}
            />
          }
        </div>
        <div className="available-service-details">
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: "#f5e6d9",
            }}
          >
            {category}
          </Typography>
          <Typography variant="subtitle1" component="p" color="textSecondary">
            Valor: R${basePrice.toFixed(2)}
          </Typography>
        </div>
      </div>
    </div>
  );
}
