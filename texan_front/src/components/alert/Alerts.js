import React from "react";
import Alert from "./Alert";

import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectAlerts } from "../../app/Redux-slices/alertsSlice";

import "./Alerts.css";

const Alerts = () => {
  const alerts = useSelector(selectAlerts);

  return (
    <div className='alerts'>
      <AnimatePresence>
        {alerts.map((alert) => (
          <Alert {...alert} key={alert.id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Alerts;
