import {
  Avatar,
  Box,
  Divider,
  Rating,
  Typography,
  Stack,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import React from "react";
import "./agendamento.css";
import { getID, createSession } from "../../services/api";
import { formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Snackbar, Alert } from "@mui/material/";

export const Agendamento = () => {
  const { provedor } = useParams();
  const navigate = useNavigate();
  const [endereco, setEndereco] = useState("");
  const [mainAdress, setMainAdress] = useState("Sim");
  const [tipoPagamento, setTipoPagamento] = useState("Sim");
  const [endereco_cliente, setEndereco_cliente] = useState("");
  const [data_servico, setData_servico] = useState("");
  const [id_provedor, setId_provedor] = useState(provedor);
  const [id_cliente, setId_cliente] = useState(
    JSON.parse(localStorage.getItem("cUser")).id
  );
  const [status, setStatus] = useState("pendente");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(150);
  const [valor_pago, setValor_pago] = useState(150);
  const [nome_cliente, setNome_cliente] = useState(
    JSON.parse(localStorage.getItem("cUser")).nome
  );
  const [nome_provedor, setNome_provedor] = useState("");
  const [clientData, setClientData] = useState();
  const [open, setOpen] = useState(true);
  const [alertContent, setAlertContent] = useState("");
  const [alert, setAlert] = useState(false);
  const [open2, setOpen2] = useState(true);
  const [success, setSuccess] = useState(false);
  const [successContent, setSuccessContent] = useState(false);
  const [submited, setSubmited] = useState(false);

  useEffect(async () => {
    const response = await getID(provedor);
    const response2 = await createSession(
      JSON.parse(localStorage.getItem("cUser")).email
    );
    setNome_provedor(response.data.nome);
    setClientData(response2.data);
    setEndereco(
      `${response2.data.endereco}, ${response2.data.cidade} - ${response2.data.estado}`
    );
    setEndereco_cliente(
      `${response2.data.endereco}, ${response2.data.cidade} - ${response2.data.estado}`
    );
  }, [provedor, id_cliente]);

  const handleMainAdressChange = (e) => {
    let valor = e.target.value;
    valor === "Sim" ? setEndereco_cliente(endereco) : setEndereco_cliente("");
    setMainAdress(valor);
  };
  const handleTipoPagamentoChange = (e) => {
    let valor = e.target.value;
    valor === "Sim"
      ? (setValor(150), setValor_pago(150))
      : (setValor(0), setValor_pago(0));
    setTipoPagamento(valor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dados = {
      nome_provedor,
      endereco_cliente,
      data_servico,
      id_provedor,
      id_cliente,
      status,
      descricao,
      valor,
      valor_pago,
      nome_cliente,
    };
    console.log(dados);
    if (data_servico) {
      axios
        .post("https://servisim-api2.herokuapp.com/service", dados)
        .then(() => {
          //adicionar um alert
          setOpen(false);
          setAlert(false);
          setOpen2(true);
          setSuccess(true);
          setSuccessContent("Agendamento realizado com sucesso");
          setSubmited(true);
          //navigate("/cliente")
        })
        .catch(function (error) {
          if (error.response) {
            setAlertContent(JSON.stringify(error.response.data));
            setOpen(true);
            setAlert(true);
            setOpen2(false);
            setSuccess(false);
          }
        });
    } else {
      setAlertContent("Data do serviço inválido");
      setOpen(true);
      setAlert(true);
      setOpen2(false);
      setSuccess(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return navigate("/cliente");
    }
    setOpen(false);
    navigate("/cliente");
  };

  return (
    <Box className="container-agendamento" style={{ width: "100%" }}>
      <div>
        {alert ? (
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert severity="error">{alertContent}</Alert>
          </Snackbar>
        ) : (
          <></>
        )}
        {success ? (
          <Snackbar open={open2} autoHideDuration={1500} onClose={handleClose2}>
            <Alert severity="success">{successContent}</Alert>
          </Snackbar>
        ) : (
          <></>
        )}
      </div>
      <form className="div-principal" onSubmit={(e) => handleSubmit(e)}>
        <h2 style={{ marginTop: "1rem" }}> Proposta de agendamento</h2>
        <Grid
          container
          spacing={2}
          className=""
          sx={{ width: "100%", height: "100%", padding: 0, margin: 0 }}
        >
          <Grid item xs={12}>
            <span>
              Prezado {nome_cliente} confirme os dados para agendamento
            </span>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Serviço é no endereço: <b>{endereco}</b>?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={mainAdress}
                onChange={handleMainAdressChange}
              >
                <FormControlLabel
                  value={"Sim"}
                  control={<Radio />}
                  label="Sim"
                />
                <FormControlLabel
                  value={"Não"}
                  control={<Radio />}
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
            <Grid item xs={12}>
              {mainAdress == "Sim" ? (
                <TextField
                  id="outlined-multiline-flexible"
                  label="Endereço"
                  disabled
                  style={{
                    width: "90%",
                    marginLeft: "2rem",
                    marginBottom: "2rem",
                    marginTop: "1rem",
                  }}
                  value={endereco_cliente}
                  variant="outlined"
                  onChange={(e) => {
                    setEndereco_cliente(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  id="outlined-multiline-flexible"
                  label="Endereço"
                  style={{
                    width: "90%",
                    marginLeft: "2rem",
                    marginBottom: "2rem",
                    marginTop: "1rem",
                  }}
                  value={endereco_cliente}
                  variant="outlined"
                  onChange={(e) => {
                    setEndereco_cliente(e.target.value);
                  }}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Qual o valor do Serviço?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={tipoPagamento}
                onChange={handleTipoPagamentoChange}
              >
                <FormControlLabel
                  value={"Sim"}
                  control={<Radio />}
                  label="Valor de uma Diária (150,00 R$)"
                />
                <FormControlLabel
                  value={"Não"}
                  control={<Radio />}
                  label="Outro valor"
                />
              </RadioGroup>
            </FormControl>
            <Grid item xs={12}>
              {tipoPagamento == "Sim" ? (
                <TextField
                  id="outlined-multiline-flexible"
                  label="Valor"
                  disabled
                  style={{
                    marginLeft: "2rem",
                    marginBottom: "2rem",
                    marginTop: "1rem",
                  }}
                  value={valor}
                  variant="outlined"
                  type={"number"}
                  onChange={(e) => {
                    setValor(e.target.value);
                    setValor_pago(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  id="outlined-multiline-flexible"
                  label="Valor"
                  style={{
                    marginLeft: "2rem",
                    marginBottom: "2rem",
                    marginTop: "1rem",
                  }}
                  value={valor}
                  variant="outlined"
                  type={"number"}
                  onChange={(e) => {
                    setValor(e.target.value);
                    setValor_pago(e.target.value);
                  }}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <span>Data do Serviço</span>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
              <Stack spacing={3}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={data_servico}
                  onChange={(e) => {
                    setData_servico(e);
                  }}
                  renderInput={(params) => (
                    <TextField
                      style={{
                        width: "90%",
                        marginLeft: "2rem",
                        marginBottom: "2rem",
                        marginTop: "1rem",
                      }}
                      {...params}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <p className="title4">
              Observações sobre o serviço a ser executado
            </p>
            <TextField
              id="descricao"
              name="descricao"
              label="Deixe uma descrição"
              value={descricao}
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
              onChange={(e) => setDescricao(e.target.value)}
              inputProps={{ maxLength: 300 }}
            />
          </Grid>
          <Grid item xs={12}>
            {!submited ? (
              <button type="submit" className="provider-submit-btn1">
                Agendar
              </button>
            ) : (
              <button disabled type="submit" className="provider-submit-btn1">
                Agendar
              </button>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
