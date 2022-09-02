import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavegationBar } from "../../components/AnonymousUser/NavegationBar";
import { Search } from "../../components/SearchForm/Search";
import logo from "../../assests/logo.png"
export function Header() {
  return (
    <div>
        <header className="header-background">
            <div className="header">
                <Link className="servisim-logo" to="/">
                <img src={logo} width="60" height="60"/>
                    <span className="servisim-logo-servi">Servi</span>
                    <span className="servisim-logo-sim">SIM</span>
                </Link>
                <div>
                <Search/>
                </div>
                <NavegationBar/>
            </div>
        </header>
        <div className="main-content">
            <Outlet />
        </div>
    </div>
  );
}
