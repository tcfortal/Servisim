import {
  Avatar,
  Box,
  Divider,
  Rating,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import Ellipse from "../../assests/Ellipse.png"
import { format, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CommentTextBox } from "../../components/CommentTextBox";
import { getComments, getCommentsById, getID } from "../../services/api";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
export const AnonymousServiceProvider = () => {
  const { provedor } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState(provedor);
  const [nome, setNome] = useState("Nome");
  const [email, setEmail] = useState("Sobrenome");
  const [dataNascimento, setDataNascimento] = useState("Fortaleza");
  const [endereco, setEndereco] = useState("CE");
  const [cidade, setCidade] = useState("2");
  const [estado, setEstado] = useState("3");
  const [services, setServices] = useState([]);
  const [telefone, setTelefone] = useState("");
  const [rating, setRating] = useState()
  const [avaliacoes, setAvaliacoes] = useState("0");
  const [recomendacoes, setRecomendacoes] = useState("0");
  const [descricao, setDescricao] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
  );
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    const response = await getID(provedor);
    console.log(response.data);
    setCidade(response.data.cidade);
    setDataNascimento(response.data.data_nascimento);
    setDescricao(response.data.descricao);
    setEmail(response.data.email);
    setEndereco(response.data.endereco);
    setEstado(response.data.estado);
    setServices(response.data.services);
    setTelefone(response.data.telefone);
    setNome(response.data.nome);
    const allComments = await getCommentsById(provedor)
    console.log(allComments.data);
    //const response2 = await getComments();
    await setComments(allComments.data);
    setRating(calculateStars())
  }, [provedor,rating]);

  function calculateStars(){
    let soma =0
    if(comments.length){
      comments.forEach((comment, index)=>{
      console.log(`estrelas index ${index}`,comment.estrelas);
        return soma+=comment.estrelas 
      })
      console.log(soma)
      console.log("dividido por :", comments.length)
      console.log(parseFloat((soma/comments.length).toFixed(1)));
      return (parseFloat((soma/comments.length).toFixed(1)))
      
    }else{
      return null
    }
  }
  calculateStars()

  function iniciais(string){
    let iniciais = "";
    let nomeArray = string.split(" ",2)
    nomeArray.forEach((e)=>{return ( iniciais += e.substring(0,1).toLocaleUpperCase())})
    return iniciais
  }
  
  const CommentList = comments
    .map((comment, index) => {
      let data = format(parseISO(comment.createdAt), "dd/MMMM/yyyy")
      let count = 0
      if(count < 6 && comment.comentario.trim() != ""){
        count++
        return (
          <Grid key={index} item xs={12} className="comments-grid-item">
            <CommentTextBox
              comment={comment.comentario}
              stars={comment.estrelas}
              date={data}
            />
          </Grid>
        );
    }
    return null
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/login`);
  };

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
                recomendações <b>{recomendacoes}</b> · avaliações{" "}
                <b>{avaliacoes}</b>
              </Typography>
              <Typography variant="body1" display="block" gutterBottom>
                <RoomOutlinedIcon /> {cidade.charAt(0).toUpperCase()}
                {cidade.slice(1)}({estado.toUpperCase()}) - {"Brasil"}
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
            <div className="provider-profile-content-form-div">
              <form
                className="provider-profile-content-form"
                onSubmit={handleSubmit}
              >
                <button type="submit" className="provider-submit-btn">
                  Faça o Login para Agendar
                </button>
              </form>
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
                {/*}<Grid item xs={12} className="comments-grid-item">
                  <CommentTextBox date={"dd/mm/yyyy"} comment={descricao} stars={5}/>
                </Grid>
                <Grid item xs={12} className="comments-grid-item">
                  <CommentTextBox date={"dd/mm/yyyy"} comment={`${descricao} ${descricao}`} stars={4}/>
                </Grid>
                <Grid item xs={12} className="comments-grid-item">
                  <CommentTextBox date={"dd/mm/yyyy"} comment={`${descricao} ${descricao}${descricao} ${descricao} ${descricao} ${descricao}`} stars={2}/>
                </Grid>
                <Grid item xs={12} className="comments-grid-item">
                  <CommentTextBox date={"dd/mm/yyyy"} comment={"ytdsayudt ytdasuyt dasuytt dyastduy asdtuydy datsuydt auysdt uysatdyadsu tuyasdt yusa dtyusatdy ttdysat dytyt dsyatd ystdyt ysdt ytdst"} stars={5}/>
                </Grid>
                <Grid item xs={12} className="comments-grid-item">
                  <CommentTextBox date={"a"} name={"a"} surName={"a"} comment={"a"} stars={5}/>
              </Grid>{*/}
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
