export const TrayPuller = ({x}) => {


    return (
    <div>
            <div onClick={x} className="h-10 m-auto flex justify-center items-center flex-none  z-[1000]">
            <div  className="w-fit h-fit text-xs p-[5px] bg-[#d8d8d8] mt-[5px] rounded-full">Customise</div>
        </div>
    </div>
    )
}