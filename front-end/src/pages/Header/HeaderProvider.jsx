import { useState,useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { NavegationBarProvider } from "../../components/ProviderUser/ProviderNavegationBar";
import {ProviderHeaderIcons} from "../../components/HeaderIcons"
import logo from "../../assests/logo.png"

import { Search } from "../../components/SearchForm/Search";
export function HeaderProvedor() {
    /*
    const [id, setId] = useState(JSON.parse(localStorage.getItem("user")).id);
    const [nome, setNome] = useState("Nome");
    const [email, setEmail] = useState("Sobrenome");
    const [dataNascimento, setDataNascimento] = useState("Fortaleza");
    const [endereco, setEndereco] = useState("CE");
    const [cidade, setCidade] = useState("2");
    const [estado, setEstado] = useState("3");
    const [services, setServices] = useState([])
    const [telefone, setTelefone] = useState("")
    const [rating, setRating] = useState()
    const [avaliacoes , setAvaliacoes] = useState("0")
    const [recomendacoes , setRecomendacoes] = useState("0")
    const [descricao, setDescricao] = useState("")
    const [comments, setComments] = useState([]);
    const [providerServices, setProviderServices] = useState([])

    useEffect(async () => {
        

        const response = await getID(id);
        const allComments = await getCommentsById(id)
        const providerServices = await getServicesByProviderId(id);
        console.log("Comments: ",allComments.data);
        console.log("Provider data: ",response.data);
        console.log("Provider Services: ",providerServices.data);
        
        setCidade(response.data.cidade);
        setDataNascimento(response.data.data_nascimento);
        setDescricao(response.data.descricao);
        setEmail(response.data.email);
        setEndereco(response.data.endereco);
        setEstado(response.data.estado);
        setServices(response.data.services);
        setTelefone(response.data.telefone);
        setNome(response.data.nome);
    
        await setComments(allComments.data);
        await setProviderServices(providerServices.data)
        setRating(calculateStars())
        
      }, [id,rating]);
    

      function calculateStars(){
        let soma =0
        if(comments.length){
          comments.forEach((comment, index)=>{
            return soma+=comment.estrelas 
          })
          return (parseFloat((soma/comments.length).toFixed(1)))
          
        }else{
          return null
        }
      }
      calculateStars()
      
      */



  return (
    <div>
        <header className="header-background">
            <div className="header">
                <Link className="servisim-logo" to="./">
                <img src={logo} width="60" height="60"/>
                    <span className="servisim-logo-servi">Servi</span>
                    <span className="servisim-logo-sim">SIM</span>
                </Link>
                <div>
                    <NavegationBarProvider/>
                </div>
                <div>
                    <ProviderHeaderIcons/>
                </div>
            </div>
        </header>
        <div className="main-content">
            <Outlet />
        </div>
    </div>
  );
}
