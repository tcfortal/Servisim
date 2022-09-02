import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {useContext} from "react";
import { Profile } from "./pages/Client/Profile";
import { Header } from "./pages/Header/Header";
import { Home } from "./pages/Home/Home";
import {Login} from "./pages/Login/Login";
import {LoginServidor} from "./pages/Login/LoginServidor";
import {AnonymousSearch} from "./pages/Search/AnonymousSearch";
import { AuthProvider, AuthContext } from "./components/Context/auth";
import { AuthProviderContext, AuthProvider as AuthProvider2} from "./components/Context/authProvider";
import {HeaderCliente} from "./pages/Header/HeaderCliente";
import { ClienteSearch } from "./pages/Search/ClienteSearch";
import { CadastroCliente } from "./pages/SignUp/CadastroCliente";
import {CadastroProvedor } from "./pages/SignUp/CadastroProvedor";
import {HeaderProvedor} from "./pages/Header/HeaderProvider";
import { AnonymousServiceProvider } from "./pages/ServiceProvider/AnonymousServiceProvider";
import { ServiceProvider } from "./pages/ServiceProvider/ServiceProvider";
import {LoggedServiceProvider} from "./pages/ServiceProvider/LoggedServiceProvider";
import {HistoryServiceProvider} from "./pages/ServiceProvider/HistoryServiceProvider";
import {ConfirmedServices} from "./pages/ServiceProvider/ConfirmedServices";
import {PendingServices} from "./pages/ServiceProvider/PendingServices";
import {ClientUpdate} from "./pages/Client/ClientUpdate"
import {ProviderUpdate} from "./pages/ServiceProvider/ProviderUpdate"
import {OrdensCliente} from "./pages/Client/OrdensCliente"
import {Agendamento, } from "./pages/Agendamentos/Agendamento"

export function AppRoutes() {

  // arrow function que recebe um evento ou um filho e faz algo com ele
  
  const Private = ({ children  }) =>{
     const {authenticated, loading} = useContext(AuthContext);

     if(loading){
       return <div className="loading">loading...</div>
     }
     if(!authenticated){
       return <Navigate to="/login"/>
     }
     return children;
  }
  const PrivateProvider = ({ children  }) =>{
    const {authenticatedProvider, loadingProvider} = useContext(AuthProviderContext);

    if(loadingProvider){
      return <div className="loading">loading...</div>
    }
    if(!authenticatedProvider){
      return <Navigate to="/"/>
    }
    return children;
 }
 const Anonymous =({children})=>{
  const {authenticatedProvider, loadingProvider} = useContext(AuthProviderContext);
  const {authenticated, loading} = useContext(AuthContext);

  if(loadingProvider || loading){
    return <div className="loading">loading...</div>
  }
  if(authenticatedProvider){
    return <Navigate to="/provedor"/>
  }else if(authenticated){
    return <Navigate to="/cliente"/>
  }
  return children
 }


  return (
    <Router>
      <AuthProvider2>
      <AuthProvider>
      <Routes>
        {/*Rotas PRINCIPAIS*/}
        <Route path="/signUp" element={<CadastroCliente/>}></Route>
        <Route path="/providerSignUp" element={<CadastroProvedor/>}></Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/loginServidor" element={<LoginServidor/>}/>
        
        
        <Route path="/loginServidor2" element={<PrivateProvider><LoginServidor/></PrivateProvider>}/>


        {/* Rotas do USUÁRIO ANONIMO */}
        <Route path="/" element={<Anonymous><Header/></Anonymous>}>
          <Route index element={<Anonymous><Home/></Anonymous>} />
          <Route path="/:search" element={<Anonymous><AnonymousSearch/></Anonymous>}/>
          <Route path="/provedor/:provedor" element={<Anonymous><AnonymousServiceProvider/></Anonymous>}></Route>
          
        </Route>
        
        
        
          {/* Rotas do CLIENTE */}
          <Route path="/cliente" element={<Private><HeaderCliente/></Private>}>
            <Route index  element={<Private><Profile/></Private>}/>        
            <Route path="/cliente/:search" element={<Private><ClienteSearch/></Private>}/>
            <Route path="/cliente/provedor/:provedor" element={<Private><ServiceProvider/></Private>}></Route>
            <Route path="/cliente/provedor/:provedor/agendamento" element={<Private><Agendamento/></Private>}></Route>
            <Route path="/cliente/clientUpdate" element={<Private><ClientUpdate/></Private>}/>
            <Route path="/cliente/ordensCliente" element={<Private><OrdensCliente/></Private>}/>
          </Route>
          
          {/* Rotas do PROVEDOR */}
        <Route path="/provedor" element={<PrivateProvider><HeaderProvedor/></PrivateProvider>}>
            <Route index element={<PrivateProvider><LoggedServiceProvider/></PrivateProvider>}/>
            <Route path="/provedor/ProviderHistory" element={<PrivateProvider><HistoryServiceProvider/></PrivateProvider>}/>
            <Route path="/provedor/ConfirmedServices" element={<PrivateProvider><ConfirmedServices/></PrivateProvider>}/>
            <Route path="/provedor/PendingServices" element={<PrivateProvider><PendingServices/></PrivateProvider>}/>
            <Route path="/provedor/ProviderUpdate" element={<PrivateProvider><ProviderUpdate/></PrivateProvider>}/>
          </Route>
          
      </Routes>
      </AuthProvider>
      </AuthProvider2>
    </Router>
  );
}