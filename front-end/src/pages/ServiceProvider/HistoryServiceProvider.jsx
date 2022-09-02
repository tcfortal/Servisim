import { ProviderHistory } from "../../components/ProviderUser/ProviderHistory";
import { format,parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Typography, Grid, Box } from "@mui/material";
import { useEffect,useState } from "react";
import { getServicesByProviderId } from "../../services/api";

//Serviços Já terminados e ou avaliados (Finalizados e concluidos)
export function HistoryServiceProvider() {
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
      if (service.status == "finalizado" || service.status == "concluido") {
        return service;
      }
    })
    .map((service, index) => {
      return (
        <ProviderHistory
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
      <Typography variant="h3" component="h3" marginLeft="50px">
        Histórico
      </Typography>
      <Box className="center-box">
        <Grid container spacing={2}>{List.length?(List):(<span className="empty-list">Sua história esta vazia mas não significa que ficará assim para sempre.</span>) }</Grid>
      </Box>
    </div>
  );
}
