import "./ServicesConfirm.css";
import { Grid, Button, Avatar, Stack, Box, Modal } from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteServices2, updateServices } from "../../services/api";
import axios from "axios";


interface props {
  id: string;
  id_provedor: string;
  id_cliente: string;
  status: string;
  name: string;
  date: string;
  data_postagem: string;
  data_servico: string;
  time: string;
  value?: number;
  valor_pago: number | null;
  address: string;
  details: string;
}

export const ProviderPendencies: React.FC<props> = ({
  id,
  id_provedor,
  id_cliente,
  status,
  name,
  date,
  data_postagem,
  data_servico,
  time,
  value,
  valor_pago,
  address,
  details,

}) => {
  const [confirmado, setConfirmado] = useState<boolean>(false);
  const [negado, setNegado] = useState<boolean>(false);
  const [token] = useState<string>(JSON.parse(localStorage.getItem("token") as string));

  const ModalConfirmation = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const style = {
      Box: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        p: 4,
      },
      title: {
        color: "#2e7d32",
        fontWeight: 700,
      },
      titleDecline: {
        color: "#d32f2f",
        fontWeight: 700,
      },
      button: {},
      innerBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 4,
      },
    };

    const handleConfirmation = async () => {
      console.log(id, " confirmado");
      let data = {
        _id: id,
        id_provedor: id_provedor,
        id_cliente: id_cliente,
        status: "confirmado",
        data_servico: data_servico,
        data_postagem: data_postagem,
        descricao: details,
        valor: value,
        valor_pago: valor_pago,
        nome_cliente: name,
        endereco_cliente: address,
        __v: 0,
      };
      //updateServices(id,{ status: "confirmado" } )
      axios
        .put(`https://servisim-api2.herokuapp.com/service-update/${id}`, data)
        .then((response) => console.log(response));
      handleClose();
      setConfirmado(true)
    };






    return (
      <>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          startIcon={<CheckIcon />}
        >
          Confirmar
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.Box}>
            <h3 style={style.title}>Confirmar Serviço ?</h3>
            <Box sx={style.innerBox}>
              <button className="modal-btn" onClick={handleConfirmation}>
                SIM
              </button>

              <button className="modal-btn" onClick={handleClose}>
                NÃO
              </button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  };
  const ModalDecline = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
      Box: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        p: 4,
      },

      title: {
        color: "#d32f2f",
        fontWeight: 700,
      },
      button: {},
      innerBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 4,
      },
    };

    const handleNegate = async () => {
      handleClose();
      deleteServices2(id, token);
      setNegado(true)
    }

    return (
      <>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpen}
          startIcon={<ClearIcon />}
        >
          Recusar
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.Box}>
            <h3 style={style.title}>Recusar Serviço ?</h3>
            <Box sx={style.innerBox}>
              <Button color="error" variant="contained" className="modal-btn" onClick={handleNegate}>SIM</Button>

              <Button variant="outlined" className="modal-btn" onClick={handleClose}>
                NÃO
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  };

  function iniciais(string: string) {
    let iniciais = "";
    let nomeArray = string.split(" ", 2);
    nomeArray.forEach((e) => {
      return (iniciais += e.substring(0, 1).toLocaleUpperCase());
    });
    return iniciais;
  }

  function decimals(int: number) {
    return int.toFixed(2);
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
              <span>
                <b>Endereço: </b> {address}
              </span>
              <span>
                <b>Data do serviço: </b> {date}
              </span>
              <span>
                <b>Horário do serviço: </b> {time}
              </span>
            </Stack>
          </Grid>
          <div className="check-box-area">
            {!confirmado && !negado ? (
              <Stack direction="column" spacing={2}>
                <ModalConfirmation />
                <ModalDecline />
              </Stack>
            ) : null}
            {confirmado ? (
              <>
                <h3
                  style={{
                    borderWidth: "5px",
                    borderStyle: "solid",
                    borderRadius: "10px",
                    borderColor: "#2e7d32",
                    color: "#2e7d32",
                  }}
                >
                  Confirmado
                </h3>
              </>
            ) : null}
            {negado ? (
              <>
                <h3
                  style={{
                    borderWidth: "5px",
                    borderStyle: "solid",
                    borderRadius: "10px",
                    borderColor: "#d32f2f",
                    color: "#d32f2f",
                  }}
                >
                  Negado
                </h3>
              </>
            ) : null}
          </div>
        </div>

        <div className="card-content">
          <Grid item xs={12} className="details-column">
            <div className="details-column">
              <h5>
                <b>Detalhes:</b>
              </h5>
              <div className="details-box">
                <p>{details}</p>
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </Grid>
  );
};
