import dropdownIcon from "../assets/images/icon-dropdown.svg";

const SideBar = ({ daily, hourly }) => {
  return (
    <div className="col-span-2 bg-blue-900 flex flex-col justify-between rounded-lg p-3">
      <div className="flex justify-between mb-1">
        <h1>Hourly forecast</h1>
        <button className="bg-neutral-300 px-4 py-2 flex rounded-md justify-between items-center gap-2 text-white">
          <span>
            {new Date(daily.time[0]).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </span>
          <span>
            <img src={dropdownIcon} alt="dropdown-icon" />
          </span>
        </button>
      </div>
      <ul className="flex flex-col justify-between gap-1">
        {hourly.time
          .map((time, index) => {
            const date = new Date(time);
            const hour = date.getHours();

            if (hour >= 15 && hour <= 22) {
              return (
                <li className="bg-neutral-300 px-4 py-2 rounded-md ">
                  <span>{hourly.temperature_2m[index]}</span>
                </li>
              );
            }
          })
          .filter(Boolean)
          .slice(0, 8)}
      </ul>
    </div>
  );
};

export default SideBar;
