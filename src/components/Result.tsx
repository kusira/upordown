export default function Start({ setScene, timer }: { setScene: any, timer: number}){
  let m: string = ( '00' + Math.floor((timer/1000)/60) ).slice( -2 );
  let s: string = ( '00' + Math.floor(timer/1000)%60 ).slice( -2 );
  let ms: string = ( '00' + Math.floor(timer/10)%100 ).slice( -2 );

  return (
    <div className='w-full h-full relative'>
      <div className='inset-2/4 absolute w-max h-max translate-center'>
        <h2 className='text-4xl font-bold text-center'>タイム: {m}:{s}:{ms}</h2>
        <div 
          className='w-max mt-12 mx-auto p-4 bg-yellow-300 rounded-lg shadow-lg hover:opacity-80 duration-300 cursor-pointer'
          onClick={() => setScene(0)}
        >
          <p className="select-none">最初から</p>
        </div>
      </div>
    </div>

  )
}



