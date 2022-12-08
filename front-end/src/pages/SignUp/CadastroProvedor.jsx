import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
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

export const CadastroProvedor = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [genero, setGenero] = useState("");
  const [data_nascimento, setData_nascimento] = useState("");
  const [cep, setCEP] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [services, setServices] = useState([]);
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
      descricao,
      services,
    };
    axios
      .post("https://servisim-api2.herokuapp.com/services-provider", dados)
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "Pintor",
    "Pedreiro",
    "Carpinteiro",
    "Bombeiro Hidráulcio",
    "Manicure e Pedicure",
    "Cabeleireiro",
    "Técnico de informática",
  ];

  function getStyles(name, services, theme) {
    return {
      fontWeight:
        services.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setServices(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
              <span className="servisim-logo-servi">Cadastro Provedor</span>
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
                onChange={(e) => setNome(e.target.value)}
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
                onChange={(e) => setSenha(e.target.value)}
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
                  required
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
                    required
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
              component="form"
              sx={{
                "& > :not(style)": { m: 3, width: "50ch" },
              }}
            >
              <FormControl sx={{ m: 2.5, width: 280 }}>
                <InputLabel sx={{ m: -1 }} id="demo-multiple-chip-label">
                  Serviços
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={services}
                  onChange={handleChange}
                  required
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, services, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                id="standard-multiline-static"
                label="Descrição do seu serviço:"
                multiline
                rows={4}
                variant="standard"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
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
