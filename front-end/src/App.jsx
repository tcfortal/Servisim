import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { AppRoutes } from "./Routes";
import { Header } from "./pages/Header/Header";
// EM "useState()" O VALOR INICIAL QUE EU COLOCO NOS PARENTESES É O ESTADO INICIAL DA MINHA VARIAVEL, NO CASO, "tweets"
// Todo componente nada mais é do que uma função js que retorna um HTML (componente)


function App() {


  return (
    <AppRoutes/>
  )
}

export default App
