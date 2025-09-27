import logo from "../assets/images/logo.svg";

function NavBar() {
  return (
    <div className="flex justify-between">
      <div>
        <span>
          <img src={logo} alt="logo" />
        </span>
      </div>
      <div></div>
    </div>
  );
}

export default NavBar;
