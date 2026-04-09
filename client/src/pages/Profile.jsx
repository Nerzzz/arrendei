import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/authContext'
import { Navigate } from 'react-router-dom'

import { signOut, getAuth } from 'firebase/auth'

import { IconPencilCog, IconLoader2, IconLogout } from '@tabler/icons-react'

import PostsView from '../components/PostsView'

import { feedbackToast } from '../utils/feedbackToast'

function Profile() {
  const { user, loading } = useContext(AuthContext)

  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
    if(!user || loading) return

    fetch(`https://arrendei-630d.onrender.com/users/${user.uid}`)
    .then(res => res.json())
    .then(data => setUserData(data))
  },[!user])

  function logoutHandle(){
    const auth = getAuth()
    signOut(auth).then(() => {
      feedbackToast("Saiu da conta com sucesso", true)
      return <Navigate to={"/login"} />
    }).catch((err) => {
      feedbackToast(`Ocorreu um erro: ${err.message}`, false)
    })
  }

  return (
    <main className='flex justify-center items-center flex-1'>

      {userData && <section className='flex flex-col items-center justify-center flex-1 overflow-y-auto w-full'>

        <div className='flex lg:flex-row flex-col items-center justify-between bg-white md:px-[40px] md:py-[20px] p-[10px] rounded-[10px] shadow-[0_0_20px_rgba(10,10,10,0.1)] gap-[20px] w-full'>
          <div className='flex lg:gap-[40px] gap-[20px] items-center'>
            <img src={userData.image} alt="" className='lg:w-[150px] lg:h-[150px] h-[50px] w-[50px] object-cover rounded-full' />
            <div className='flex flex-col'>
              <span className='sm:text-[20pt] text-[12pt] font-medium'>{userData.username}</span>
              <span className='text-[10pt] sm:inline hidden text-gray-500'>{userData.email}</span>
            </div>
          </div>
          
          <div className='h-full flex sm:items-end items-center mt-0 gap-[10px] flex-col'>
            <button className='flex gap-[8px] cursor-pointer'>
              <IconPencilCog />
              <span>Editar Perfil</span>
            </button>
            <button onClick={logoutHandle} className='flex gap-[8px] cursor-pointer w-fit bg-transparent text-red-500'>
              <IconLogout />
              <span>Sair</span>
            </button>
          </div>
        </div>

        <PostsView endPoint={`/posts/user/${user.uid}`} />

      </section>}

      {!userData && <IconLoader2 size={40} className='animate-spin text-accent' />}

    </main>
  )
}

export default Profile