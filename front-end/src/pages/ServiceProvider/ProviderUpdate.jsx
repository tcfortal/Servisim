import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createServidorSession } from "../../services/api";

export const ProviderUpdate = () => {


    const navigate = useNavigate();

    const [email, setEmail] = useState(JSON.parse(localStorage.getItem("pUser")).email);
    const [id, setId] = useState(JSON.parse(localStorage.getItem("pUser")).id);
    const [token] = useState(JSON.parse(localStorage.getItem("token")));
    const [refresh_token] = useState(JSON.parse(localStorage.getItem("refresh_token")));
    const [nome, setName] = useState('');
    const [telefone, setTelefone] = useState('');
    const [genero, setGenero] = useState('');
    const [cep, setCEP] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState('');
    const [image, setImage] = useState('');

    const [open, setOpen] = useState(true);
    const [alertContent, setAlertContent] = useState("");
    const [alert, setAlert] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();
        let dados = {
            id,
            nome,
            telefone,
            genero,
            cidade,
            estado,
            endereco
        }

        ///const token = JSON.parse(sessionStorage.getItem('token'));

        axios.put(`https://servisim-api2.herokuapp.com/services-update/${id}`, dados, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setOpen(false);
                setAlert(false);
                navigate("/provedor");
            })
            .catch(function (error) {
                if (error.response) {
                    setAlertContent(JSON.stringify(error.response.data));
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

    useEffect(async () => {
        const response = await createServidorSession(email);

        setName(response.data.nome);
        setTelefone(response.data.telefone);
        setGenero(response.data.genero);
        setCidade(response.data.cidade);
        setEndereco(response.data.endereco);
        setEstado(response.data.estado);

    }, []);

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            setEndereco(`${data.logradouro}, ${data.bairro}`);
            setCidade(data.localidade);
            setEstado(data.uf);
        });
    }

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>

            <Grid
                item
                xs={false}
                sm={4}
                md={4}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random/?job)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <Grid className="form" item xs={12} sm={8} md={8} component={Paper} elevation={6} align="center" square>

                <form onSubmit={(e) => handleSubmit(e)}>

                    <fieldset>

                        <Typography className="servisim-logo" align="center" paddingBottom="1ch">
                            <span className="servisim-logo-servi">Servi</span>
                            <span className="servisim-logo-sim">SIM</span>

                        </Typography>

                        <Typography variant="h4" align="center">
                            <span className="servisim-logo-servi">Editar Perfil</span>
                        </Typography>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                            noValidate
                        >
                            <TextField id="standard-basic" label="Nome Completo" variant="standard" value={nome} onChange={(e) => setName(e.target.value)} required />
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Telefone" type="number" variant="standard" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" required />
                        </Box>

                        <Box
                            sx={{
                                '& > :not(style)': { m: 3, width: '50ch' },
                            }}
                        >
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ width: 10 }}>Sexo:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                >
                                    <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
                                    <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                                    <FormControlLabel value="outro" control={<Radio />} label="Outro" />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" type="number" label="CEP" variant="standard" value={cep} onChange={(e) => setCEP(e.target.value)} placeholder="00000000" onBlur={checkCEP} required />
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Estado" variant="standard" value={estado} onChange={(e) => setEstado(e.target.value)} required />
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Cidade" variant="standard" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Endereço" variant="standard" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                        </Box>

                        <Box
                            sx={{
                                '& > :not(style)': { m: 2, width: '20ch' },
                            }}
                        >
                            <Button type="submit" variant="contained"> Editar </Button>
                        </Box>
                    </fieldset>
                </form>
            </Grid>
        </Grid>

    )
}

