import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import bigProPic from "../media/actualme.png";
import smallProPic from "../media/me.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Parallax } from "swiper/modules";
import Modal from "react-modal";
import "swiper/css";
import "swiper/css/pagination";

import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "../css/components/About.css";

var he = require("he");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#102138",
    border: "1px solid #61d3a3",
    zIndex: "1000",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "999",
  },
};

const About = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const openModal = () => {
    setImgLoaded(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [smallImgLoaded, setSmallImgLoaded] = useState(false);

  return (
    <section id="about" className="about-section">
      <div className="about-container container to-slide up">
        <div className="about-text">
          <h3>About me</h3>
          <VerticalTimeline>
            <VerticalTimelineElement
              iconClassName="propic-icon"
              iconOnClick={openModal}
              icon={
                <div className="small-loader-container">
                  <img
                    className={`propic ${smallImgLoaded ? "loaded" : "loading"}`}
                    alt="Naveen profile"
                    src={smallProPic}
                    onLoad={() => setSmallImgLoaded(true)}
                  />
                  {!smallImgLoaded && (
                    <div className="image-loader small-loader">
                      <div className="loader-spinner small-spinner"></div>
                    </div>
                  )}
                </div>
              }
              className="propic-element"
            />
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={customStyles}
              ariaHideApp={false}
            >
              <div className="image-loader-container">
                {isModalOpen && (
                  <img
                    src={bigProPic}
                    alt="Naveen profile"
                    className={`modal-image ${imgLoaded ? "loaded" : "loading"}`}
                    onLoad={() => setImgLoaded(true)}
                  />
                )}
                {!imgLoaded && isModalOpen && (
                  <div className="image-loader">
                    <div className="loader-spinner"></div>
                  </div>
                )}
              </div>
            </Modal>
            {props.list.map((element) => {
              return (
                <VerticalTimelineElement
                  key={element.id}
                  className={`vertical-timeline-element`}
                  iconClassName={`vertical-timeline-element-icon`}
                  icon={element.icon}
                >
                  <h3 className="vertical-timeline-element-title">
                    {element.title}
                  </h3>
                  {Array.isArray(element.markdown) ? (
                    <Swiper
                      direction={"vertical"}
                      slidesPerView={"auto"}
                      spaceBetween={30}
                      centeredSlides={true}
                      style={{
                        "--swiper-pagination-color": "#61d3a3",
                        "--swiper-pagination-bullet-inactive-color": "#d0efff",
                        "--swiper-pagination-right": "0px",
                      }}
                      autoHeight={true}
                      mousewheel={true}
                      parallax={true}
                      speed={500}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Mousewheel, Pagination, Parallax]}
                      className="mySwiper"
                    >
                      {element.markdown.map((content, index) => (
                        <SwiperSlide key={index}>
                          <code
                            className="vertical-timeline-element-description"
                            dangerouslySetInnerHTML={{
                              __html: he.decode(content),
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <code
                      className="vertical-timeline-element-description"
                      dangerouslySetInnerHTML={{
                        __html: he.decode(element.markdown),
                      }}
                    />
                  )}
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default About;

About.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    markdown: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired
  })).isRequired
};
