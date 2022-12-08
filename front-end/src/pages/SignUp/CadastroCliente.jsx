import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { ptBR } from "date-fns/locale";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Snackbar, Alert } from "@mui/material/";

export const CadastroCliente = () => {
  const navigate = useNavigate();

  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [genero, setGenero] = useState("");
  const [data_nascimento, setData_nascimento] = useState("");
  const [cep, setCEP] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [endereco, setEndereco] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(true);
  const [alertContent, setAlertContent] = useState("");
  const [alert, setAlert] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    let dados = {
      nome,
      email,
      senha,
      telefone,
      genero,
      data_nascimento,
      cidade,
      estado,
      endereco,
    };

    axios
      .post("https://servisim-api2.herokuapp.com/usuario", dados)
      .then(() => {
        setOpen(false);
        setAlert(false);
        navigate("/");
      })
      .catch(function (error) {
        if (error.response) {
          setAlertContent(error.response.data.erro);
          setOpen(true);
          setAlert(true);
        }
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setEndereco(`${data.logradouro}, ${data.bairro}`);
        setCidade(data.localidade);
        setEstado(data.uf);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random/?job)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid
        className="form"
        item
        xs={12}
        sm={8}
        md={8}
        component={Paper}
        elevation={6}
        align="center"
        square
      >
        <div>
          {alert ? (
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
              <Alert severity="error">{alertContent}</Alert>
            </Snackbar>
          ) : (
            <></>
          )}
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <Typography
              className="servisim-logo"
              align="center"
              paddingBottom="1ch"
            >
              <span className="servisim-logo-servi">Servi</span>
              <span className="servisim-logo-sim">SIM</span>
            </Typography>

            <Typography variant="h4" align="center">
              <span className="servisim-logo-servi">Cadastro</span>
            </Typography>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
            >
              <TextField
                id="standard-basic"
                label="Nome Completo"
                variant="standard"
                value={nome}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>

            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
            >
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="current-password"
            >
              <TextField
                id="standard-password-input"
                label="Senha"
                type="password"
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
                variant="standard"
                required
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Telefone"
                type="number"
                variant="standard"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
              />
            </Box>

            <Box
              sx={{
                "& > :not(style)": { m: 3, width: "50ch" },
              }}
            >
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ width: 10 }}
                >
                  Sexo:
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <FormControlLabel
                    value="feminino"
                    control={<Radio />}
                    label="Feminino"
                  />
                  <FormControlLabel
                    value="masculino"
                    control={<Radio />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    value="outro"
                    control={<Radio />}
                    label="Outro"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Data de Nascimento"
                    views={["day", "month", "year"]}
                    value={data_nascimento}
                    onChange={(newValue) => {
                      setData_nascimento(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                type="number"
                label="CEP"
                variant="standard"
                value={cep}
                onChange={(e) => setCEP(e.target.value)}
                placeholder="00000000"
                onBlur={checkCEP}
                required
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Estado"
                variant="standard"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Cidade"
                variant="standard"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Endereço"
                variant="standard"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </Box>

            <Box
              sx={{
                "& > :not(style)": { m: 2, width: "20ch" },
              }}
            >
              <Button type="submit" variant="contained">
                {" "}
                Cadastrar{" "}
              </Button>
            </Box>
          </fieldset>
        </form>
      </Grid>
    </Grid>
  );
};
