import { Avatar, Box, Divider } from "@mui/material";

import { useState } from "react";

interface props {
  name: string;
  details: string;
  date: string;
  time: string;
}
export const ProviderToDoItem: React.FC<props> = ({
  date,
  name,
  time,
  details,
}) => {

  function iniciais(string: string){
    let iniciais = "";
    let nomeArray = string.split(" ",2)
    nomeArray.forEach((e)=>{return ( iniciais += e.substring(0,1).toLocaleUpperCase())})
    return iniciais
  }

  return (
    <Box className="toDo-grid-item-box">
      <div className="toDo-divider">
        <div className="toDo-content">
          <div className="toDo-user">
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
            <div className="toDo-user-info">
              <span>
                {name}
              </span>
              <div>{date} {time}</div>
            </div>
          </div>
        </div>
        {/*<div className="toDo-text-box"></div>*/}
      </div>
    </Box>
  );
};
