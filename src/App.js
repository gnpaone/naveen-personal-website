import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/App.css";
import Loader from "./components/Loader.js";
import Navbar from "./components/Navbar.js";
import Header from "./components/Header.js";
import About from "./components/About.js";
import Projects from "./components/Projects.js";
import Resume from "./components/Resume.js";
import Stats from "./components/Stats.js";
import Contacts from "./components/Contacts.js";
import Chatbot from "./components/chatbot/Chatbot.js";
import NotFound from "./components/NotFound";

const { PUBLIC_URL } = process.env;
const Notfound = () => (
  <BrowserRouter basename={PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={Loader} />
      <Route component={NotFound} status={404} />
    </Switch>
  </BrowserRouter>
);

export default class App extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      currentScroll: 0,
      currentSection: "home",
      loaded: false,
      progress: 0,
    };
  }

  navItems = [
    {
      name: "home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 0 24 24"
          width="40px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      name: "about",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 0 24 24"
          width="40px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      ),
    },
    {
      name: "projects",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 0 24 24"
          width="40px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      ),
    },
    {
      name: "resume",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="40px"
          viewBox="0 0 24 24"
          width="40px"
          fill="#000000"
        >
          <g>
            <rect fill="none" height="24" width="24" />
            <path d="M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z" />
          </g>
        </svg>
      ),
    },
    {
      name: "stats",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="40px"
          viewBox="0 0 24 24"
          width="40px"
          fill="#000000"
        >
          <rect fill="none" height="24" width="24" />
          <g>
            <path d="M17.41,6.59L15,5.5l2.41-1.09L18.5,2l1.09,2.41L22,5.5l-2.41,1.09L18.5,9L17.41,6.59z M21.28,12.72L20.5,11l-0.78,1.72 L18,13.5l1.72,0.78L20.5,16l0.78-1.72L23,13.5L21.28,12.72z M16.24,14.37l1.94,1.47l-2.5,4.33l-2.24-0.94 c-0.2,0.13-0.42,0.26-0.64,0.37L12.5,22h-5l-0.3-2.41c-0.22-0.11-0.43-0.23-0.64-0.37l-2.24,0.94l-2.5-4.33l1.94-1.47 C3.75,14.25,3.75,14.12,3.75,14s0-0.25,0.01-0.37l-1.94-1.47l2.5-4.33l2.24,0.94c0.2-0.13,0.42-0.26,0.64-0.37L7.5,6h5l0.3,2.41 c0.22,0.11,0.43,0.23,0.64,0.37l2.24-0.94l2.5,4.33l-1.94,1.47c0.01,0.12,0.01,0.24,0.01,0.37S16.25,14.25,16.24,14.37z M13,14 c0-1.66-1.34-3-3-3s-3,1.34-3,3s1.34,3,3,3S13,15.66,13,14z" />
          </g>
        </svg>
      ),
    },
    {
      name: "contacts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 0 24 24"
          width="40px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      ),
    },
  ];

  socialMedia = [
    /*  {
            name: 'Facebook',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>,
            link: 'https://www.facebook.com/gnpaone'
        },
        {
            name: "X",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            ),
            link: "https://x.com/gnpaone",
        }, */
    {
      name: "Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      ),
      link: "https://www.instagram.com/gnpaone",
    },
    {
      name: 'LinkedIn',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>,
      link: 'https://www.linkedin.com/in/gnpaone'
    },
    {
      name: "GitHub",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      ),
      link: "https://www.github.com/gnpaone",
    },
    {
      name: "Telegram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z" />
        </svg>
      ),
      link: "https://t.me/gnp_aone",
    },
    {
      name: "Email",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M448 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V128C512 92.65 483.3 64 448 64zM64 112h384c8.822 0 16 7.178 16 16v22.16l-166.8 138.1c-23.19 19.28-59.34 19.27-82.47 .0156L48 150.2V128C48 119.2 55.18 112 64 112zM448 400H64c-8.822 0-16-7.178-16-16V212.7l136.1 113.4C204.3 342.8 229.8 352 256 352s51.75-9.188 71.97-25.98L464 212.7V384C464 392.8 456.8 400 448 400z" />
        </svg>
      ),
      link: "mailto:gnpaone@gmail.com",
    },
  ];

  about = [
    {
      title: "Intro",
      id: 0,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.7099 5.79421C22.4248 5.48211 20.2708 3.17995 17.3257 1.76499C15.8446 1.05339 14.1051 0.537489 12.2683 0.6601C10.5472 0.774986 8.81081 1.44662 7.19057 2.9142C5.13666 2.54192 3.55846 2.92677 2.49394 4.0217C1.40549 5.14125 1.09579 6.77376 1.06276 8.22731C1.02891 9.71678 1.28131 11.2428 1.53146 12.3725C1.65771 12.9426 1.78604 13.4235 1.88331 13.7634C1.93137 13.9314 1.97199 14.0654 2.00124 14.1594C2.08641 19.6088 6.53039 24 12 24C17.2352 24 21.5307 19.9771 21.964 14.8541L22.9867 6.66897C23.0214 6.39118 22.9533 6.06056 22.7099 5.79421ZM4.98994 7.37281C4.23662 8.0105 3.60174 8.76553 3.11347 9.62375C3.07254 9.17353 3.05213 8.71763 3.06224 8.27275C3.09171 6.9763 3.37576 5.98381 3.92793 5.41586C4.41282 4.91712 5.33908 4.51889 7.27096 4.97345C7.60807 5.05277 7.96222 4.95202 8.20711 4.70714C9.61269 3.30155 11.0443 2.74625 12.4015 2.65566C13.7846 2.56334 15.1726 2.94938 16.4596 3.56772C18.5886 4.59057 20.2808 6.17022 20.949 6.84591L20.6506 9.23458C20.1999 8.53573 19.6473 7.91228 19.0101 7.37281C17.1724 5.81727 14.6819 5.00003 12 5.00003C9.31814 5.00003 6.82756 5.81727 4.98994 7.37281ZM20 14C20 14.2189 19.9912 14.4358 19.974 14.6503L19.8864 15.351C19.2444 19.1259 15.9578 22 12 22C7.58172 22 4 18.4183 4 14C4 11.8084 4.87826 10.0877 6.28214 8.89932C7.70188 7.69751 9.7113 7.00003 12 7.00003C14.2887 7.00003 16.2981 7.69751 17.7179 8.89932C19.1217 10.0877 20 11.8084 20 14ZM8.03001 17.2426C7.87428 16.6196 8.36619 16.0003 9.00016 15.9998H15.0002C15.6333 16.0003 16.126 16.6172 15.9703 17.24C15.4525 18.9881 13.7854 20 12.0002 20C10.2834 20 8.46902 18.9986 8.03001 17.2426ZM16.5 12C16.5 12.8285 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8285 13.5 12C13.5 11.1716 14.1716 10.5 15 10.5C15.8284 10.5 16.5 11.1716 16.5 12ZM9 13.5C9.82843 13.5 10.5 12.8285 10.5 12C10.5 11.1716 9.82843 10.5 9 10.5C8.17157 10.5 7.5 11.1716 7.5 12C7.5 12.8285 8.17157 13.5 9 13.5Z"
            fill="#61d3a3"
          />
        </svg>
      ),
      markdown: `
      I am a student of <a class="mail-link-new" href="https://mitindia.edu/en/">Madras Institute of Technology</a> where I study Electronic and Communication Engineering. I like to invest time in various wonderful ideas. I am particularly interested in projects related to coding, tech, and social impact. If you think I can be helpful to you or would like to meet me, please feel free to get in touch.
    `,
    },
    {
      title: "Some history",
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.52786 16.7023C6.6602 18.2608 8.3169 19.3584 10.1936 19.7934C12.0703 20.2284 14.0409 19.9716 15.7434 19.0701C17.446 18.1687 18.766 16.6832 19.4611 14.8865C20.1562 13.0898 20.1796 11.1027 19.527 9.29011C18.8745 7.47756 17.5898 5.96135 15.909 5.02005C14.2282 4.07875 12.2641 3.77558 10.3777 4.16623C8.49129 4.55689 6.80919 5.61514 5.64045 7.14656C4.47171 8.67797 3.89482 10.5797 4.01579 12.5023M4.01579 12.5023L2.51579 11.0023M4.01579 12.5023L5.51579 11.0023"
            fill="none"
            stroke="#61d3a3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 8V12L15 15"
            stroke="#61d3a3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      markdown: [
        `
      &bull; My first computer 🖥️ experience is in my 5th grade. It was an old Windows XP 🪟 machine where I started learning MS Office apps in my school and play Roadrash in secret 🤭. My current go-to PC games are MSFS 2020 ✈️, CS:GO 🔫, Valorant 🥷🏻 and Project Cars 3 🚘. I also use productive apps like DaVinci Resolve 🎬🎛️, Adobe After Effects 🎥✨, Blender 🌀🎨 etc.<br>
      &bull; My first mail id ✉️ was created in Gmail and till date I stick with that mail id mostly.<br>
      &bull; There used to be some Retro Game box 🕹️ in my house in my childhood and that was my first gaming 🎮 experience<br>
      &bull; At 9, I discovered the mini-games 🎲 hidden in Microsoft Windows. I also beat Minesweeper 💣 on expert for the first time.`,
        `
      &bull; I like to capture photos 📸 and most good pics was captured by me in phone cameras starting from 2MP Nokia phone's camera way back to 128MP Xiaomi phone's camera 📱 to high-resolution Camcorders 📹.<br>
      &bull; I got interested in projects for the first time when my school used to give <a class="mail-link-new" href="https://butterflyfields.com/">Butterfly Fields project kits</a> to work with and here's where team work came handy.<br>
      &bull; I like to play Keyboard 🎹 and won a fair number of competitions in various levels as well as in competitions other than Keyboard.<br>
      &bull; At 18, I started my graduate course 🎓 traveling to a different city staying far from home 🏠.", "Ask me in person for other stories that I'm afraid to share with the internet.`,
      ],
    },
    {
      title: "I like",
      id: 2,
      icon: (
        <svg viewBox="0 -0.66 117.77 117.77" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M66.19,20.18c2.39-.72,4.5-1.52,6.69-2C76.22,17.5,79.61,17,83,16.46c15.42-2.34,33.48,14.25,34.55,30.4.64,9.61,0,18.9-3.33,27.91a42.25,42.25,0,0,1-13.78,18.29,107.48,107.48,0,0,1-28.12,16.3c-5.29,2-10.9,3.31-16.38,4.84-1.93.54-4,.57-5.85,1.29-5.13,2-9.56.64-13.67-2.45-7.61-5.7-14.49-12.07-18.9-20.73C14,85.42,10.12,78.73,6.81,71.76,3,63.67,1.35,54.92.47,46.05.13,42.64.07,39.19,0,35.76-.43,11.79,21.69-2.7,40.28.42A31.52,31.52,0,0,1,61.05,13C62.75,15.26,64.35,17.59,66.19,20.18ZM10.5,40.44c.43,4.8.42,7.69,1,10.48,3,14.83,9,28.33,18.67,40,3.08,3.69,7.07,6.61,10.58,9.95,3.74,3.57,7.85,3.81,12.69,2.42A116.39,116.39,0,0,0,96.26,80.46c3.28-2.74,6.5-5.77,8-9.91C107.13,63,108.91,55,107.11,47c-2-8.84-6.89-15.91-16.21-18.15-6-1.46-12.38-2.2-18.46.56a56.64,56.64,0,0,1-5.59,2.17c-2.66.9-4.39.45-6-1.83-1.48-2.1-2.56-4.46-4-6.58-5.93-8.66-13.6-13-25.93-11.08-10.36,1.62-17.79,9.44-19.62,20.07C10.73,35.51,10.64,39,10.5,40.44Z"
            fill="#61d3a3"
          />
          <path
            d="M10.5,40.44c.14-1.49.23-4.93.81-8.28,1.83-10.63,9.26-18.45,19.62-20.07,12.33-1.93,20,2.42,25.93,11.08,1.45,2.12,2.53,4.48,4,6.58,1.59,2.28,3.32,2.73,6,1.83a56.64,56.64,0,0,0,5.59-2.17c6.08-2.76,12.42-2,18.46-.56,9.32,2.24,14.22,9.31,16.21,18.15,1.8,8,0,16-2.81,23.55-1.54,4.14-4.76,7.17-8,9.91a116.39,116.39,0,0,1-42.85,22.81c-4.84,1.39-8.95,1.15-12.69-2.42-3.51-3.34-7.5-6.26-10.58-9.95-9.71-11.65-15.7-25.15-18.67-40C10.92,48.13,10.93,45.24,10.5,40.44Z"
            fill="#102138"
          />
        </svg>
      ),
      markdown: `
      &bull; Coding 🧑🏻‍💻<br>
      &bull; Exploring new tech 🛠️<br>
      &bull; Swimming 🥽<br>
      &bull; Badminton 🏸<br>
      &bull; Playing Keyboard 🎹<br>
      &bull; Reading Books 📖<br>
      &bull; News 📰<br>
      &bull; Web design & development 🖼️<br>
      &bull; Photography 📸`,
    },
    {
      title: "Travel / Geography",
      id: 3,
      icon: (
        <svg
          fill="#61d3a3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21,5H17V3a2,2,0,0,0-2-2H9A2,2,0,0,0,7,3V5H3A2,2,0,0,0,1,7V19a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2V7A2,2,0,0,0,21,5ZM16.09,19H7.91A6.008,6.008,0,0,0,3,14.09V11.91A6.008,6.008,0,0,0,7.91,7h8.18A6.008,6.008,0,0,0,21,11.91v2.18A6.008,6.008,0,0,0,16.09,19ZM21,7V9.873A4.015,4.015,0,0,1,18.126,7ZM9,3h6V5H9ZM3,7H5.874A4.015,4.015,0,0,1,3,9.873ZM3,19V16.127A4.015,4.015,0,0,1,5.874,19Zm18,0H18.126A4.015,4.015,0,0,1,21,16.127ZM12,9a4,4,0,1,0,4,4A4,4,0,0,0,12,9Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,15Z"
            fill="#61d3a3"
          />
        </svg>
      ),
      markdown: [
        `
      &bull; I am from originally from India 🧡🤍💚.<br>
      &bull; I've been to ~ 50 awesome tourist spots in India, some of which I have forgotten, and many of which I would like to revisit.<br>
      &bull; I visited (South India): Bangalore 🤖, Mysore 🏰, Chennai 🌊, Mahabalipuram 🏖️, Madurai 🕌, Vishakapatnam 🌅, Tirupati 🙏, Hyderabad 🥘, Amaravati 🏛️ etc in random order.`,
        `
      &bull; I visited (North India): New Delhi 🕌, Kullu-Manali 🏔️, Shimla ❄️, Kufri 🐎, Leh Ladakh 🏞️, Agra 🏰, Vrindavan 🪈, Varanasi 🕉️, Amritsar 🕌, Jaipur 🏰, Jaisalmer 🏜️, Bikaner 🏰, Alwar 🏞️, Fatehpur 🕌, Chandigarh 🌳, Nainital 🌊, Ahmedabad 🕊️, Porbandar ⚓, Bhopal 🕌, Indore 🍽️, Gwalior 🏰, Khajuraho 🕉️ etc mostly in that order.<br>
      &bull; In 2020-24, I barely travelled. I stayed in Chennai 🌊 for my Bachelor programme but managed to visit all the prominent locations in the vicinity.<br>
      &bull; I hope to explore more of the world 🌎 in future.`,
      ],
    },
    {
      title: "Fun facts",
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.1296 17.8108L10 21H15L12.8704 17.8108M9.5 9.5C9.5 7.84315 10.3431 6.5 12 6.5M19 9C19 15 12.5 18 12.5 18C12.5 18 6 15 6 9C6 4.5 10 3 12.5 3C15 3 19 4.5 19 9Z"
            stroke="#61d3a3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </svg>
      ),
      markdown: `
      &bull; I have a list of thousands of ideas 💡 which would be productive in daily activities.<br>
      &bull; I like my best friends 👯‍♂️ so much that I almost forget time when speaking with them.<br>
      &bull; I can't locate every country on a map 🗺️.<br>
      &bull; I like to invest time ⌚ in various mind-blowing ideas 💡 and also help people 👥.<br>
      &bull; I like to learn new things daily that includes tech 💻, coding 🧑🏻‍💻, spoken languages 🗣️ etc.<br>
      &bull; I added this page 📄 because so many people 👥 complained that my previous site was just my resume 📝.`,
    },
    {
      title: "I dream of",
      id: 5,
      icon: (
        <svg
          fill="#61d3a3"
          viewBox="0 0 24 24"
          id="goal"
          data-name="Flat Line"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-line"
        >
          <path
            id="primary"
            d="M15,9l-2.5,2.5M15,6V9h3l3-3H18V3Z"
            style={{
              fill: "none",
              stroke: "rgb(97, 211, 163)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          ></path>
          <path
            id="primary-2"
            data-name="primary"
            d="M12.33,3H12a9,9,0,1,0,9,9c0-.11,0-.22,0-.33"
            style={{
              fill: "none",
              stroke: "rgb(97, 211, 163)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          ></path>
          <path
            id="primary-3"
            data-name="primary"
            d="M16.9,13A5,5,0,1,1,11,7.1"
            style={{
              fill: "none",
              stroke: "rgb(97, 211, 163)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          ></path>
        </svg>
      ),
      markdown: `
      &bull; always finding inspiration.<br>
      &bull; enabling a brighter future.<br>
      &bull; doing better than the previous day.<br>
      &bull; you not checking the commit history for earlier drafts of this file.`,
    },
    {
      title: "Websites from people I admire",
      id: 6,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.63605 5.63605C7.19815 4.07395 9.73081 4.07395 11.2929 5.63605L14.1213 8.46448C15.6834 10.0266 15.6834 12.5592 14.1213 14.1213C13.7308 14.5119 13.0976 14.5119 12.7071 14.1213C12.3166 13.7308 12.3166 13.0976 12.7071 12.7071C13.4882 11.9261 13.4882 10.6597 12.7071 9.87869L9.87869 7.05026C9.09764 6.26922 7.83131 6.26922 7.05026 7.05026C6.26922 7.83131 6.26922 9.09764 7.05026 9.87869L7.75737 10.5858C8.1479 10.9763 8.14789 11.6095 7.75737 12C7.36685 12.3905 6.73368 12.3905 6.34316 12L5.63605 11.2929C4.07395 9.73081 4.07395 7.19815 5.63605 5.63605ZM11.2929 9.8787C11.6834 10.2692 11.6834 10.9024 11.2929 11.2929C10.5119 12.074 10.5119 13.3403 11.2929 14.1213L14.1213 16.9498C14.9024 17.7308 16.1687 17.7308 16.9498 16.9498C17.7308 16.1687 17.7308 14.9024 16.9498 14.1213L16.2427 13.4142C15.8521 13.0237 15.8521 12.3905 16.2427 12C16.6332 11.6095 17.2663 11.6095 17.6569 12L18.364 12.7071C19.9261 14.2692 19.9261 16.8019 18.364 18.364C16.8019 19.9261 14.2692 19.9261 12.7071 18.364L9.8787 15.5356C8.3166 13.9735 8.3166 11.4408 9.8787 9.8787C10.2692 9.48817 10.9024 9.48817 11.2929 9.8787Z"
            fill="#61d3a3"
          />
        </svg>
      ),
      markdown: `
      &bull; <a class="mail-link-new" href="https://kushwanth13.github.io/">Kushwanth</a><br>
      &bull; <a class="mail-link-new" href="https://saranbodduluri.github.io/">Saran Bodduluri</a><br>
      If we are friends and you feel like you belong on this list, you're probably right. I'm sorry I forgot about you. Pester me and I'll add you.`,
    },
  ];

  project_icons = {
    "ext-link": {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" />
        </svg>
      ),
      link_title: "Link to external website",
    },
    github: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      ),
      link_title: "Link to GitHub repository",
    },
    mail: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
        </svg>
      ),
      link_title: "Contact Naveen to know more!",
    },
  };

  projects = [
    {
      title: "Lunar Landing",
      image: [require("./media/lunar-landing.jpg")],
      gif: require("./media/lunar-landing.gif"),
      desc: "Implementation of some Deep Reinforcement Learning algorithms to solve the Lunar Lander environment from OpenAI gym",
      more: "https://github.com/gnpaone/Lunar-Landing",
      link_title: this.project_icons["github"].link_title,
      icon: this.project_icons["github"].icon,
      tech: ["python", "tensorflow", "openai gym"],
    },
    {
      title: "Kushwanth Personal Website",
      image: [
        require("./media/website_1.png"),
        require("./media/website_2.png"),
        require("./media/website_3.png"),
      ],
      desc: "Personal website of my friend made using Material-UI in ReactJS",
      more: "https://kushwanth13.github.io/",
      link_title: this.project_icons["mail"].link_title,
      icon: this.project_icons["ext-link"].icon,
      tech: ["css", "material-ui", "javascript"],
    },
    {
      title: "Indian Food Classification",
      image: [require("./media/food_1.jpg"), require("./media/food_2.jpg")],
      desc: "This contains the dataset and the source code for the classification of Indian food categories from meal images using a CNN trained model and Tensorflow and Keras",
      more: "https://github.com/gnpaone/Indian-food-classification",
      link_title: this.project_icons["github"].link_title,
      icon: this.project_icons["github"].icon,
      tech: ["python", "tensorflow", "cnn", "keras"],
    },
    {
      title: "Winget Push Test",
      image: [require("./media/winget_1.jpg"), require("./media/winget_2.jpg")],
      desc: "Push winget packages to a test winget repository using Github workflow instead of pushing to the main winget repository via workflow",
      more: "https://github.com/marketplace/actions/winget-push-test",
      link_title: this.project_icons["mail"].link_title,
      icon: this.project_icons["github"].icon,
      tech: ["yaml", "actions"],
    },
    {
      title: "Hackintosh",
      image: [require("./media/mac_1.png")],
      desc: "Installation guide for my Hackintosh build dual-booting macOS Monterey and Windows 11",
      more: "https://github.com/gnpaone/ASUS-Vivobook-Gaming-F571_X571-hackintosh",
      link_title: this.project_icons["github"].link_title,
      icon: this.project_icons["github"].icon,
      tech: ["asl", "shell", "macos"],
    },
  ];

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  loadingDoneCallback = () => {
    this.setState({ loaded: true });
  };

  updateProgressCallback = (amount) => {
    this.setState({ progress: amount });
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  componentDidUpdate = () => {
    if (this.state.loaded) {
      document.body.style.overflowY = "visible";
      this.slideInHeaderElements();
    }
  };

  slideInHeaderElements = () => {
    document.getElementsByClassName("scene")[0].style.animation =
      "fadeInRight .3s cubic-bezier(0.645, 0.045, 0.355, 1) forwards";
    var welcome_children = document.getElementById("welcome").childNodes;
    var delay;
    for (var i = 0; i < welcome_children.length; i++) {
      delay = i + 1;
      welcome_children[i].style.animation =
        "fadeInLeft .3s cubic-bezier(0.645, 0.045, 0.355, 1) ." +
        delay +
        "s forwards";
    }
  };

  handleScroll = (evt) => {
    this.updateScroll();
    this.updateSection();
    this.slideInVisibleElements();
  };

  slideInVisibleElements = () => {
    var elements = Array.from(document.getElementsByClassName("to-slide"));

    elements.forEach((e) => {
      if (this._isInViewPort(e)) {
        e.classList.remove("to-slide");
        //the last token indicates the direction
        var dir = e.classList[e.classList.length - 1];
        e.classList.remove(dir);
        e.classList.add("fade-in-" + dir);
      }
    });
  };

  _isInViewPort = (element) => {
    var bounding = element.getBoundingClientRect();

    if (
      ((window.innerHeight || document.documentElement.clientHeight) -
        bounding.top) /
        100 >=
      2
    ) {
      return true;
    } else {
      return false;
    }
  };

  updateScroll = () => {
    var offset;
    if (window.pageYOffset !== undefined) offset = window.pageYOffset;
    else
      offset = (
        document.documentElement ||
        document.body.parentNode ||
        document.body
      ).scrollTop;

    this.setState({ currentScroll: offset });
  };

  updateSection = () => {
    var sections = Array.from(document.getElementsByTagName("section")).filter(
      (x) => {
        return x.offsetTop - this.state.currentScroll <= 1;
      },
    );
    var closest = sections[sections.length - 1];
    if (closest) {
      this.toggleSidebar(
        closest.getAttribute("id"),
        this.state.currentSection,
        document.getElementById("contacts-sidebar"),
      );
      this.setState({ currentSection: closest.getAttribute("id") });
    }
  };

  toggleSidebar = (currSect, oldSect, sidebar) => {
    if (currSect === "contacts") {
      if (sidebar.classList.contains("fade-in-left")) {
        sidebar.classList.remove("fade-in-left");
      }
      sidebar.classList.add("fade-out-left");
    } else if (currSect !== "contacts" && oldSect === "contacts") {
      if (sidebar.classList.contains("fade-out-left")) {
        sidebar.classList.remove("fade-out-left");
      }
      sidebar.classList.add("fade-in-left");
    }
  };

  render() {
    var header = <Header progressCallback={this.updateProgressCallback} />;
    if (!this.state.loaded) {
      return (
        <div className="page-container">
          <Loader
            progress={this.state.progress}
            loadingDoneCallback={this.loadingDoneCallback}
          />
          {header}
        </div>
      );
    } else {
      return (
        <div className="page-container">
          <Navbar
            items={this.navItems}
            currentSection={this.state.currentSection}
          />
          {header}
          <About list={this.about} />
          <Projects list={this.projects} />
          <Resume />
          <Stats />
          <Contacts contacts={this.socialMedia} />
          <Chatbot />
        </div>
      );
    }
  }
}
