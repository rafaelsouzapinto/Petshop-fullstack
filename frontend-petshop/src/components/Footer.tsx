import { Typography } from "@mui/material";
import "../styles/footer.css";
import { Laptop2 } from "lucide-react";

export default function Footer() {
  return (
    <div className="footer-container">
      <hr />
      <div className="footer-icon">
        <Laptop2 />
      </div>
      <div className="footer-text">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: "1em",
          }}
        >
          Desenvolvido por Rafael Souza - 2025
        </Typography>
      </div>
      <hr />
    </div>
  );
}
