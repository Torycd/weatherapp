import gearIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

function Units() {
  return (
    <div className="bg-neutral-300 px-4 py-2 rounded-md flex justify-between items-center gap-2">
      <span>
        <img src={gearIcon} alt="gear-icon" />
      </span>
      <h1>Units</h1>
      <span>
        <img src={dropdownIcon} alt="dropdown-icon" />
      </span>
    </div>
  );
}

export default Units;
