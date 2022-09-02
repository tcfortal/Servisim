import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import { AuthProviderContext } from "../../components/Context/authProvider";

export function LoginServidor(){
    
    const {login} = useContext(AuthProviderContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="login-container">
            <div  className="login-box" method="post" action="index.html" onSubmit={handleSubmit}>
                <form className="login-form">
                    <div className="form-header rows">
                        <h1 className="login-title col">Login Servidor</h1>
                    </div>
                    <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div>
                        <button type="submit"className="submit" >Logar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}