import React from "react";
import img from "../../assets/about.png";
//import Button from "../../layout/Button";
import Heading from "../../layout/Heading";
//import { Link } from "react-scroll";

const About = () => {
  return (
    <div className=" md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
      <div className=" w-full md:w-2/4">
      <img src={img} alt="img" className="w-full h-auto md:w-full md:h-96" /> 
      </div>

      <div className="w-full md:w-2/4 text-center space-y-2">
        <Heading title1="About" title2="Us?" />
        <p className=" text-lightText">
        Welcome to the heart of online knowledge exchange! Questo is your go-to destination for harnessing the combined intelligence of experts and enthusiasts. Ask, share, and explore, because every question you raise and every answer you provide propel us all towards a smarter, more informed world
        </p>

        
      </div>
    </div>
  );
};

export default About;