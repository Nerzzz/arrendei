import { Link } from "react-router"

function Header() {
  return (
    <header className="py-[10px] px-[20px] flex justify-between items-center fixed top-0 z-50 bg-[#fefefe] w-full shadow-2xl">
        <span className="text-[20px] font-medium">Arrendei</span>
        <Link className="bg-accent font-medium px-[15px] py-[8px] rounded-full text-white">Anunciar</Link>
    </header>
  )
}

export default Header