import {
  Avatar,
  Box,
  Divider,
  Rating,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import Ellipse from "../../assests/Ellipse.png"

import { ptBR } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CommentTextBox } from "../../components/CommentTextBox";
import { getCommentsById, getID, getServicesByProviderId } from "../../services/api";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import {ProviderHistoryItem} from "../../components/ProviderUser/ProviderHistoryItem"
import {ProviderToDoItem} from "../../components/ProviderUser/ProviderToDoItem"

export const LoggedServiceProvider = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(JSON.parse(localStorage.getItem("pUser")).id);
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
  const [descricao, setDescricao] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
  )
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

  function iniciais(string){
    let iniciais = "";
    let nomeArray = string.split(" ",2)
    nomeArray.forEach((e)=>{return ( iniciais += e.substring(0,1).toLocaleUpperCase())})
    return iniciais
  }

  function FormatData(data){
    return(format(parseISO(data), "dd/MM/yyyy '-' HH:MM", {locale: ptBR}))
  }

  const ToDoList = providerServices.filter((service)=>{
    if(service.status == "confirmado"){
      return service
    }
  }).map((service, index)=>{
    if(index<6){
    return(
    <ProviderToDoItem key={index} date={FormatData(service.data_servico)} name={service.nome_cliente} details={service.descricao} value={service.valor} time={service.horario}/>
    )
  }
  return null;
  })

  const HistoryList = providerServices.filter((service)=>{
    if(service.status == "finalizado" || service.status == "concluido"){
      return service
    }
  }).map((service, index)=>{
    if(index<6){
    return(
    <ProviderHistoryItem key={index} date={FormatData(service.data_servico)} name={service.nome_cliente} details={service.descricao} value={service.valor} time={service.horario}/>
    )
  }
  return null;
  })

  const CommentList = comments
    .map((comment, index) => {
      let count = 0
      if(count < 6 && comment.comentario.trim() != ""){
        count++
      return (
        <Grid key={index} item xs={12} className="comments-grid-item">
          <CommentTextBox
            comment={comment.comentario}
            stars={comment.estrelas}
            date={FormatData(comment.createdAt)
            }
          />
        </Grid>
      );
    }
    return null
    });
  
  return (
    <Box sx={{ width: "95%", height: "100%" }}>
      <Grid
        container
        spacing={2}
        className="provider-profile"
        sx={{ width: "100%", height: "100%", padding: 0, margin: 0 }}
      >
        <Grid item xs={3}>
          <Box
            className="provider-profile-card"
            sx={{ width: "100%", maxWidth: 350, height: "100%" }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {id == "62a0d5c374005acb5fc701c4"?(
                <Avatar
                  className="avatar"
                  sx={{
                    width: "100%",
                    minWidth: 300,
                    height: 300,
                    maxHeight: 300,
                    fontSize: 48,
                  }}
                  src={Ellipse}
                > 
                </Avatar>):(
                <Avatar
                  className="avatar"
                  sx={{
                    width: "100%",
                    minWidth: 300,
                    height: 300,
                    maxHeight: 300,
                    fontSize: 48,
                  }}
                >
                  {nome? (iniciais(nome)):(H)}
                  
                </Avatar>)}
              

              <Typography variant="h4" gutterBottom component="div">
                {nome}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                {services.join("\n")}
              </Typography>
              {/* Pode ser um butão que ira editar ja nessa pagina ou pode ser um link para outra pagina com o design completamente diferente */}
              <Link to="./ProviderUpdate">
              <button
                className="provider-profile-card-edit-btn"
              >
                Editar Perfil
              </button>
              </Link>
                {!rating?(<><br/>Usuário ainda não avaliado.</>):(
                  <Rating
                  className="stars"
                  name="rating"
                  defaultValue= {rating?? 0}
                  precision={0.5}
                  size="large"
                  sx={{
                    fontSize: "3rem",
                  }}
                  readOnly
                />
                )}
              

              <Divider />

              <Typography variant="overline" display="block" gutterBottom>
                recomendações <b>{recomendacoes}</b> · avaliações <b>{avaliacoes}</b>
              </Typography>
              <Typography variant="body1" display="block" gutterBottom>
              <RoomOutlinedIcon/> {cidade.charAt(0).toUpperCase()}{cidade.slice(1)}({estado.toUpperCase()}) - {"Brasil"}
              </Typography>

              <Typography variant="h5" gutterBottom component="div">
                <b>Description</b>
              </Typography>

              <Typography variant="body1" gutterBottom>
                {descricao}
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={9}>
          
          <Box className="provider-profile-content">
            <div className="provider-profile-content-services-group">
            <div className="provider-profile-toDo-group">
            <Link to="./ConfirmedServices">
                  <div className="provider-profile-toDo-group-title">
                  
                  <Typography variant="h5" gutterBottom component="div">
                 <b>Serviços Agendados</b> 
              </Typography>
              
                  </div>
                <Box className="provider-profile-toDo-box">
                  <Stack
                    width="100%"
                    height="100%"
                    direction="column"
                    alignItems="center"
                    spacing={1}
                  >
                      {ToDoList.length?(ToDoList):(<span className="empty-list">Sem atividades por enquanto.</span>)}
                  </Stack>
                </Box>
                </Link>
                </div>
                <div className="provider-profile-history-group">
                <Link to="./ProviderHistory">
                  <div className="provider-profile-history-group-title">
                  <Typography variant="h5" gutterBottom component="div">
                <b>Historico</b>
              </Typography>
                  </div>
                <Box className="provider-profile-history-box">
                  
                  <Stack
                      width="100%"
                      height="100%"
                      direction="column"
                      alignItems="center"
                      spacing={1}
                  >
                      {HistoryList.length?(HistoryList):(<span className="empty-list">Sem atividades por enquanto.</span>)}
                      {/*}
                      <ProviderHistoryItem date={"dd/mm/yyyy"} name={"nome"} surName={"sobrenome"} details={"detalhes do pedido breve"} value={"0000"} />
                      <ProviderHistoryItem date={"dd/mm/yyyy"} name={"nome"} surName={"sobrenome"} details={"detalhes do pedido breve"} value={"0000"} />
                      <ProviderHistoryItem date={"dd/mm/yyyy"} name={"nome"} surName={"sobrenome"} details={"detalhes do pedido breve"} value={"0000"} />
                      <ProviderHistoryItem date={"dd/mm/yyyy"} name={"nome"} surName={"sobrenome"} details={"detalhes do pedido breve"} value={"0000"} />
                      <ProviderHistoryItem date={"dd/mm/yyyy"} name={"nome"} surName={"sobrenome"} details={"detalhes do pedido breve"} value={"0000"} />
                      <ProviderHistoryItem date={"dd/mm/yyyy"} name={"nome"} surName={"sobrenome"} details={"detalhes do pedido breve"} value={"0000"} />
                      {*/}

                  </Stack>

                </Box>
                </Link>
                </div>
            </div>
            <div className="provider-profile-content-gallery">
              <Typography variant="h5" gutterBottom component="div">
                <b>Galeria de {nome}</b>
              </Typography>
              <Box
                className="provider-profile-content-gallery-box"
                sx={{ maxWidth: "100%", maxHeight: 400, marginY: "1rem" }}
              >
                <Grid
                  container
                  className="provider-profile-card"
                  direction="row"
                  alignContent="center"
                  justifyContent="center"
                  spacing={0}
                  sx={{ width: "100%", height: "100%" }}
                >
                  {/*template da fotos ... Local para fazer o mapping das fotos*/}

                  {/*ainda precisa ser melhor execultado*/}
                  <Grid item xs={3} className="gallery-grid-item">
                    <Box className="gallery-image"></Box>
                  </Grid>
                  <Grid item xs={3} className="gallery-grid-item">
                    <Box className="gallery-image"></Box>
                  </Grid>
                  <Grid item xs={3} className="gallery-grid-item">
                    <Box className="gallery-image"></Box>
                  </Grid>
                  <Grid item xs={3} className="gallery-grid-item">
                    <Box className="gallery-image"></Box>
                  </Grid>
                </Grid>
              </Box>
            </div>
            <div className="provider-profile-content-comments">
              <Typography variant="h5" gutterBottom component="div">
                <b>Comentários</b>
              </Typography>
              <Grid
                container
                className="comments-grid"
                alignContent="center"
                justifyContent="center"
                spacing={0}
                sx={{ width: "100%", height: "100%" }}
              >
                {/*template dos comentarios ... Local para fazer o mapping dos comentarios*/}
                {CommentList.length ? (
                  CommentList
                ) : (
                  <Grid item xs={12} className="comments-grid-item">
                    {" "}
                    Esse provedor ainda não recebeu comentários.
                  </Grid>
                )}
              </Grid>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};


