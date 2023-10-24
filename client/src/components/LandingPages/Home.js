
import React from "react";
import img from "../../assets/hero.png";
import './Home.css';
import Button from "../../layout/Button";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault();
        navigate('/auth')

    }
  return (
    <div className=" min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
      <div className=" md:w-2/4 text-center">
        <h2 className=" text-5xl font-semibold leading-tight">
          Knowledge with
          <span className="text-brightGreen"> Questo</span>
        </h2>
        <p className=" text-lightText mt-5 text-start">
        Questo aims to address various challenges by providing a platform that empowers users to seek and share knowledge efficiently, engage in collaborative problem-solving, and build their reputations within a supportive and innovative community
        </p>

        <Link to ='/auth'>
        <Button title="Log in" />
        </Link>
      </div>

      <div className="w-full md:w-2/4">
      <img src={img} alt="img" className="w-full h-auto md:w-full md:h-96" /> 
    </div>
    </div>
  );
};

export default Home;