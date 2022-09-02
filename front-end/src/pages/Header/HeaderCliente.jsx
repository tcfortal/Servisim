
import { Link, Outlet, } from "react-router-dom";
import { Search } from "../../components/SearchForm/Search";
import { ClientHeaderIcons } from "../../components/HeaderIcons";
import logo from "../../assests/logo.png"

export function HeaderCliente() {
  return (
    <div>
      <header className="header-background">
        <div className="header">
          <Link className="servisim-logo" to="./">
          <img src={logo} width="60" height="60"/>
            <span className="servisim-logo-servi">Servi</span>
            <span className="servisim-logo-sim">SIM</span>
          </Link>
          <div>
            <Search />
          </div>
          <div>
            <ClientHeaderIcons />
          </div>
        </div>
      </header>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
