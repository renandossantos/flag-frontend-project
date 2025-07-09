import { useState, useEffect } from "react";
import "./Planos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

function Planos() {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    fetch("/data/planos.json")
      .then((res) => res.json())
      .then((data) => setPlanos(data));
  }, []);

  if (!planos.length) return null;

  return (
    <section className="planos">
      <h2 className="planos-titulo">Nossos Planos</h2>

      <div className="swiper-container-planos">
        <Swiper
          navigation={true}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          modules={[Navigation, Pagination]}
          className="swiper-planos"
          spaceBetween={10}
          slidesPerView={3}
          loop={false}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
              centeredSlides: true,
              centeredSlidesBounds: true,
              centerInsufficientSlides: true,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              centeredSlides: false,
            },
          }}
        >
          {planos.map((plano) => (
            <SwiperSlide key={plano.id}>
              <div
                className={`card-planos ${
                  plano.destaque ? "destaque-planos" : ""
                }`}
              >
                <h3>{plano.categoria}</h3>
                <p className="tipo">{plano.tipo}</p>

                <div className="preco">
                  <strong>{plano.valor}</strong>
                  {plano.valor_avulso && <span>({plano.valor_avulso})</span>}
                </div>

                <ul className="beneficios">
                  {plano.beneficios.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <button className="botao-planos">
                  {plano.destaque ? "Quero esse" : "Saiba mais"}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination"></div>
      </div>
    </section>
  );
}

export default Planos;
