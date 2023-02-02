import { useContext, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { ThreeDServices } from "../services/threeDServices";

export default function RingSize() {
    const {active, setActive} = useContext(AppContext)
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

  const makeCardActive = (val,index) => {
    setActive(index)
  }

  return (
    <div className="w-full  max-h-[400px]  md:max-h-[100%] flex flex-wrap h-[90%] items-center gap-[20px] pb-[20px]	">
      {ringSizeArr.map(function (item, index) {
        return (
          <div key={index} className ={`${active===index ? "border-green-500 border-2" : ""} border cursor-pointer border-solid border-gray rounded-full p-[30px] w-[80px] h-[80px] flex justify-center items-center`} onClick ={()=>makeCardActive(item[0],index)}>
          <p ><span className="font-medium text-sm md:text-base">{item[0]}</span></p>
        </div>
        );
      })}
    </div>
  );
}
