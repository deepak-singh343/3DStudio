import { FaCaretLeft } from "react-icons/fa"
import { FaCaretRight } from "react-icons/fa"
import Button from "./Button";

export default function JewelleryPreference() {
  return (
    <div className="w-full flex justify-between items-start h-full flex-col h-full">
      <div className="w-full flex flex-col gap-[25px] max-h-[80%] md:max-h-[100%]  overflow-y-scroll">
      <div className="flex flex-col gap-[10px] border-b-2 border-solid border-[#C0C0C0] pb-[24px]">
        <p className="text-sm md:text-base">Natural Gemstone Quality </p>
        <div className="flex justify-around w-[95%] md:w-[90%] m-auto relative">
        <FaCaretLeft className="flex absolute self-center	justify-self-center	-left-[13px] md:h-[25px] cursor-pointer"/>
          <div className="p-[5px] md:p-[10px] text-center  flex flex-col justify-center items-center flex flex-col border rounded shadow-[0_0_2px_2px_rgba(0,0,0,0.3)]">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/catalog/product/AQ-Round-Faceted-A.png?width=50"
            ></img>
            <p className="text-sm md:text-base">Good</p>
          </div>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/catalog/product/AQ-Round-Faceted-AA.png?width=50"
            ></img>
            <p className="text-sm md:text-base">Better</p>
          </div>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/catalog/product/AQ-Round-Faceted-AAA.png?width=50"
            ></img>
            <p className="text-sm md:text-base">Best</p>
          </div>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/catalog/product/AQ-Round-Faceted-AAAA.png?width=50"
            ></img>
            <p className="text-sm md:text-base">Heirloom</p>
          </div>
          <FaCaretRight className="flex absolute self-center justify-self-center	right-[0px] md:h-[25px] cursor-pointer"/>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] border-b-2 border-solid border-[#C0C0C0] pb-[24px] ">
      <p className="text-sm md:text-base">Total Carat Weight </p>
        <div className="flex justify-around w-[90%] m-auto relative">
        <FaCaretLeft className="flex absolute self-center	justify-self-center	-left-[13px] md:h-[25px] cursor-pointer"/>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/ring/sr1912aqd/5mm-aaa-aquamarine-white-gold-rose-gold-ring.jpg?width=50"
            ></img>
            <p className="text-sm md:text-base">0.60 carat</p>
          </div>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/ring/sr1912aqd/6mm-aaa-aquamarine-white-gold-rose-gold-ring.jpg?width=50"
            ></img>
            <p className="text-sm md:text-base">0.99 carat</p>
          </div>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/ring/sr1912aqd/6mm-aaa-aquamarine-white-gold-rose-gold-ring.jpg?width=50"
            ></img>
            <p className="text-sm md:text-base">1.50 carat</p>
          </div>
          <FaCaretRight className="flex absolute self-center justify-self-center	right-[0px] md:h-[25px] cursor-pointer"/>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]  border-solid border-[#C0C0C0] pb-[24px] ">
      <p className="text-sm md:text-base">Metal type </p>
        <div className="flex justify-around w-[90%] m-auto relative">
        <FaCaretLeft className="flex absolute self-center	justify-self-center	-left-[13px] md:h-[25px] cursor-pointer"/>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/catalog/product/metal/14k-rose-gold.png?width=50"
            ></img>
            <p className="text-sm md:text-base">Rose gold</p>
          </div>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/catalog/product/metal/14k-white-&-rose-gold.png?width=50"
            ></img>
            <p className="text-sm md:text-base">White & Rose gold</p>
          </div>
          <div className="p-[5px] md:p-[10px] text-center flex flex-col justify-center items-center">
            <img
              className="p-[5px] h-[60px] w-[60px]"
              src="https://assets.angara.com/catalog/product/metal/14k-yellow-gold.png?width=50"
            ></img>
            <p className="text-sm md:text-base">Yellow gold</p>
          </div>
          <FaCaretRight className="flex absolute self-center justify-self-center	right-[0px] md:h-[25px] cursor-pointer"/>
        </div>
      </div>
      </div>
      <Button
            buttonclass={
              "w-[250px] px-[10px] py-[15px] font-semibold text-center bg-[#FA505A] cursor-pointer text-white rounded-md "
            }
            buttontext={"Add To cart"}
            buttonParentClass={"self-center	justify-self-start	"}
          />
    </div>
  );
}
