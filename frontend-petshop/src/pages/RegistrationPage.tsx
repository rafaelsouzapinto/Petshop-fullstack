import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import "../styles/registration-page.css";

export default function RegistrationPage() {
  return (
    <>
      <div className="container">
        <div className="form-container">
          <div className="form">
            <div className="form-title">
              <Typography variant="h6" component="h2" color="textSecondary">
                Cadastro de consultas
              </Typography>
            </div>
            <div className="amount-form">
              <FormControl
                fullWidth
                sx={{
                  m: 1,
                  width: "92ch",
                  background: "#ffffff",
                  borderRadius: "5px",
                }}
                variant="filled"
              >
                <InputLabel htmlFor="filled-adornment-amount">
                  Amount
                </InputLabel>
                <FilledInput
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="service-status-form"></div>
            <div className="pet-form"></div>
            <div className="service-form"></div>
          </div>
        </div>
      </div>
    </>
  );
}
