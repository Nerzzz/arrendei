function TypeTag({type}) {
     switch (type) {
          case "tool":
               return <span className="px-[8px] py-[2px] bg-blue-300 text-blue-700 text-[10pt] font-medium rounded-full w-fit">Ferramenta</span>
          
          case "vehicle":
               return <span className="px-[8px] py-[2px] bg-amber-200 text-amber-700 text-[10pt] font-medium rounded-full w-fit">Veículo</span>

          case "other": 
               return <span className="px-[8px] py-[2px] bg-gray-300 text-gray-600 text-[10pt] font-medium rounded-full w-fit">Outro</span>
          
          case "building": 
               return <span className="px-[8px] py-[2px] bg-slate-400 text-slate-600 text-[10pt] font-medium rounded-full w-fit">Imóvel</span>
          
          default:
               return <span className="px-[8px] py-[2px]  bg-gray-300 text-gray-600 text-[10pt] font-medium rounded-full w-fit">Outro</span>
     }
}

export default TypeTag