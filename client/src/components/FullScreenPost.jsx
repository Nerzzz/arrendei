import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../utils/authContext"
import { Navigate } from "react-router-dom"

import { IconBrandWhatsappFilled, IconXFilled, IconPencilFilled, IconLoader2 } from "@tabler/icons-react"

import Tag from "./Tag"
import TypeTag from "./TypeTag"
import EditPostWindow from "./EditPostWindow"

function EditProfileWindow({data, onClose, onUpdate}) {

     const { user, loading } = useContext(AuthContext)

     useEffect(() => {
          if(!user){
               <Navigate to={"/login"} />
          }
          if(user.uid == data.userUid) setEditable(true)
     }, [user, data])

     const [editable, setEditable] = useState(false)

     const [ownerData, setOwnerData] = useState(null)

     const [isOpenEdit, setIsOpenEdit] = useState(false)

     console.log(data)

     function openEdit(){
          if(isOpenEdit) return setIsOpenEdit(false)
          setIsOpenEdit(true)
     }

     useEffect(() => {
          fetch(`https://arrendei-630d.onrender.com/users/${data.userUid}`)
          .then(res => res.json())
          .then(data => setOwnerData(data))
     }, [!ownerData])

     const [isUpscale, setUpscale] = useState(true)

     function upscale(){
          if(!isUpscale) return setUpscale(true) 
          setUpscale(false)
     }

     return (
          <div className="z-50 bg-[#2c2c2c9c] top-0 left-0 fixed w-dvw h-dvh flex md:justify-center items-center gap-[20px] p-[40px] overflow-x-auto">
               {ownerData && <div className="bg-white p-[20px] rounded-[10px] h-full">
                    <nav className="w-fit mr-0 ml-auto flex gap-[30px]">
                         {editable && <button onClick={openEdit} className="cursor-pointer flex items-center gap-[5px]"><IconPencilFilled />Editar</button>}
                         <button onClick={onClose} className="cursor-pointer"><IconXFilled /></button>
                    </nav>
                    <div className="flex gap-[20px] mt-[20px]">
                         <div className="w-[450px] h-[450px] flex overflow-auto bg-black snap-x snap-mandatory">
                              {data.post.images.map((img) => {
                                   return <img src={img} key={img} alt="" className={`w-full h-full ${isUpscale?"object-cover":"object-contain"} snap-center shrink-0`} onDoubleClick={upscale} />
                              })}
                         </div>
                         <div className="max-w-[350px] w-[350px] flex flex-col gap-[20px]">
                              <div className="flex gap-[10px] items-center p-[10px] bg-gray-100 rounded-[10px]">
                                   <img src={ownerData.image} alt="" className="w-[40px] h-[40px] rounded-full" />
                                   <span>{ownerData.username}</span>
                              </div>
                              <span>{data.post.createdAt}</span>
                              <div className="overflow-y-auto flex flex-col">
                                   <h2>{data.post.title}</h2>
                                   <p>{data.post.desc}</p>
                              </div>
                              <TypeTag type={data.post.type} />
                              <div className="mb-o mt-auto flex flex-col gap-[10px]">
                                   <a className="flex gap-[5px] items-center text-accent font-medium" href="https://wa.me/5519999204765" target="_blank"><IconBrandWhatsappFilled />Conversar com {ownerData.username}</a>
                                   <Tag isRent={data.post.isRent} />
                              </div>
                         </div>
                    </div>
               </div>}
               {!ownerData && <IconLoader2 className="text-accent animate-spin" size={40} />}
               {isOpenEdit && <EditPostWindow onClose={() => setIsOpenEdit(false)} onUpdate={onUpdate} data={data} />}
          </div>
     )
}

export default EditProfileWindow