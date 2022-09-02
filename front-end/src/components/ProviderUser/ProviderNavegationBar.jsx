import { Link } from "react-router-dom";
export const NavegationBarProvider = () => {
  return (
    <nav className="navegation">
      <ul className="mainMenu">
        <li className="mainMenu-item">
          <Link to="./">Inicio</Link>
        </li>
        <li className="mainMenu-item">
          <Link to="./PendingServices">Pendentes</Link>
        </li>
        <li className="mainMenu-item">
          <Link to="./ConfirmedServices">Confirmados</Link>
        </li>
        
      </ul>
    </nav>
  );
};

