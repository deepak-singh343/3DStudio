


export default function Button ({buttonclass, buttonfunction,  buttontext, buttontextclass, buttonParentClass}) {

return (
    <div className={buttonParentClass}>
        <div className = {buttonclass} onClick = {buttonfunction}>
            <p className = {buttontextclass}>{buttontext}</p>
        </div>
    </div>
)

}