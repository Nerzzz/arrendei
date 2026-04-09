function Tag(props) {
     return (
          <span className={`${props.isRent ? "bg-red-400 text-red-800" : "bg-green-300 text-green-800"} px-[8px] py-[2px] text-[10pt] font-medium rounded-full w-fit`}>{props.isRent ? "Alugado" : "Disponível"}</span>
     )
}

export default Tag