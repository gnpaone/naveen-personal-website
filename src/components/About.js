import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import proPic from "../media/download.png";
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                <img className="propic" alt="Naveen profile" src={proPic} />
              }
              className="propic-element"
            />
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={customStyles}
              ariaHideApp={false}
            >
              <div>
                <img
                  src={proPic}
                  alt="Full profile"
                  style={{ width: "auto", height: "80vh" }}
                />
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
                        <SwiperSlide>
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
