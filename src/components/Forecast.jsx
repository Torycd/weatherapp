function Forecast({ data }) {
  if (!data) return <p className="text-center mt-4">No forecast available</p>;

  const { hourly, daily } = data;

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3"></div>
      <div className="col-span-2"></div>
    </div>
  );
}

export default Forecast;
