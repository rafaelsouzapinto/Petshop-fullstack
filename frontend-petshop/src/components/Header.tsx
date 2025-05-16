import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import PrimaryButton from "./PrimaryButton";
import { Cat, FileInput, Users } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img className="logo-image" src="../logo1-160.png" alt="logo" />
        </div>
        <div className="buttons">
          <PrimaryButton
            variantStyle="secondary"
            onClick={() => navigate("/clients")}
          >
            <Users size={18} />
            Clients
          </PrimaryButton>
          <PrimaryButton
            variantStyle="secondary"
            onClick={() => navigate("/pets")}
          >
            <Cat size={18} />
            Pets
          </PrimaryButton>
          <PrimaryButton
            variantStyle="secondary"
            onClick={() => navigate("/registration")}
          >
            <FileInput size={18} />
            Cadastro
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
