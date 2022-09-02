import "./ProviderHistory.css";
import { Avatar, Grid, Stack } from "@mui/material";
import { useState } from "react";

interface props {
  id: string;
  name: string;
  date: string;
  time: string;
  value: number;
  address: string;
  details: string;
}
export const ProviderHistory: React.FC<props> = ({
  name,
  date,
  time,
  value,
  address,
  details,
}) => {
  const [checked, setChecked] = useState();

  function iniciais(string: string) {
    let iniciais = "";
    let nomeArray = string.split(" ", 2);
    nomeArray.forEach((e) => {
      return (iniciais += e.substring(0, 1).toLocaleUpperCase());
    });
    return iniciais;
  }

  
  function decimals(int: number){
    return int.toFixed(2)
  }

  return (
    <Grid item xs={12}>
      <div className="User_card">
      <div className="card-header">
        <Grid item xs={2}>
          <div className="user-profile">
            <Avatar
              className="avatar"
              sx={{
                minWidth: 100,
                width: "100%",
                maxWidth: 100,
                height: 100,
                maxHeight: 100,
              }}
            >
              {name ? iniciais(name) : "H"}
            </Avatar>
            <p> {name}</p>
          </div>
        </Grid>

        <Grid item xs={10} className="user-details">
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <span><b>Endereço: </b> {address}</span>
            <span><b>Data do serviço: </b> {date}</span>
            <span><b>Horário do serviço: </b> {time}</span>
            <span><b>Valor: </b> <span className="value" >{decimals(value)}</span></span>
          </Stack>
        </Grid>
        </div>
        <div className="card-content" >
        <Grid item xs={12} className="details-column">
          <div className="details-column">
            <h5>
              <b>Detalhes:</b>
            </h5>
            <div className="details-box">
              <p>
                {details}
              </p>
            </div>
          </div>
        </Grid>
        </div>
      </div>
    </Grid>
  );
};
