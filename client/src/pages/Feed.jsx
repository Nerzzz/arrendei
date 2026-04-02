import Hero from '../components/Hero'

function Feed() {
  return (
    <main  className='flex flex-col gap-[40px]'>
        <Hero />
        <section>
            <h2>Anúncios</h2>
            <div className='flex gap-3.5 flex-wrap mt-[30px]'>
                
            </div>
        </section>
    </main>
  )
}

export default Feed