import { Avatar, Box, Rating } from "@mui/material";

import { useState } from "react";

interface props {
  name: string;
  details: string;
  date: string;
  value: number;
}
export const ProviderHistoryItem: React.FC<props> = ({
  date,
  name,
  value,
  details,
}) => {

  function iniciais(string: string){
    let iniciais = "";
    let nomeArray = string.split(" ",2)
    nomeArray.forEach((e)=>{return ( iniciais += e.substring(0,1).toLocaleUpperCase())})
    return iniciais
  }

  function decimals(int: number){
    return int.toFixed(2)
  }
  //console.log(decimals(value));
  
  return (
    <Box className="history-grid-item-box">
      <div className="history-divider">
        <div className="history-content">
          <div className="history-user">
            <Avatar
              className="avatar"
              sx={{
                minWidth: 50,
                width: "100%",
                maxWidth: 50,
                height: 50,
                maxHeight: 50,
              }}
            >
              {name? (iniciais(name)):("H")}
            </Avatar>
            <div className="history-user-info">
              <span>
                {name}
              </span>
              <div>{date}</div>
            </div>
          </div>
          <div className="history-item-value" >{decimals(value)} R$</div>
        </div>
        {/*<div className="history-text-box"></div>*/}
        
      </div>
    </Box>
  );
};
