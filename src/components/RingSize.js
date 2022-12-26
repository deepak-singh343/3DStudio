import { useState } from "react";

export default function RingSize() {

    const [active, setActive] = useState(false)

    const ringSizeArr = [
    [3, 14.1],
    [3.5, 14.5],
    [4, 14.9],
    [4.5, 15.3],
    [5, 15.7],
    [5.5, 16.1],
    [6, 16.5],
    [6.5, 16.9],
    [7, 17.3],
    [7.5, 17.7],
    [8, 18.1],
    [8.5, 18.5],
    [9, 19],
    [9.5, 19.4],
    [10, 19.8],
    [10.5, 20.2],
    [11, 20.6],
    [11.5, 21],
    [12, 21.4],
    [12.5, 21.8],
    [13, 22.3],
    [13.5, 22.6],
    [14, 23.2],
  ];


  const makeCardActive = () => {
    setActive(true)
  }

  return (
    <div className="w-full grid grid-cols-4	 h-[90%] items-center gap-[20px] flex-wrap	">
      {ringSizeArr.map(function (item, i) {
        return (
          <div key={i} className ={active ? "border border-solid border-black rounded-md p-[6px] shadow-[0_0_2px_2px_rgba(0,0,0,0.3)]" :"border border-solid border-black rounded-md p-[6px]" } onClick ={makeCardActive}>
            <p >US Size: <span className="font-medium">{item[0]}</span></p>
            <div>
              <p>
                Inside Diameter: <span className="font-medium">{item[1]}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
