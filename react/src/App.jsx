import { useState, useEffect } from "react";

//all the parameters for the ui.
//this page is using tailwind
function App() {
  const [info, setInfo] = useState({ altitude: 0, HIS: 0, ADI: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(300);
  const [showTextForm, setShowTextForm] = useState(false);

  const maxPosition = 400;
  const rangeOfMovement = 360;

  const rotationAngle = info.HIS % 360; // Ensure the value is between 0 and 360
  const blueHeightPercentage = 50 + info.ADI * 0.5;

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:3000/info")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPosition(maxPosition - (info.altitude / 3000) * rangeOfMovement);
  }, [info.altitude]);

  // the components
  // the first is the radio switch to text or visual prompt
  return (
    <div>
      <div>
        <label className="flex items-center p-1">
          <input
            type="radio"
            name="viewOption"
            value="components"
            checked={!showTextForm}
            onChange={() => setShowTextForm(false)}
          />
          Visual
        </label>
        <label className="flex items-center px-1">
          <input
            type="radio"
            name="viewOption"
            value="textForm"
            checked={showTextForm}
            onChange={() => setShowTextForm(true)}
          />
          Text
        </label>
      </div>

      {showTextForm ? (
        <div className="left-1/2 transform -translate-x-1/2 text-center bottom-1/2 absolute px-3 shadow-md border-2 border-black">
          <h2 className="px-3">Info:</h2>
          <p className="p-1">Altitude: {info.altitude}</p>
          <p className="p-1">HIS: {info.HIS}</p>
          <p className="p-1">ADI: {info.ADI}</p>
        </div>
      ) : (
        // The meter (altitude) components
        <div className="inline-flex justify-between gap-7 w-full p-4">
          <div className="flex flex-col md:flex-row justify-items-center  relative">
            <img className="" src="/img/meter.png" />
            <img
              className="absolute w-32 left-1/2 transform -translate-x-1/2"
              src="/img/line.png"
              style={{ top: `${position}px` }}
            />
            <div>
              {" "}
              <span className=" left-1/2 transform -translate-x-1/2 text-center absolute bottom-0 px-3 shadow-md border-2 border-black ">
                ALTITUDE
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center relative ">
            <img //This is the dial 1-360 (HIS)
              className=""
              src="/img/sc-dial.png"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            />
            <img
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              src="/img/arrow-1.png"
            />
            <div className=" left-1/2 transform -translate-x-1/2 text-center absolute bottom-0 px-3 shadow-md border-2 border-black ">
              HIS
            </div>
          </div>
          <div className="flex relative flex-col md:flex-row justify-items-center text-center">
            <div className="p-4 " style={{ width: "500px" }}>
              <div className="horizon-meter mx-auto  border-4 border-black rounded-full">
                <div className="green-part"></div>
                <div //and this is the color one between -100 - 100 green for -100 and blue for 100
                  className="blue-part"
                  style={{ height: `${blueHeightPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="left-1/2 transform -translate-x-1/2 text-center absolute bottom-0 px-3 shadow-md border-2 border-black">
              ADI
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
