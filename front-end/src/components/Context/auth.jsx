import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../services/api";
import axios from "axios";
const db = `https://servisim-api2.herokuapp.com/usuario/login`;
const lot = `https://servisim-api2.herokuapp.com/usuario/logout`;
import { Snackbar, Alert } from '@mui/material/';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user1, setUser1] = useState(null);
  const [alertContent, setAlertContent] = useState('');
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(true);
  const [token, setToken] = useState(null);
  const navegate = useNavigate();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("cUser");
    const recoveredToken = localStorage.getItem("token");
    if (recoveredUser) {
      setUser1(JSON.parse(recoveredUser))
      setToken(JSON.parse(recoveredToken))
    }
    setLoading(false);
  }, [])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const login = async (email, password) => {
    const response = await createSession(email, password);
    const loggedUser = {
      nome: response.data.nome,
      email: response.data.email,
      id: response.data.id,
    }

    axios.post(db, {
      email: email,
      senha: password
    })
      .then((response) => {
        setOpen(false);
        setAlert(false);

        if (loggedUser) {
          localStorage.setItem("cUser", JSON.stringify(loggedUser));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("refresh_token", JSON.stringify(response.data.refreshToken));
          setUser1(loggedUser);
          setToken(response.data.token)
          navegate("cliente");
        }
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

  /*
  const logout = async () => {

    axios.post("https://servisim-api.herokuapp.com/usuario/logout", token, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {

        console.log("Logout");
        localStorage.removeItem("cUser");
        localStorage.removeItem("pUser");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        setUser1(null);
        setToken(null);

        navegate("/")
      })

  }
  */

  const logout = () => {
    console.log("Logout");
    localStorage.removeItem("cUser");
    localStorage.removeItem("pUser");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setUser1(null);

    navegate("/")
  }

  return (
    <AuthContext.Provider value={{ authenticated: !!user1, user1, loading, login, logout }}>
      <div>
        {alert ? (<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}><Alert severity='error'>{alertContent}</Alert></Snackbar>) : <></>}
      </div>
      {children}
    </AuthContext.Provider>)
}