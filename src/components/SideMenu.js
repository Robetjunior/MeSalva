import React, { useEffect, useState } from "react";
import logo from "../assets/logo/jubaLogo.jpg";
import user from "../assets/jubaSelfie.png";

import MenuItem from "./MenuItem";

import Dashboard from '../pages/Dashboard'
import Content from '../pages/Content'
import Courses from '../pages/Courses'
import Videos from '../pages/Videos'
import Design from '../pages/Design'
import Content2 from '../pages/Content2'
import Courses2 from '../pages/Courses2'
import Videos2 from '../pages/Videos2'
import Design2 from '../pages/Design2'
import Design3 from '../pages/Design3'
import Design4 from '../pages/Design4'


/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/",
    iconClassName: "bi bi-speedometer2",
    component: <Dashboard/>
  },
  {
    name: "Content",
    exact: true,
    to: `/content`,
    iconClassName: "bi bi-speedometer2",
    component: <Content/>,
    subMenus: [
      { name: "Courses", to: "/content/courses", component: <Courses/> },
      { name: "Videos", to: "/content/videos", component: <Videos/> },
    ],
  },
  { name: "Design", to: `/design`, iconClassName: "bi bi-vector-pen", component: <Design/> },
  {
    name: "Content 2",
    exact: true,
    to: `/content-2`,
    iconClassName: "bi bi-speedometer2",
    component: <Content2/>,
    subMenus: [
      { name: "Courses", to: "/content-2/courses", component: <Courses2/> },
      { name: "Videos", to: "/content-2/videos", component: <Videos2/> },
    ],
  },
  { name: "Design 2", to: `/design-2`, iconClassName: "bi bi-vector-pen", component: <Design2/> },
  { name: "Design 3", to: `/design-3`, iconClassName: "bi bi-vector-pen", component: <Design3/> },
  { name: "Design 4", to: `/design-4`, iconClassName: "bi bi-vector-pen", component: <Design4/> },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>José Roberto</h5>
          <p>joseroberto@mesalva.com</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
