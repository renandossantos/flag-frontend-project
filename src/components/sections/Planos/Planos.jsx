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
      <div className="swiper-container">
        <Swiper
          navigation={true}
          pagination={{
            clickable: true,
            el: ".custom-pagination" /* novo */,
            bulletClass: "swiper-pagination-bullet" /* novo */,
            bulletActiveClass: "swiper-pagination-bullet-active" /* novo */,
          }}
          modules={[Navigation, Pagination]}
          className="swiper-planos"
          loop={false}
          breakpoints={{
            0: {
              slidesPerView: "auto",
              spaceBetween: 16,
              centeredSlides: true,
            },
            640: {
              slidesPerView: "auto",
              spaceBetween: 20,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: "auto",
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
