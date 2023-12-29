export default function Start({ setScene }: { setScene: any }){
  return (
    <div className='w-full h-full relative'>
      <div className='inset-2/4 absolute w-max h-max translate-center'>
        <h2 className='text-4xl font-bold text-center'>Up or Down</h2>
        <div 
          className='w-max mt-12 mx-auto p-4 bg-pink-300 rounded-lg shadow-lg hover:opacity-80 duration-300 cursor-pointer'
          onClick={() => setScene(1)}
        >
          <p>スタート</p>
        </div>
      </div>
    </div>

  )
}

