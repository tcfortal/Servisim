import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/Context/auth";
import Card from "./Card/Card"
export function Profile() {
  const profile = JSON.parse(localStorage.getItem("cUser"));
  //console.log(profileName)
  return (
    <div>
      <h2>Ola, {profile.nome}</h2>
      
      <Card/>
    </div>
  );
}
