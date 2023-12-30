import { useState } from "react";

export default function Game({ setScene, timer, numberofQuesions ,problems ,answers }: { setScene: any, timer: number,numberofQuesions:number, problems:Array<string> ,answers:Array<number>}) {
  let m: string = ( '00' + Math.floor((timer/1000)/60) ).slice( -2 );
  let s: string = ( '00' + Math.floor(timer/1000)%60 ).slice( -2 );
  let ms: string = ( '00' + Math.floor(timer/10)%100 ).slice( -2 );

  const [leftNum, setLeftNum] = useState<number>(5);
  const [rightNum, setRightNum] = useState<number>(5);
  const [correctAnimation, setCorrectAnimation] = useState<number>(0);
  const [correctCnt, setCorrectCnt] = useState<number>(0);
  const [correctCntDelay, setCorrectCntDelay] = useState<number>(0);
  
  function sleep(msec: number) {
    return new Promise(function(resolve: any) {
      setTimeout(function() {resolve()}, msec);
    })
  }
  async function wait(){
    await sleep(100);
    setCorrectAnimation(0);
    setCorrectCntDelay((prev)=>prev+1);
    if(correctCnt == numberofQuesions-1){
      setScene(2);
    }
  }
  const judge = (leftNum: number, rightNum: number) => {
    const nowAns: number = answers[correctCnt];
    if(leftNum * 10 + rightNum == nowAns){
      setCorrectAnimation(1);
      setCorrectCnt((prev)=>prev+1);
      wait();
    }
  }

  const leftUpBtn = (): void => {
    if(leftNum != 9){
      setLeftNum((prev) => prev+1);
      judge(leftNum+1, rightNum);
    }
  }
  const leftDownBtn = (): void => {
    if(leftNum != 0){
      setLeftNum((prev) => prev-1);
      judge(leftNum-1, rightNum);
    }
  }
  const rightUpBtn = (): void => {
    if(rightNum != 9){
      setRightNum((prev) => prev+1);
      judge(leftNum, rightNum+1);
    }
  }
  const rightDownBtn = (): void => {
    if(rightNum != 0){
      setRightNum((prev) => prev-1);
      judge(leftNum, rightNum-1);
    }
  }

  return (
    <>
      <div className='w-full h-full relative'>
        {/* ステータス */}
        <div className="status absolute top-2 left-2">
          <p className="text-xl">{correctCnt} / {numberofQuesions}</p>
          <p className="text-xl">{m}:{s}:{ms}</p>
        </div>
        <div className='inset-2/4 absolute w-max h-max translate-center game-ui'>
          {/* 問題 */}
          <div className={`mt-6 flex flex-col problem-wrapper ${correctAnimation==1 ? 'correct':''}`}>
            <p className="text-center">
              {correctCntDelay==0 ? "開始": `${problems[correctCntDelay-1]}${answers[correctCnt-1]}`}
            </p>
            <p className="text-center">
              {correctCntDelay == numberofQuesions ? "終了": problems[correctCntDelay]}
              {correctCnt != correctCntDelay ? answers[correctCnt-1] : ""}
            </p>
            <p className="text-center">
              {correctCntDelay==numberofQuesions-1 ? "終了": problems[correctCntDelay+1]}
            </p>
            <p className="text-center">
              {correctCntDelay==numberofQuesions-2 ? "終了": problems[correctCntDelay+2]}
              </p>
          </div> 
          {/* 回答 */}
          <div className='num-wrapper flex gap-4 mt-12 mx-auto'>
            <div className='num flex flex-col gap-2'>
              <div
                className={`cursor-pointer mx-auto up-btn ${leftNum!=9 ? 'active':''}`}
                onClick={leftUpBtn}
                ></div>
              <div className='display-num border-2 border-black mx-auto'>
                <p className='text-center text-6xl line-height'>{leftNum}</p>
              </div>
              <div
                className={`cursor-pointer mx-auto down-btn ${leftNum!=0 ? 'active':''}`}
                onClick={leftDownBtn}
              ></div>
            </div>

            <div className='num flex flex-col gap-2'>
              <div
                className={`cursor-pointer mx-auto up-btn ${rightNum!=9 ? 'active':''}`}
                onClick={rightUpBtn}
              ></div>
              <div className='display-num border-2 border-black mx-auto'>
                <p className='text-center text-6xl line-height'>{rightNum}</p>
              </div>
              <div
                className={`cursor-pointer mx-auto down-btn ${rightNum!=0 ? 'active':''}`}
                onClick={rightDownBtn}
            ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


