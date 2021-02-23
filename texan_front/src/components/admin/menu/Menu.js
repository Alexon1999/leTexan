import Logo from "../../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, changePage } from "../../../app/Redux-slices/adminSlice";
import { useState } from "react";

import "./menu.css";
import { IconButton } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";

const AdminNav = () => {
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [active, setActive] = useState(false);

  return (
    <div className={"adminNav " + (active ? "active" : "")}>
      <div className='adminNav__header'>
        <img src={Logo} alt='' />
      </div>

      <div className='adminNav__links'>
        {admin.pages.map((page) => (
          <button
            key={page.name}
            className={
              "adminNav__link " +
              (admin.currentPage === page.name ? "active" : "")
            }
            onClick={() => {
              dispatch(changePage(page.name));
              history.push(path + page.path);
            }}>
            <i className={"fas adminNav__link__icone " + page.icone}></i>{" "}
            <p>{page.libelle}</p>
          </button>
        ))}
      </div>

      <div className='adminNav__close'>
        <IconButton onClick={() => setActive(!active)}>
          <i
            className={
              "fas fa-" + (active ? "chevron-right" : "chevron-left")
            }></i>
        </IconButton>
      </div>
    </div>
  );
};

export default AdminNav;
