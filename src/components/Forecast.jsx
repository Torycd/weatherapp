function Forecast({ data }) {
  if (!data) return <p className="text-center mt-4">No forecast available</p>;

  const { hourly, daily } = data;
  // console.log(hourly);
  // console.log(daily);
  console.log(data);
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 flex jusitfy-between">
        <div>
          <h1 className="font-bold text-3xl">
            {data ? data?.timezone?.split("/").join(", ") : "Berlin, Germany"}
          </h1>
          <p>
            {new Date(daily.time[0]).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <span></span>
          <h1></h1>
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}

export default Forecast;
