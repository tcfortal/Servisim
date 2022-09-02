import { ProviderConfirmations } from "../../components/ProviderUser/ServicesConfirm";
import { Typography } from "@mui/material";
import { format,parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getServicesByProviderId } from "../../services/api";
//Serviços JÁ aceitos e que precisam ser feitos na data (confirmado)
export function ConfirmedServices() {
  const id = JSON.parse(localStorage.getItem("pUser")).id;
  const [providerServices, setProviderServices] = useState([]);

  useEffect(async () => {
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
      if (service.status == "confirmado") {
        return service;
      }
    })
    .map((service, index) => {
      return (
        <ProviderConfirmations
          key={index}
          name={service.nome_cliente}
          time={formatTime(service.data_servico)}
          date={formatData(service.data_servico)}
          value={service.valor}
          address={service.endereco_cliente}
          details={service.descricao}
        />
      );
      return null;
    });


  return (
    <div>
      <Typography variant="h3" component="h3" marginLeft="30px">
        Serviços Confirmados
      </Typography>
      {List.length?(List):(<span className="empty-list">Sem atividade por enquanto.</span>) }
    </div>
  );
}
