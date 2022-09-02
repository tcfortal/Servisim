import "./ServicesConfirm.css";
import { Grid, Typography,Avatar,Stack } from "@mui/material";
import { useState } from "react";

interface props {
  id: string;
  name: string;
  date: string;
  time: string;
  value?: number;
  address: string;
  details: string;
}
export const ProviderConfirmations: React.FC<props> = ({
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
                margin: 3,
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
 /* = ({ Confirmations }) => {
  const [checked, setChecked] = useState();

  return (
    <div>
      <div className="User_card">
        <div className="User__profile">
          <img
            className="User__img"
            src={Confirmations[0].imgUrl}
            alt="imagen do usuário"
          />
          <p className="User__name"> {Confirmations[0].nome} </p>
        </div>

        <div className="User__details">
          <ul>
            <Typography variant="h5" component="h3">
              Descrição
            </Typography>
            ;<li>Endereço: {Confirmations[0].descricao[0].endereco}</li>
            <li>Data: {Confirmations[0].descricao[0].data}</li>
            <li>Horário: {Confirmations[0].descricao[0].horario}</li>
            <li>Obs: {Confirmations[0].descricao[0].obs}</li>
          </ul>
        </div>
        <div className="Card__Check">
          <input
            type="checkbox"
            name="Check_btn"
            className="Check_btn"
            checked
            readOnly
          />
        </div>
      </div>

      <div className="User_card">
        <div className="User__profile">
          <img
            className="User__img"
            src={Confirmations[1].imgUrl}
            alt="imagen do usuário"
          />
          <p className="User__name"> {Confirmations[1].nome} </p>
        </div>

        <div className="User__details">
          <ul>
            <Typography variant="h5" component="h3">
              Descrição
            </Typography>
            ;<li>Endereço: {Confirmations[1].descricao[0].endereco}</li>
            <li>Data: {Confirmations[1].descricao[0].data}</li>
            <li>Horário: {Confirmations[1].descricao[0].horario}</li>
            <li>Obs: {Confirmations[1].descricao[0].obs}</li>
          </ul>
        </div>
        <div className="Card__Check">
          <input
            type="checkbox"
            name="Check_btn"
            className="Check_btn"
            checked
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
*/