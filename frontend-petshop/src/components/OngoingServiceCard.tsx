import { Typography } from "@mui/material";
import "../styles/ongoing-service-card.css";

interface OngoingServiceProps {
  finalPrice: number;
  serviceStatus: string;
  pet: {
    name: string;
  };
  service: {
    category: string;
    serviceImage: string;
  };
}

export default function OngoingServiceCard({
  finalPrice,
  serviceStatus,
  pet,
  service,
}: OngoingServiceProps) {
  return (
    <div className="ongoing-service">
      <div className="ongoing-service-image">
        {
          <img
            className="ongoing-service-image-item"
            src={service.serviceImage}
            alt={`Imagem do serviço ${service.category}`}
          />
        }
      </div>
      <div className="ongoing-service-details">
        <Typography
          variant="h6"
          component="h2"
          sx={{
            lineHeight: "25px",
            color: "#f5e6d9",
          }}
        >
          {service.category}
        </Typography>
        <Typography variant="subtitle2" component="p" color="textSecondary">
          Pet: <strong>{pet.name}</strong>
        </Typography>
        <Typography variant="subtitle2" component="p" color="textSecondary">
          Status: <strong>{serviceStatus}</strong>
        </Typography>
        <Typography variant="subtitle2" component="p" color="textSecondary">
          Preço final: R${finalPrice.toFixed(2)}
        </Typography>
      </div>
    </div>
  );
}
