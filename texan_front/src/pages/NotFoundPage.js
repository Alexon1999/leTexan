import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NotFoundSvg from "../images/error-404-monochrome.svg";
import { smoothScroll } from "../utilities";

const NotFoundPage = () => {
  const history = useHistory();

  const pushToHome = (id) => (e) => {
    history.push("/");
    smoothScroll(id)(e);
  };

  return (
    <div
      className='NotFoundPage'
      style={{
        height: "92vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <img
        src={NotFoundSvg}
        alt='not found'
        style={{ maxWidth: "30%", objectFit: "contain" }}
      />
      <h1
        style={{ textAlign: "center", fontSize: "2rem", color: "#817C7C" }}
        className='my-3'>
        Page non trouvée{" "}
      </h1>
      <Link to='/' onClick={pushToHome("home")}>
        <i className='fas fa-arrow-left mr-1'></i> Revenez au page d'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
