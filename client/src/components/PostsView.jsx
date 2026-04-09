import { useState, useEffect } from 'react'

import Post from './Post'
import FullScreenPost from './FullScreenPost'

import { IconLoader2 } from '@tabler/icons-react'

function PostsView({endPoint}) {
     const [open, setOpen] = useState(false)
     const [posts, setPosts] = useState([])
     const [selectedPost, setSelectedPost] = useState(null)
     const [fething, setFething] = useState(true)

     function fetchPosts(){
         setPosts([])
     
         fetch(`https://arrendei-630d.onrender.com${endPoint}`)
         .then(res => res.json())
         .then(data => setPosts(data))

         setFething(false)
     }
     
     useEffect(() => {
          setOpen(false)
          fetchPosts()
     }, [])

     return (
          <div className='mt-[20px] flex flex-wrap gap-[20px] py-[20px] w-full h-full'>
               {posts && posts.map((post) => {
                    return <Post onOpen={() => {setSelectedPost(post); setOpen(true)}} key={post._id} userUid={post.userUid} id={post._id} title={post.post.title} isRent={post.post.isRent} imgs={post.post.images} />
               })}

               {open && <FullScreenPost onUpdate={fetchPosts} onClose={() => setOpen(false)} data={selectedPost}/>}
               {fething && <div className='flex h-100 flex-1 justify-center items-center'>
                    <IconLoader2 className="text-accent animate-spin" size={40} />
               </div>}
          </div>
     )
}

export default PostsView