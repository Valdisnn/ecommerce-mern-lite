import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  Thumbs,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";
import styled from "styled-components";

const SliderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px;

  .swiper-container {
    width: 65%;
    margin-left: 0px;
    margin-right: 0px;
  }

  .swiper-pagination {
    bottom: 0;
    padding-bottom: 10px;
  }

  .swiper-wrapper {
    padding-inline-start: 0;
  }

  #controller {
    box-shadow: 0 0 15px #ddd;
    border-radius: 1rem;
  }

  .slider-area {
    width: 70%;
    height: 300px;
    background-color: #fff;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .offer {
    width: 33.5%;
    height: 300px;
    background-color: #fff;
    color: #555;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px #ddd;
  }

  .offer-bold {
    color: #3f2aff;
    fontweight: 600;
  }

  .swiper-pagination-bullet-active {
    background: #3f2aff;
  }

  @media(max-width: 900px) {
    justify-content: center;

    .swiper-container {
      width: 100%;
    }

    .offer{
      display:none;
    }
  }
`;

SwiperCore.use([Navigation, Pagination, Controller, Thumbs, Autoplay]);

function Slider() {
  const [thumbsSwiper] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <React.Fragment>
      <SliderBlock>
        <div className="offer">
          <div className="offer-text">
            <h2>Каждому третьему</h2>
            <h2>
              Скидка <span className="offer-bold">15%</span> 😊
            </h2>
          </div>
        </div>
        <Swiper
          id="controller"
          onSwiper={setControlledSwiper}
          thumbs={{ swiper: thumbsSwiper }}
          controller={{ control: controlledSwiper }}
          tag="section"
          wrapperTag="ul"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
        >
          <SwiperSlide className="slider-area">
            <h1>
              <span className="offer-bold">Актуальные цены</span> и ассортимент товаров 🎮
            </h1>
          </SwiperSlide>
          <SwiperSlide className="slider-area">
            <h1>
              Аккуратно 
              <span className="offer-bold"> доставим до двери 🚗</span>
            </h1>
          </SwiperSlide>
          <SwiperSlide className="slider-area">
            <h1>
              Поможем с выбором, операторы
              <span className="offer-bold"> на связи 👨‍💻</span>
            </h1>
          </SwiperSlide>
          <SwiperSlide className="slider-area">
            <h1>
              <span className="offer-bold">Увидели цену ниже</span> - снизим для вас 💙
            </h1>
          </SwiperSlide>
          <SwiperSlide className="slider-area">
            <h1>
              <span className="offer-bold">Не нашли что искали</span> ? Свяжитесь с нами 🙏
            </h1>
          </SwiperSlide>
        </Swiper>
      </SliderBlock>
    </React.Fragment>
  );
}

export default Slider;
