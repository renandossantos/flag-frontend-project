import { useEffect, useState } from "react";
import "./Depoimentos2.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    fetch("/data/depoimentos.json")
      .then((res) => res.json())
      .then((data) => setDepoimentos(data));
  }, []);

  if (!depoimentos.length) return null;

  return (
    <section className="depoimentos">
      <h2 className="depoimentos-titulo">Depoimentos</h2>

      <div className="slider-container">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
          spaceBetween={20}
          slidesPerView={3}
          centeredSlides={false}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 15,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1800: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
        >
          {depoimentos.map((depoimento) => (
            <SwiperSlide key={depoimento.id}>
              <div className="card">
                <div className="image-content">
                  <span className="overlay"></span>

                  <div className="card-image">
                    <img
                      src={`/images/${depoimento.foto_perfil}`}
                      alt={depoimento.nome || "foto-perfil"}
                      className="card-img"
                    />
                  </div>
                </div>
                <div className="card-content">
                  <h2 className="name">{depoimento.nome}</h2>
                  <p className="idade">{depoimento.idade} anos</p>
                  <p className="description">{depoimento.depoimento}</p>
                  <p className="data-depoimento">{depoimento.data}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Depoimentos;
