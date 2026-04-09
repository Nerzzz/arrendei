import { Link } from "react-router"
import LinkIcon from "./LinkIcon"

import { useEffect, useState } from "react"

import { useContext } from "react"
import { AuthContext } from "../utils/authContext"

import { IconHome2Filled, IconUserFilled, IconSpeakerphone, IconLoader2 } from "@tabler/icons-react"

function Aside() {

     const { user, loading } = useContext(AuthContext)

     const [userData, setUserData] = useState(null)

     useEffect(() => {
          if(!user || loading) return

          fetch(`https://arrendei-630d.onrender.com/users/${user.uid}`)
          .then(res => res.json())
          .then(data => setUserData(data))
     })


     return (
     <aside className='flex flex-col sm:p-[20px] p-[5px] shadow-[0_0_60px_rgba(0,0,0,0.10)] z-50 gap-[30px] sm:min-w-[200px]'>
               <span className='font-semibold text-[14pt] sm:inline hidden'>Arrendei</span>
               <div className="flex flex-col justify-between flex-1">
                    <div>
                         <ul className="flex flex-col gap-[10px] sm:w-full w-fit">
                              <li className="sm:w-full w-fit">
                                   <LinkIcon icon={<IconHome2Filled size={18} />} text={"Feed"} path={"/"} />
                              </li>
                              <li className="sm:w-full w-fit">
                                   <LinkIcon icon={<IconUserFilled size={18} />} text={"Perfil"} path={"/profile"} />
                              </li>
                              <li className="sm:w-full w-fit">
                                   <LinkIcon icon={<IconSpeakerphone size={18} />} text={"Anunciar"} path={"/announce"} />
                              </li>
                         </ul>
                    </div>    
                    <div className='sm:bg-gray p-[10px] sm:w-full w-fit flex flex-col gap-[10px] rounded-[8px]'>
                         {userData && <Link to={"/profile"} className="w-fit flex gap-[10px] items-center">
                              <img src="/images/user-placeholder-image.png" className='w-[30px] h-[30px] rounded-[8px]' />
                              <span className="max-w-[100px] truncate sm:inline hidden">{userData.username}</span>
                         </Link>}
                         {user && !userData && <div className="w-full flex justify-center items-center text-accent animate-spin"><IconLoader2 size={28} /></div>}
                    </div>
               </div>
          </aside>
     )
}

export default Aside