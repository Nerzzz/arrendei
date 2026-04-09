import { useState } from 'react'

import ActionButton from './ActionButton'
import DeleteButton from './DeleteButton'

import { feedbackToast } from '../utils/feedbackToast.js'

function EditPostWindow({data, onUpdate, onClose}) {   
     
     const [title, setTitle] = useState(data.post.title)
     const [desc, setDesc] = useState(data.post.desc)
     const [type, setType] = useState(data.post.type)
     const [isRent, setIsRent] = useState(data.post.isRent)

     const [sendingEdit, setSendingEdit] = useState(false)

     async function editHandler(e){
          e.preventDefault()

          if(title == "") return feedbackToast("Preencha o campo de título!", false)
          if(desc == "") return feedbackToast("Informe uma descrição para o item!", false)
          
          setSendingEdit(true)
          try{

               const res = await fetch(`http://localhost:10000/posts/${data._id}`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                         title,
                         desc,
                         type,
                         isRent
                    })
               })

               if(res.ok){
                    feedbackToast("Anúncio atualizado com sucesso!", true)
                    onClose()
                    onUpdate()
               }
          } catch(err){
               feedbackToast(`Não foi possivel atualizar: ${err}`, false)
               setSendingEdit(false)
          }
     }

     return (
          <div className='bg-white p-[20px] rounded-[10px] flex-1 h-full flex flex-col gap-[20px]'>
               <h2>Editar Anúncio</h2>
               <form onSubmit={editHandler} className='h-full'>
                    <div className='overflow-y-auto flex flex-col gap-[20px]'>
                         <label htmlFor="">
                              <span>Título</span>
                              <input type="text" maxLength={100} value={title} placeholder='Título' onChange={(e) => setTitle(e.target.value)} />
                              <span className="text-[8pt] text-gray-500">{title.length}/100</span>
                         </label>
                         <label htmlFor="">
                              <span>Descrição</span>
                              <textarea onChange={(e) => setDesc(e.target.value)} maxLength={500} value={desc} placeholder='Título' id="" />
                              <span className="text-[8pt] text-gray-500">{desc.length}/500</span>
                         </label>
                         <label htmlFor="">
                              <span>Tipo: </span>
                              <select value={type} onChange={(e) => setType(e.target.value)}>
                                   <option value="tool">Ferramenta</option>
                                   <option value="vehicle">Veículo</option>
                                   <option value="other">Outro</option>
                              </select>
                         </label>
                         <label htmlFor="" className='flex gap-[5px] items-center'>
                              <input type="checkbox" className='w-[20px] h-[20px] accent-accent' checked={isRent} onChange={(e) => setIsRent(e.target.checked)} />
                              <span>Foi alugado</span>
                         </label>
                    </div>
                    <nav className='flex justify-between mb-0 mt-auto'>
                         <div className='flex gap-[10px]'>
                              <ActionButton text="Salvar" isLoading={sendingEdit} />
                              <button onClick={onClose} className='p-[10px] bg-gray-200 rounded-[10px] cursor-pointer'>Cancelar</button>
                         </div>
                         <DeleteButton text={"Deletar"} />
                    </nav>
               </form>
          </div>
     )
}

export default EditPostWindow