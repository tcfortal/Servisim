import { CarouselPage } from "./Carousel/carousel"
import { ServicesCategories } from "./Categories/ServicesCategories"
import { Footer } from "./Footer/footer"


export function Home() {
    return (
        <div className="home-body">

            <div className="home-search-area">
                <h1 className="home-statment">Ache a pessoa <b className="home-statment-bold bold">certa</b> para o seu problema</h1>
            </div>
            <div className="home-catalog">

                <h1>Categorias de Serviços</h1>
                <ServicesCategories />
                <CarouselPage />
                <Footer />
            </div>

        </div>
    )
}