import { useState, useContext } from "react"
import { AuthContext } from "../utils/authContext"

import { useNavigate } from "react-router"

import ActionButton from "../components/ActionButton"

import { feedbackToast } from "../utils/feedbackToast"

function CreatePost() {
     let navigate = useNavigate()

     const {user, loading} = useContext(AuthContext)

     const [title, setTitle] = useState("")
     const [desc, setDesc] = useState("")
     const [files, setFiles] = useState([])
     const [iType, setItype] = useState("")

     const [isLoading, setIsloading] = useState(false)

     async function createPost(e){
          e.preventDefault()
          
          if(title.length == 0){
               feedbackToast("Informe um título para o item!", false)
               return    
          }
          if(desc.length == 0){
               feedbackToast("Informe uma descrição para o item!", false)
               return
          }
          if(files == ""){
               feedbackToast("Adicione pelo menos uma imagem de seu item!", false)
               return
          }
          if(files.length > 4){
               feedbackToast("No máximo 4 imagens!", false)
               return
          }
          if(iType == ""){
               feedbackToast("Informe o tipo do seu item!", false)
               return
          }

          setIsloading(true)
          
          const formData = new FormData()

          formData.append("userUid", user.uid)
          formData.append("title", title)
          formData.append("desc", desc)
          formData.append("type", iType)

          for (let i = 0; i < files.length; i++) {
               formData.append("images", files[i])
          }

          try{
               const response = await fetch("https://arrendei-630d.onrender.com/posts", {
                    method: "POST",
                    body: formData
               })

               if(response){
                    feedbackToast(`Item anunciado com sucesso!`, true)
                    navigate("/")
               }
          } catch(err){
               feedbackToast(`Um erro ocorreu: ${err}`, false)
               setIsloading(false)
               return
          }
     }

     return (
          <main className="flex">
               <section className="flex flex-col gap-[40px] flex-1">
                    <h1>Criar Anúncio</h1>
                    <form onSubmit={createPost}>
                         <label htmlFor="">
                              <span>Título do anúncio</span>
                              <input type="text" placeholder="Titulo" maxLength={100} onChange={(e) => setTitle(e.target.value)} />
                              <span className="text-[8pt] text-gray-500">{title.length}/100</span>
                         </label>
                         <label htmlFor="">
                              <span>Descrição do anúncio</span>
                              <textarea maxLength={500} onChange={(e) => setDesc(e.target.value)}></textarea>
                              <span className="text-[8pt] text-gray-500">{desc.length}/500</span>
                         </label>
                         <label htmlFor="">
                              <span>Imagens</span>
                              <input type="file" multiple onChange={(e) => setFiles(e.target.files)} accept="image/*"/>
                         </label>

                         <label htmlFor="">
                              <span>Tipo: </span>
                              <select onChange={(e) => setItype(e.target.value)}>
                                   <option value="">Selecione um tipo</option>
                                   <option value="tool">Ferramenta</option>
                                   <option value="vehicle">Veículo</option>
                                   <option value="building">Imóvel</option>
                                   <option value="other">Outro</option>
                              </select>
                         </label>
                         
                         <span className="mt-[30px] text-[10pt] text-gray-500">*O número de contato fornecido na criação da conta será divulgado neste post</span>

                         <ActionButton text="Criar Post" className="mt-[30px]" isLoading={isLoading} />
                    </form>
               </section>
          </main>
     )
}

export default CreatePost