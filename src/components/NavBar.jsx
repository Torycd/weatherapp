import logo from "../assets/images/logo.svg";

import Units from "./Units";

function NavBar() {
  return (
    <div className="flex justify-between">
      <div>
        <span>
          <img src={logo} alt="logo" />
        </span>
      </div>
      <div>
        <Units />
      </div>
    </div>
  );
}

export default NavBar;
