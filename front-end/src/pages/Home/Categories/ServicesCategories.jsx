import "./ServicesCategories.css";
import { useEffect, useState } from "react";
import { BsMouseFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import {Link} from  "react-router-dom"
export function ServicesCategories() {
    //const [menu, setMenu] = useState("")

    //useEffect(()=>{},)

  function Menu_Categorytoggle() {
    const togglemenu_category_reparo = document.querySelector(
      ".menu_category_reparo"
    );
    togglemenu_category_reparo.classList.toggle("active");
    //{menu =="reparo"?(setMenu("")):(setMenu("reparo"))}
    
  }

  function Menu_Categorytoggle2() {
    const togglemenu_category_hidraulica = document.querySelector(
      ".menu_category_hidraulica"
    );

    togglemenu_category_hidraulica.classList.toggle("active");
    //{menu =="hidraulica"?(setMenu("")):(setMenu("hidraulica"))}
  }

  function Menu_Categorytoggle3() {
    const togglemenu_category_pintura = document.querySelector(
      ".menu_category_pintura"
    );

    togglemenu_category_pintura.classList.toggle("active");
    //{menu =="pintura"?(setMenu("")):(setMenu("pintura"))}
  }

  function Menu_Categorytoggle4() {
    const togglemenu_category_jardin = document.querySelector(
      ".menu_category_jardin"
    );

    togglemenu_category_jardin.classList.toggle("active");
    //{menu =="jardin"?(setMenu("")):(setMenu("jardin"))}
  }

  function Menu_Categorytoggle5() {
    const togglemenu_category_outros = document.querySelector(
      ".menu_category_outros"
    );

    togglemenu_category_outros.classList.toggle("active");
    //{menu =="outros"?(setMenu("")):(setMenu("outros"))}
  }

  /*const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  */

  return (
    <div className="action">
      <div className="category" onClick={Menu_Categorytoggle}>
        <div className="img-container">
          <img
            src="https://community.magento.com/t5/image/serverpage/image-id/20151i8CAB797B906CB5F9/image-size/large/is-moderation-mode/true?v=v2&px=999"
            alt="imagen-reparo"
          />
        </div>
        <div className="category_name">
          <p>Reparo</p> <br />
        </div>
        
            <div className="menu_category_reparo">
            <h3>Serviços de Reparo</h3>
            <ul>
              <li>
                <Link to="./reparo" >Reparo de Automóveis</Link>
              </li>
              <li>
                <Link to="./reparo" >Reparo e manuntenção de Compuutadores</Link>
              </li>
              <li>
                <Link to="./reparo" >Reparo de Ar-condicionados</Link>
              </li>
              <li>
                <Link to="./reparo" >Reparo de Celulares</Link>
              </li>
              <li>
                <Link to="./reparo" >Reparo de TVs</Link>
              </li>
              <li>
                <Link to="./reparo" >Reparo em maquinas de lavar</Link>
              </li>
            </ul>
          </div>
        
      
      </div>


      <div className="category" onClick={Menu_Categorytoggle2}>
        <div className="img-container">
          <img
            src="https://png.pngtree.com/png-vector/20190929/ourlarge/pngtree-water-tap-glyph-icon-vector-png-image_1770667.jpg"
            alt="imagem-hidraulica"
          />
        </div>
        <div className="category_name">
          <p>Hidráulica</p> <br />
        </div>
        
            <div className="menu_category_hidraulica">
            <h3>Servicos de Hidráulica</h3>
            <ul>
              <li>
                <Link to="./hidraulico">Conserto de aquecedor de gás</Link>
              </li>
              <li>
                <Link to="./hidraulico">Instalação de aquecedor de gás</Link>
              </li>
              <li>
                <Link to="./hidraulico">Conserto de vazamento</Link>
              </li>
              <li>
                <Link to="./hidraulico">instalação de máquina de lavar louças</Link>
              </li>
              <li>
                <Link to="./hidraulico">Limpeza de caixa d'água</Link>
              </li>
              <li>
                <Link to="./hidraulico">Instalação de torneira</Link>
              </li>
            </ul>
          </div>
        
      
      </div>

      <div className="category" onClick={Menu_Categorytoggle3}>
        <div className="img-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMwaww95krJxA4SikGbgeUzzzz8qTzxMAiMhcBl3SHh08xyvAO1muUMGd9v-Snby3Gv00&usqp=CAU"
            alt="imagem-pintura"
          />
        </div>
        <div className="category_name">
          <p>Pintura</p> <br />
        </div>
        
            <div className="menu_category_pintura">
            <h3>Serviços de Pintura </h3>
            <ul>
              <li>
                <Link to="./pintor">Pintura de Portas e Janelas</Link>
              </li>
              <li>
                <Link to="./pintor">Pintura interna(parede e teto) </Link>
              </li>
              <li>
                <Link to="./pintor">pintura externa</Link>
              </li>
              <li>
                <Link to="./pintor">Pintura de pórtões</Link>
              </li>
            </ul>
          </div>
        
      
      </div>

      <div className="category" onClick={Menu_Categorytoggle4}>
        <div className="img-container">
          <img
            src="https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-watering-plants-glyph-black-icon-png-image_691091.jpg"
            alt="imagen-jardin"
          />
        </div>
        <div className="category_name">
          <p>Jardinagem</p> <br />
        </div>
        
            <div className="menu_category_jardin">
            <h3>Servicos de Jardinagem</h3>
            <ul>
              <li>
                <Link to="./jardim">Regagem de plantas</Link>
              </li>
              <li>
                <Link to="./jardim">Manutenção de jardim </Link>
              </li>
              <li>
                <Link to="./jardim">Plantio de novas mudas</Link>
              </li>
              <li>
                <Link to="./jardim">Paisagismo</Link>
              </li>
              <li>
                <Link to="./jardim">Controle e combate à pragas</Link>
              </li>
            </ul>
          </div>

      
      </div>

      <div className="category" onClick={Menu_Categorytoggle5}>
        <div className="img-container">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAe1BMVEX///8AAAD8/PwEBATg4ODc3NwdHR3u7u7z8/MiIiLY2NjBwcGWlpYlJSX29vbS0tLHx8ejo6Pk5OQVFRVjY2NWVlZISEiIiIhoaGiqqqpNTU0PDw90dHQtLS1eXl6bm5s5OTlwcHCzs7ORkZFAQECCgoJ5eXk3Nze8vLxLBucQAAAKSElEQVR4nO2c6ZaiOhCAIRFFQMV9a9vGrfv9n/AmEW0hVZCEOHPPnPrmzI+WpchWqVSqEgQEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAE8S/A/vYH/JswVvnjjbU8jgeKOP7DTTl+Sh77fnVZkll+uhbLYViy/1rcpulk/HLHe+QG40k6vW2+9g/Jo+XmespnvoQoMbPtx2UeQhw20zyudSFfogVxPt0cQMHzy207Y4GH2h1PpqvHWzkoKyxS791GEqfFrwxQ9Go66Vo+ln3Dhao15GfupUxPsUGQf8JNV+P76FxE2e2ShYkQyfwY+yxffISHBMAicVWsbLtqf/0vh2zgqXTBIDug4wFgtXUS9GPU
                    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"
            alt="imagen-outros"
          />
        </div>
        <div className="category_name">
          <p>Outros</p> <br />
        </div>
        
            <div className="menu_category_outros">
            <h3>Outros Serviços</h3>
            <ul>
              <li>
                <Link to="">Pesquise mais serviçoes</Link>
              </li>
            </ul>
          </div>
        
      
      </div>
    </div>
  );
}
