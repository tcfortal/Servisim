import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getServicesProvider,getComments } from "../../services/api";
import { Grid, Avatar, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Ellipse from "../../assests/Ellipse.png"
export function ClienteSearch() {
  const { search } = useParams();
  const [servicesProvider, setServicesProvider] = useState([]);
  const [allComments, setAllComments] = useState([])
  useEffect(async () => {
    const response = await getServicesProvider();
    const comments = await getComments();

    setServicesProvider(response.data);
    setAllComments(comments.data)
    console.log(response.data);
  }, [search]);


  function iniciais(string){
    let iniciais = "";
    let nomeArray = string.split(" ",2)
    nomeArray.forEach((e)=>{return ( iniciais += e.substring(0,1).toLocaleUpperCase())})
    return iniciais
  }


  const List = servicesProvider
    .filter((user) => {
      if (
        user.services.toString().toLowerCase().includes(search.toLowerCase())||
        user.nome.toString().toLowerCase().includes(search.toLowerCase())
      ) {
        return user;
      }
    })
    .map((p, index) => {

      function calculateStars(){
        let comments = allComments.filter((comment)=>{
          return comment.id_provedor == p._id
        })
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

      return (
        <Grid key={index} item xs={4}>
          <Link to={`/cliente/provedor/${p._id}`}>
            <ul className="servicesProvider-card" key={p.id}>
              <Grid container direction="row" spacing={1} display="flex">
                <Grid item xs={3.5}>
                {p._id == "62a0d5c374005acb5fc701c4"?(
                <Avatar
                  className="avatar"
                  sx={{
                    marginTop: "5px",
                    width: "100%",
                    minWidth: 100,
                    height: 100,
                    maxHeight: 100,
                  }}
                  src={Ellipse}
                > 
                </Avatar>):(
                <Avatar
                  className="avatar"
                  sx={{
                    marginTop: "5px",
                    width: "100%",
                    minWidth: 100,
                    height: 100,
                    maxHeight: 100,
                  }}
                >
                  {p.nome? (iniciais(p.nome)):(H)}
                  
                </Avatar>)}
                </Grid>

                <Grid item xs={8}>
                  <li className="servicesProvider-name">
                    {p.nome.charAt(0).toUpperCase()}
                    {p.nome.slice(1)}
                  </li>

                  <li className="servicesProvider-item">
                    <span className="list-item-title">Atuação:</span>{" "}
                    {p.services.join(", ")}
                  </li>
                  <li className="servicesProvider-item-star">
                    <span className="servicesProvider-item-star-span">
                      <StarIcon sx={{ color: "#ffc107" }} /> {calculateStars()?(calculateStars()):("Ñ/A")} (
                      <b>{"5 "} Recomendações</b>){" "}
                    </span>
                  </li>
                </Grid>
              </Grid>
              <li className="servicesProvider-item">
                <span className="list-item-title">Descrição:</span>{" "}
                <div className="list-description-text">{p.descricao} </div>
              </li>
            </ul>
          </Link>
        </Grid>
      );
    });
  console.log(List);
  return (
    <div className="">
      <h1 className="row search-title">
        Buscando por <span className=" col search-title-blue">{search}</span>
      </h1>
      <div className="container">
        <Grid
          container
          className="servicesProvider-cardList"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {List}
        </Grid>
      </div>
    </div>
  );
}
