
import { ModalNotificationIcon, ModalPerfilIconClient,ModalPerfilIconProvider } from "./Modal";

export const ProviderHeaderIcons = () =>{

    return (
        <nav className="navegation">
          <ul className="mainMenu">
            <li className="mainMenu-item">
             {/*<ModalNotificationIcon/>*/}
            </li>
            <li className="mainMenu-item">
            <ModalPerfilIconProvider/>
            </li>
          </ul>
        </nav>
      )
}
export const ClientHeaderIcons = () =>{

  return (
      <nav className="navegation">
        <ul className="mainMenu">
          <li className="mainMenu-item">
           {/*<ModalNotificationIcon/>*/}
          </li>
          <li className="mainMenu-item">
          <ModalPerfilIconClient/>
          </li>
        </ul>
      </nav>
    )
}