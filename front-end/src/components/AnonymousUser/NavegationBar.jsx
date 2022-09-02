import { Link } from "react-router-dom";
import { ModalCadastro, ModalLogin } from "../Modal";
export const NavegationBar = () => {
  return (
    <nav className="navegation">
      <ul className="mainMenu">
        <li className="mainMenu-item">
          {/*<Link to="">Como Funciona?</Link>*/}
        </li>
        <li className="mainMenu-item">
          <ModalCadastro />
        </li>
        <li className="mainMenu-item">
          <ModalLogin/>
        </li>
      </ul>
    </nav>
  );
};
