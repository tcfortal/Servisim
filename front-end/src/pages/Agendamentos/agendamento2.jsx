import {
  Avatar,
  Box,
  Divider,
  Rating,
  Typography,
  Stack,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import React from "react";
import "./agendamento.css";
import { getID } from "../../services/api";
import { formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const Agendamento = () => {
  const [showElement, setShowElement] = useState(false)

  
  const { provedor } = useParams();
  const navigate = useNavigate();

  const [endereco_cliente, setEndereco_cliente] = useState("");
  const [data_servico, setData_servico] = useState("");
  const [id_provedor, setId_provedor] = useState(provedor);
  const [id_cliente, setId_cliente] = useState(
    JSON.parse(localStorage.getItem("cUser")).id);
  const [status, setStatus] = useState("pendente");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(150);
  const [valor_pago, setValor_pago] = useState(150);
  const [nome_cliente, setNome_cliente] = useState(JSON.parse(localStorage.getItem("cUser")).nome);
  const [nome_provedor, setNome_provedor] = useState("");
  //const [tipoPagamento, setTipoPagamento] = useState("");

  useEffect(async()=>{
    const response = await getID(provedor);
   setNome_provedor(response.data.nome)
  },[provedor, id_cliente])

  function handleSubmit(e) {
    function verifica(value){
      var input = document.getElementById("input");
    
      if(value == 2){
        input.disabled = false;
      }else if(value == 3){
        input.disabled = true;
      }
    };

    
    e.preventDefault();
    let dados = {
      nome_provedor,
      endereco_cliente,
      data_servico,
      id_provedor,
      id_cliente,
      status,
      descricao,
      valor,
      valor_pago,
      nome_cliente,
    };
    console.log(dados);
    axios.post("https://servisim-api.herokuapp.com/service", dados).then(() => {
      navigate("/cliente");
      console.log(dados);
    });
  }

  return (
    <div className="container">

      

    <div className="div-principal">
      <form onSubmit={(e) => handleSubmit(e)}>
      <h3 style={{marginTop:"1rem"}} > Proposta de agendamento</h3>
      

      <div className="NoVisible">
       <ul>
          <li>
            <div>
              <p
                type="text"

                id="id_provedor"
                name="id_provedor"
                value={id_provedor}
                onChange={(e) => setId_provedor(e.target.value)}
              />
              profissional: {id_provedor}
            </div>
          </li>

          <li>
            <div>
              <p
                type="text"

                id="id_cliente"
                name="id_cliente"
                value={id_cliente}
                onChange={(e) => setId_cliente(e.target.value)}
              />
              id cliente: {id_cliente}
            </div>
          </li>

          <li>
            <div>
              <p
                type="text"

                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              status: {status}
            </div>
          </li>

          <li>
            <div>
              <p
                type="number"

                id="valor_pago"
                name="valor_pago"
                value={valor_pago}
                onChange={(e) => setValor_pago(e.target.value)}
              />
              Valor pago: {valor_pago}
            </div>
          </li>
  </ul> 
  </div>


            <div className="div1">
              <label
                type="text"

                id="nome_cliente"
                name="nome_cliente"
                value={nome_cliente}
                onChange={(e) => setNome_cliente(e.target.value)}
              />
             Prezado {nome_cliente} confirme os dados para agendamento
            </div>
      
     
        <div className="radio1">
          <div>
            <p className="title2">Endereço do serviço</p>
            
            <input
              className="subtitle"
              type="radio"
              id="endereco_cliente"
              name="endereco_cliente"
              value={endereco_cliente}
              onChange={(e) => {
                setShowElement(false)
                setEndereco_cliente(e.target.value)}}
              checked
            />

            <label className="subtitle" htmlFor="endereco_cliente">
              Sim
            </label>
          </div>

<div>
  
          <input
              className="subtitle"
              type="radio"
              id="endereco_cliente"
              name="endereco_cliente"
             onClick={(e)=>{
              setShowElement(true)
              setEndereco_cliente("")
             }}
           
            />
              <label className="subtitle" htmlFor="endereco_cliente">
             outro endereço
            </label>
  { showElement ? <div>
     
     <input
       className="radio2"
       type="text"
       size="40"
       placeholder="digite em qual endereço"
       value={endereco_cliente}
       onChange={(e) => setEndereco_cliente(e.target.value)}
     />
       
   </div> : null }
</div>

</div>
       
        <div className="radio1">
          <p className="title2">O serviço é resolvido com 1 diária de R$ 150? </p>
          <div>
            <input
              className="subtitle"
              type="radio"
              id="valor"
              name="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              checked
            />
            <label className="subtitle" htmlFor="valor">
              Sim
            </label>
          </div>

          <div>
            <input
              className="subtitle"
              type="radio"
              id="valor"
              name="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
            <label className="radio3" htmlFor="valor">
              Não, preciso de mais diárias
            </label>
            
            <div>
            <input
              className="radio3"
              type="number"
              size="20"
              placeholder="quantas diárias"
            />
            </div>
          </div>
        </div>

        {/*}<div>
                      <p className="title3">A forma de pagamento desejada</p>

                      <select
                        className="subtitle"
                        name="tipoPagamento"
                        value={tipoPagamento}
                        onChange={(e) => setTipoPagamento(e.target.value)}
                      >
                        <option>Selecione</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Pix">Pix</option>
                        <option value="cartaoDebito">Cartao de débito</option>
                        <option value="cartaoCredito">Cartao de crédito</option>
                      </select>
        </div>{*/}

        <div>
          <p className="title4">Data do serviço</p>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
            <Stack spacing={3}>
              <DateTimePicker
                label="Date&Time picker"
                value={data_servico}
                onChange={(e) => { setData_servico(e) }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>

        <div>
          <p className="title4">
            Observações sobre o serviço a ser executado
          </p>
          <textarea
            id="descricao"
            name="descricao"
            rows="3"
            cols="63"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="provider-submit-btn1">
          Agendar
        </button>
      </form>
    </div>
    </div>
  );
};