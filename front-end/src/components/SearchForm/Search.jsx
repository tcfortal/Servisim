import { useNavigate,  } from "react-router-dom";
import { useState } from "react";
export const Search = ()=>{

    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault();
        //console.log("submit", search);
        navigate(`./${search}`)
    }
    
    return(
    <form className="search" onSubmit={handleSubmit}>
        <label className="header-form-label"></label>
        <input type="text" className="header-form-txt" value={search} placeholder="Buscar por serviços" onChange={(e)=> setSearch( e.target.value)}/>
        <button type="submit" className="header-form-btn" >Buscar</button>
    </form>
);
}