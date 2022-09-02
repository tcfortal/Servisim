import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Modal, Box,} from "@mui/material";
import { GrNotification } from "react-icons/gr";
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';
import {AiOutlineSetting} from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs';
import { AuthProviderContext } from "./Context/authProvider"
import { AuthContext } from "./Context/auth"

export const ModalPerfilIconProvider = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '17%',
    left: '85%',

    transform: 'translate(-50%, -50%)',
    width: 250,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
   
    borderRadius:'20px',
    fontSize:'15px',
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
  };

  const {logout} = useContext(AuthProviderContext);
  const handleLogout = () =>{
      logout();
  };

  return (
    //trocar button por icon
    <div>

     <CgProfile size={30} className="mainMenu-item" onClick={handleOpen} />


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ul>
            <button className="modal-btn">

              <Link to=""><BsPerson  size={25}/> Meu perfil</Link>
            </button>

            <button className="modal-btn">

              <Link to=""><AiOutlineSetting  size={25}/> Preferencias</Link>
            </button>
            <button className="modal-btn" onClick={handleLogout}>

               <BiLogOut size={25}/> Sair
            </button>
          </ul>

        </Box>
      </Modal>
    </div>
  );
};

export const ModalPerfilIconClient = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '17%',
    left: '85%',

    transform: 'translate(-50%, -50%)',
    width: 250,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
   
    borderRadius:'20px',
    fontSize:'15px',
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
  };

  const {logout} = useContext(AuthContext);
  const handleLogout = () =>{
      logout();
  };

  return (
    //trocar button por icon
    <div>

     <CgProfile size={30} className="mainMenu-item" onClick={handleOpen} />


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ul>
            <button className="modal-btn">

              <Link to=""><BsPerson  size={25}/> Meu perfil</Link>
            </button>

            <button className="modal-btn">

              <Link to=""><AiOutlineSetting  size={25}/> Preferencias</Link>
            </button>
            <button className="modal-btn" onClick={handleLogout}>

               <BiLogOut size={25}/> Sair
            </button>
          </ul>

        </Box>
      </Modal>
    </div>
  );
};

export const ModalNotificationIcon = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '12%', //
    left: '78%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 150,
    bgcolor: 'background.paper',
    fontSize:'14px',
    borderRadius:'20px',
    border: '2px solid #000',
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pt: 1,
    pr: 1,



  };


  return (
    //trocar button por Icon
    <div>
      <GrNotification size={30} className="mainMenu-item" onClick={handleOpen} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ul>
          <  GrNotification size={25} /> Notificações
           <li>
           <button className="modal-btn" >
        <Link to="" >Serviços Aguardando confirmação</Link>
            </button>
             </li>
     
      <li>
      <button className="modal-btn">
              <Link to="">Você recebeu n avaliações</Link>
            </button>
      </li>

           

          </ul>


        </Box>
      </Modal>
    </div>
  );
};

export const ModalCadastro = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 4,
  };

  return (
    <div>
      <button className="mainMenu-item" onClick={handleOpen}>Criar conta</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className="modal-btn">
            <Link to="/ProviderSignUp">Cadastro Provedor</Link>
          </button>

          <button className="modal-btn">
            <Link to="/SignUp">Cadastro Cliente</Link>
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export const ModalLogin = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 4,
  };

  return (
    <div>
      <button className="mainMenu-item" onClick={handleOpen}>Entrar</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className="modal-btn">
            <Link to="/loginServidor">Logar como Provedor</Link>
          </button>

          <button className="modal-btn">
            <Link to="/login">Logar como Cliente</Link>
          </button>
        </Box>
      </Modal>
    </div>
  );
};
