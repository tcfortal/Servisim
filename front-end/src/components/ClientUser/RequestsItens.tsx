import { Grid, Button, Avatar, Stack, Box, Modal, Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Ellipse from "../../assests/Ellipse.png"
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteServices, updateServices,addComments } from "../../services/api";
import axios from "axios";
import {parseISO, differenceInHours,differenceInDays,differenceInMinutes  } from "date-fns";

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
  setLoadding: React.Dispatch<React.SetStateAction<boolean>>
}

export const RequestItens: React.FC<props> = ({
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
  setLoadding
}) => {
  const [avaliar, setAvaliar] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);
  const [cancelavel, setCancelavel] = useState(false)
  const [encerrar, setEncerrar] = useState(false)
  const [token] = useState<string>(JSON.parse(localStorage.getItem("token")));
  //user differenceInDays && differenceInHours && differenceInMinutes  para calcular a possibilidade de alertar a diferença em horas. 
  const dataAtual = new Date()
    let posPostagem =differenceInHours( dataAtual, parseISO(data_postagem))
    let preServico = differenceInDays(dataAtual, parseISO(data_servico))
    let atraso = differenceInMinutes(dataAtual,parseISO(data_servico))


    useEffect(()=>{
      setLoadding(true)
      UpdateCancelavel()
    },[cancelavel,avaliar,cancelar,encerrar])

    function UpdateCancelavel() {
      if(atraso >= 30 || posPostagem <= 2 || preServico <=-2){
        return setCancelavel(true)
      }else{
        return setCancelar(false)
      }
    }
    

  //console.log("dataAtual:",dataAtual);
  
  //console.log(posPostagem ); // se for -2 horas pode cancelar
  //console.log(atraso ); // se for 30 min pode cancelar
  //console.log(preServico) // se for -2 dias pode cancelar;
   
   
  const ModalAvaliation = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [star, setStar] = useState<number | null>(0);
    const [comment, setComment] = useState<string>("")
    const style = {
      Box: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: 500,
        maxWidth: "80%",
        maxHeight: "90%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
    const handleAvaliation = async () => {
      //console.log(id, " confirmado");
      let commentData={
        id_provedor: id_provedor,
        comentario: comment.trim(),
        estrelas: star
      }
      let data = {
        _id: id,
        id_provedor: id_provedor,
        id_cliente: id_cliente,
        status: "finalizado",
        data_servico: data_servico,
        data_postagem: data_postagem,
        descricao: details,
        valor: value,
        valor_pago: valor_pago,
        nome_cliente: name,
        endereco_cliente: address,
        __v: 0,
      };

      addComments(commentData, token)
      updateServices(id, data)
      handleClose();
      setAvaliar(true);
    };

    return (
      <>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          startIcon={<CheckIcon />}
        >
          Avaliar
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.Box}>
            <Button variant="contained" style={{alignSelf:"flex-end"}} color="error" className="modal-btn" onClick={handleClose}>
            <ClearIcon/>
            </Button>
            <Stack direction="column" style={{justifyContent:"center", alignItems:"center", width:"100%"}} spacing={2}>
              <h3 style={style.title}>Avaliação</h3>
              {id_provedor == "62a0d5c374005acb5fc701c4"?(
                <Avatar
                  className="avatar"
                  sx={{
                    margin: 3,
                    minWidth: 200,
                    width: "100%",
                    maxWidth: "30%",
                    minHeight: 200,
                    maxHeight: "30%",
                  }}
                  src={Ellipse}
                > 
                </Avatar>):(
                <Avatar
                  className="avatar"
                  sx={{
                    margin: 3,
                    minWidth: 200,
                    width: "100%",
                    maxWidth: "30%",
                    minHeight: 200,
                    maxHeight: "30%",
                  }}
                >
                  {name ? iniciais(name) : "H"}
                  
                </Avatar>)}
              <h3>{name}</h3>
              <Rating
                  className="stars"
                  name="rating"
                  value={star}
                  onChange={(event, newValue) => {
                  setStar(newValue);
                  }}
                  precision={1}
                  size="large"
                  sx={{
                    fontSize: "3rem",
                  }}
                />
                
                <TextField
                  id="required"
                  label="Deixe um comentário"
                  value={comment}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={6}
                  onChange={(e)=>setComment(e.target.value)}
                  inputProps={{ maxLength: 300 }}
/>
            </Stack>
            

            <Box sx={style.innerBox}>
              {star && comment.trim() !="" ?(
              <Button variant="contained" color="success" onClick={handleAvaliation}>
                {"Avaliar"}
              </Button>
              ):(
              <Button variant="contained" color="success" disabled onClick={handleAvaliation}>
              {"Avaliar"}
              </Button>)}
              

              
            </Box>
          </Box>
        </Modal>
      </>
    );
  };
  //Modal de Cancelamento
  const ModalCancel = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const style = {
      Box: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: 500,
        maxWidth: "80%",
        maxHeight: "90%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      },
      text: {
        color: "#111",
        fontWeight: 400,
      },
      titleDecline: {
        marginTop: "1rem",
        marginBottom: "2em",
        color: "#d32f2f",
        fontWeight: 700,
      },
      
      innerBox: {
        marginTop: "1rem",
        width:"100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        p: 4,
      },
    };
    

    const handleCancel = async () => {
      deleteServices(id, token);
      handleClose();
      setCancelar(true);
    };

    return (
      <>
      <Button
          variant="contained"
          color="error"
          onClick={handleOpen}
          startIcon={<ClearIcon />}
        >
          Cancelar
      </Button>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.Box}>
            <h3 style={style.titleDecline}>Cancelar Serviço ?</h3>
            <h5 style={style.text}>Cancelamentos podem ser efetuados:</h5>
            <span style={style.text}>Em até <b>48 horas</b> antes da data do serviço.</span>
            <span style={style.text}> Com<b> 2 horas </b> depois de seu levantamento do pedido.</span>
            <span style={style.text}> Com <b>30 minutos</b> de atraso do horário do serviço.</span>
            <Box sx={style.innerBox}>
              {cancelavel?(
                <Button color="error" variant="contained" className="modal-btn" onClick={handleCancel}>SIM</Button>
              ):(
                <Button color="error" variant="contained" className="modal-btn" disabled onClick={handleCancel}>SIM</Button>
              )}
              

              <Button  variant="outlined" className="modal-btn" onClick={handleClose}>
                NÃO
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  };

  const ModalEncerrar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const style = {
      Box: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: 500,
        maxWidth: "80%",
        maxHeight: "90%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      },
      text: {
        color: "#111",
        fontWeight: 400,
      },
      titleDecline: {
        marginTop: "1rem",
        marginBottom: "2em",
        color: "#111",
        fontWeight: 700,
      },
      
      innerBox: {
        marginTop: "1rem",
        width:"100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        p: 4,
      },
    };
    

    const handleFinalizar = async () => {
      let data = {
        _id: id,
        id_provedor: id_provedor,
        id_cliente: id_cliente,
        status: "concluido",
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
      updateServices(id,data)
      handleClose();
      setEncerrar(true);
    };

    return (
      <>
      { atraso > 0 ?(
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          startIcon={<CheckIcon />}
        >
          Finalizar Serviço
        </Button>
        ):(
          <Button
          disabled
          variant="contained"
          color="success"
          onClick={handleOpen}
          startIcon={<CheckIcon />}
        >
          Finalizar Serviço
        </Button>
        )}
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.Box}>
            <h3 style={style.titleDecline}>Finalizar Serviço ?</h3>
            <Box sx={style.innerBox}>
              
                <Button color="success" variant="contained" className="modal-btn" onClick={handleFinalizar}>SIM</Button>

              <Button  variant="outlined"  className="modal-btn" onClick={handleClose}>
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
              {id_provedor == "62a0d5c374005acb5fc701c4"?(
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
                  src={Ellipse}
                > 
                </Avatar>):(
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
                  
                </Avatar>)}
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
          
            <Stack direction="column" spacing={2}>
            {/*<span className="status-indicator-field" >{status}</span>*/}
              {status == "concluido" ? (
                  <ModalAvaliation />
                
              ) : null}
              {status == "confirmado"  ? (
                <>
                  <ModalEncerrar />
                </>
              ) : null}
              {status == "pendente" || status == "confirmado" ? (
                <>
                  
                  <ModalCancel />
                </>
              ) : null}
              </Stack>
          
            
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
