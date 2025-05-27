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
  onClick?: () => void;
}

export default function OngoingServiceCard({
  finalPrice,
  serviceStatus,
  pet,
  service,
  onClick,
}: OngoingServiceProps) {
  return (
    <div
      className="ongoing-service"
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.2)";
      }}
    >
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
