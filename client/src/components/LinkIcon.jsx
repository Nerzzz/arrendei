import { Link } from "react-router"

function LinkIcon({icon, text, path}) {
  return (
    <Link to={path} className="flex sm:w-full w-fit bg-center bg-element-bg items-center p-[8px] rounded-[8px] gap-[10px]">
          <i className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] grad-green-to-right text-white">{icon}</i>
          <span className="sm:inline hidden">{text}</span>
    </Link>
  )
}

export default LinkIcon