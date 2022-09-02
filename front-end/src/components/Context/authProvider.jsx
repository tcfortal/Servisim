import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createServidorSession } from "../../services/api";
import axios from "axios";
const db = `https://servisim-api.herokuapp.com/services-provider/login`;
import { Snackbar, Alert } from '@mui/material/';

export const AuthProviderContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loadingProvider, setLoadingProvider] = useState(true)
  const [user2, setUser2] = useState(null);
  const [alertContent, setAlertContent] = useState('');
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(true);
  const [token, setToken] = useState(null);
  const navegate = useNavigate();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("cUser");
    const recoveredToken = localStorage.getItem("token");
    if (recoveredUser) {
      setUser2(JSON.parse(recoveredUser))
      setToken(JSON.parse(recoveredToken))
    }
    setLoadingProvider(false);
  }, [])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const login = async (email, password) => {
    const response = await createServidorSession(email, password);
    const loggedUser = {
      nome: response.data.nome,
      email: response.data.email,
      id: response.data.id
    }
    //const token = response.data.token

    axios.post(db, {
      email: email,
      senha: password,
    }).then((response) => {

      setOpen(false);
      setAlert(false);

      localStorage.setItem("pUser", JSON.stringify(loggedUser));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("refresh_token", JSON.stringify(response.data.refreshToken));
      setUser2(loggedUser);
      setToken(response.data.token)
      navegate("/provedor");
    }).catch(
      function (error) {
        if (error.response) {
          setAlertContent(error.response.data.erro)
          setOpen(true);
          setAlert(true);

        }
      }
    )

  }

  const logout = async () => {
    console.log("Logout");
    localStorage.removeItem("cUser");
    localStorage.removeItem("pUser");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    await setToken(null);
    await setUser2(null);
    navegate("provedor")
  }

  return (
    <AuthProviderContext.Provider value={{ authenticatedProvider: !!user2, user2, loadingProvider, login, logout }}>
      <div>
        {alert ? (<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}><Alert severity='error'>{alertContent}</Alert></Snackbar>) : <></>}
      </div>
      {children}
    </AuthProviderContext.Provider>)
}