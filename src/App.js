import "./App.css";
import SideMenu, { menuItems } from "./components/SideMenu";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";



function App() {
  const [inactive, setInactive] = useState(false);
  return (  
    <div className="App">
      <Router>
        <SideMenu
          onCollapse={(inactive) => {
            setInactive(inactive);
          }}
        />

        <div className={`container ${inactive ? "inactive" : ""}`}>
          {/* improvememt, not recorded in video, its just looping through menuItems
          instead of hard coding all the routes */}
          {menuItems.map((menu, index) => {
            return (
              <>
                <Route key={menu.name} exact={menu.exact} path={menu.to}>
                   {menu.component}
                </Route>
                {menu.subMenus && menu.subMenus.length > 0
                  ? menu.subMenus.map((subMenu, i) => (
                    <Route key={subMenu.name} path={subMenu.to}>
                      <h1>{subMenu.name}</h1>
                    </Route>
                  ))
                  : null}
              </>
            );
          })}

        </div>
      </Router>
    </div>
  );
}

export default App;
