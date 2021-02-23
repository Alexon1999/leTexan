import { useLocation, useHistory } from "react-router-dom";
import lottie from "lottie-web";
import "./felicitation.css";
import { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";

const Felicitation = () => {
  const location = useLocation();
  const history = useHistory();
  const svg = useRef(null);

  useEffect(() => {
    const animItem = lottie.loadAnimation({
      wrapper: svg.current || document.querySelector(".felicitation__svg"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets3.lottiefiles.com/packages/lf20_u4yrau.json",
    });
    animItem.play();

    const id = setTimeout(() => {
      history.replace("/");
    }, 10000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  if (location.state?.payer) {
    return (
      <div className='felicitation'>
        <div className='felicitation__container'>
          <div ref={svg} className='felicitation__svg'></div>
          <h1>Félicitations</h1>

          {/* web component : custom html tag */}
          {/* https://lottiefiles.com/ */}
          {/* https://lottiefiles.com/web-player */}
          {/* <lottie-player
          className='felicitation__svg'
          src='https://assets3.lottiefiles.com/packages/lf20_u4yrau.json'
          background='transparent'
          speed='1'
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay></lottie-player> */}

          <h2>Nous avons bien reçu votre commande</h2>
          <p>Vous allez recevoir également un mail concernant votre paiement</p>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              history.replace("/");
            }}>
            Page d'Accueil
          </Button>
        </div>
      </div>
    );
  } else {
    history.push("/");
    return null;
  }
};

export default Felicitation;
