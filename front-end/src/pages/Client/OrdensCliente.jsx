import { Box, Tab, } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getServicesByClientId, updateServices, deleteServices,} from "../../services/api";

import {RequestItens} from "../../components/ClientUser/RequestsItens"
import { padding } from "@mui/system";

const style = {
  Box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 500,
    maxWidth: "80%",
    maxHeight: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    p: 4,
  },
  text: {
    color: "#111",
    fontWeight: 400,
  },
  titleDecline: {
    marginTop: "1rem",
    marginBottom: "2em",
    color: "#d32f2f",
    fontWeight: 700,
  },
  
  innerBox: {
    marginTop: "1rem",
    width:"100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    p: 4,
  },
};

export const OrdensCliente = () => {
  const [id, setId] = useState(JSON.parse(localStorage.getItem("cUser")).id);
  const [tabValue, setTabValue] = useState("1");
  const [clientServices, setClientServices] = useState([]);
  const [loadding, setLoadding] = useState(false)
  useEffect(async () => {
    const Services = await getServicesByClientId(id);
    await setClientServices(Services.data);
    if (loadding){
      setLoadding(false)
    }
  }, [id,loadding]);

  //console.log(clientServices);

  function formatData(data) {
    return format(parseISO(data), "dd/MMMM/yyyy", { locale: ptBR });
  }
  function formatTime(data) {
    return format(parseISO(data), "HH:MM", { locale: ptBR });
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };



  const finalizadoList = clientServices
    .filter((service) => {
      if (service.status == "finalizado") {
        return service;
      }
    })
    .map((service, index) => {
      return (
        <RequestItens
          key={index}  
          id={service._id}
          status={service.status}
          name={service.nome_provedor}
          time={formatTime(service.data_servico)}
          date={formatData(service.data_servico)}
          data_postagem={service.data_postagem}
          data_servico={service.data_servico}
          value={service.valor}
          valor_pago={service.valor_pago}
          address={service.endereco_cliente}
          details={service.descricao}
          id_provedor={service.id_provedor}
          id_cliente={service.id_cliente}
          setLoadding={setLoadding}
          
        />
      );
      return null;
    });

    const confirmadoList = clientServices
    .filter((service) => {
      if (service.status == "confirmado") {
        return service;
      }
    })
    .map((service, index) => {
      return (
        <RequestItens
          key={index}  
          id={service._id}
          status={service.status}
          name={service.nome_provedor}
          time={formatTime(service.data_servico)}
          date={formatData(service.data_servico)}
          data_postagem={service.data_postagem}
          data_servico={service.data_servico}
          value={service.valor}
          valor_pago={service.valor_pago}
          address={service.endereco_cliente}
          details={service.descricao}
          id_provedor={service.id_provedor}
          id_cliente={service.id_cliente}
          setLoadding={setLoadding}
        />
      );
      return null;
    });

    const pendenteList = clientServices
    .filter((service) => {
      if (service.status == "pendente") {
        return service;
      }
    })
    .map((service, index) => {
      return (
        <RequestItens
          key={index}  
          id={service._id}
          status={service.status}
          name={service.nome_provedor}
          time={formatTime(service.data_servico)}
          date={formatData(service.data_servico)}
          data_postagem={service.data_postagem}
          data_servico={service.data_servico}
          value={service.valor}
          valor_pago={service.valor_pago}
          address={service.endereco_cliente}
          details={service.descricao}
          id_provedor={service.id_provedor}
          id_cliente={service.id_cliente}
          setLoadding={setLoadding}
        />
      );
      return null;
    });
    
    const concluidoList = clientServices
    .filter((service) => {
      if (service.status == "concluido") {
        return service;
      }
    })
    .map((service, index) => {
      return (
        <RequestItens
          key={index}  
          id={service._id}
          status={service.status}
          name={service.nome_provedor}
          time={formatTime(service.data_servico)}
          date={formatData(service.data_servico)}
          data_postagem={service.data_postagem}
          data_servico={service.data_servico}
          value={service.valor}
          valor_pago={service.valor_pago}
          address={service.endereco_cliente}
          details={service.descricao}
          id_provedor={service.id_provedor}
          id_cliente={service.id_cliente}
          setLoadding={setLoadding}
        />
      );
      return null;
    });

  return (
    <Box sx={{display:"flex", flexDirection:"column", height:"100%", width: "100%", typography: "body1" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab className="services-tab" style={{fontWeight: 700}} label="Serviços Finalizados" value="1" />
            <Tab className="services-tab" style={{fontWeight: 700}} label="Serviços Confirmados" value="2" />
            <Tab className="services-tab" style={{fontWeight: 700}} label="Serviços Esperando Confirmação" value="3"/>
            <Tab className="services-tab" style={{fontWeight: 700}} label="Serviços esperando avaliação" value="4"/>
          </TabList>
        </Box>
        <TabPanel value="1">{finalizadoList}</TabPanel>
        <TabPanel value="2">{confirmadoList}</TabPanel>
        <TabPanel value="3">
          {pendenteList}
          
        </TabPanel>
        <TabPanel value="4">{concluidoList}</TabPanel>
      </TabContext>
      
    </Box>
  );
};

/*

// SEGUIR A LOGICA DO MAPA PARA ATUALIZAR O CASO AO CONFIRMAR ELE

/*
  

*/
