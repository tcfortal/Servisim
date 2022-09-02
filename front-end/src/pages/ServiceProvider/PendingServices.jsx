import { ProviderPendencies } from "../../components/ProviderUser/Pendencies";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getServicesByProviderId, updateServices } from "../../services/api";
import { Typography } from "@mui/material";

//Serviços AINDA NÃO aceitos e que precisam ser aceitados ou recusados (pendente)

// SEGUIR A LOGICA DO MAPA PARA ATUALIZAR O CASO AO CONFIRMAR ELE
export function PendingServices() {
  const id = JSON.parse(localStorage.getItem("pUser")).id;
  const [providerServices, setProviderServices] = useState([]);

  /*function setValuesFunction(state, setState){
    return setState(state)
  }*/


  useEffect(async () => {
    /*{confirmedId?(
      updateServices(confirmedId, {status: "confirmado"})
      ):(null)}*/
    const providerServices = await getServicesByProviderId(id);
    await setProviderServices(providerServices.data);
  }, []);


  function formatData(data) {
    return format(parseISO(data), "dd/MMMM/yyyy", { locale: ptBR });
  }
  function formatTime(data) {
    return format(parseISO(data), "HH:MM", { locale: ptBR });
  }




  const List = providerServices
    .filter((service) => {
      if (service.status == "pendente") {
        return service;
      }
    })
    .map((service, index) => {
      return (
        <ProviderPendencies
          key={index}  
          id={service._id}
          status={service.status}
          name={service.nome_cliente}
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
        />
      );
      return null;
    });

  return (
    <div>
      <Typography variant="h3" component="h3" marginLeft="30px">
        Serviços Aguardando Confirmação
      </Typography>
      ;{List.length?(List):(<span className="empty-list">Sem serviços pendentes por enquanto.</span>) }
    </div>
  );
}
