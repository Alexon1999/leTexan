import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeAlert } from "../../app/Redux-slices/alertsSlice";

const Alert = ({ image_url, nom, id }) => {
  const [pourcentage, setPourcentage] = useState(0);
  const dispath = useDispatch();

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      dispath(removeAlert({ id }));
    }, 5000);
    const idInterval = setInterval(() => {
      setPourcentage((prev) => prev + 2.4);
    }, 100);

    return () => {
      clearTimeout(idTimeout);
      clearInterval(idInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className='alert'
      variants={alertAnimation}
      animate='to'
      initial='from'
      exit='exit'>
      <img src={image_url} alt={nom} />
      <p>
        {nom} <span>a été ajouté dans votre panier.</span>
      </p>
      <ProgressBar now={pourcentage} />
      <i
        className='fas fa-times close '
        onClick={() => dispath(removeAlert({ id }))}></i>
    </motion.div>
  );
};

const alertAnimation = {
  from: {
    opacity: 0,
    y: 20,
  },
  to: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },

  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export default Alert;
