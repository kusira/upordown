import { useEffect, useState } from 'react';

import './App.css';

import Header from "./components/Header";
import Start from "./components/Start";
import Game from "./components/Game";
import Result from "./components/Result";
import Footer from "./components/Footer";

function App() {
  const [timer, setTimer] = useState<number>(0);
  const [scene, setScene] = useState<number>(0);
  const [problems, setProblems] = useState(Array<string>);
  const [answers, setAnswers] = useState(Array<number>);

  let additions: Array<Array<Array<number>>> = []
  let subtractions: Array<Array<Array<number>>> = []
  let multplications: Array<Array<Array<number>>> = []

  for (let i:number = 0; i < 100; i++) {
    let addition: Array<Array<number>>  = []
    for (let j:number = 0; j < i; j++) {
      addition.push([i-j,j])
    }
    
    let subtraction: Array<Array<number>>  = []
    for (let j:number = i; j < 100; j++) {
      subtraction.push([j,j-i])
    }
      
    let multplication: Array<Array<number>>  = []
    for (let j:number = 1; j*j < i+1; j++) {
      if(i%j==0){
        multplication.push([j,i/j])
        // 難易度調整(1は簡単だから確率を減らす)
        if(j!=1){
          multplication.push([i/j,j])
        }
      }
    }
    additions.push(addition)
    subtractions.push(subtraction)
    multplications.push(multplication)
  }
  const numberofQuesions: number = 10;
  let probs:Array<string> = []
  let anss:Array<number> = []

  let action:number = 0
  useEffect(()=>{
    if(action==0){
      let ans:number = 55;
      for (let i = 0; i < numberofQuesions; i++) {
        let nextAns:Array<number> = []
        if(ans%10!=0){
          nextAns.push(-1)
        }
        if(ans%10!=9){
          nextAns.push(1)
        }
        if(Math.floor(ans/10)!=0){
          nextAns.push(-10)
        }
        if(Math.floor(ans/10)!=9){
          nextAns.push(10)
        }
        ans += nextAns[Math.floor(Math.random()*nextAns.length)];
    
        let operation:number;
        if(ans==0){
          operation = Math.floor(Math.random()*2)+1
        }else{
          operation  = Math.floor(Math.random()*3)
        }
        
        let prob:string = "";
        if(operation==0){
          let idx:number = Math.floor(Math.random()*additions[ans].length)
          prob =(`${additions[ans][idx][0]}+${additions[ans][idx][1]}=`)
        }else if(operation==1){
          let idx:number = Math.floor(Math.random()*subtractions[ans].length)
          prob =(`${subtractions[ans][idx][0]}-${subtractions[ans][idx][1]}=`)
        }else if(operation==2){
          let idx:number = Math.floor(Math.random()*multplications[ans].length)
          prob =(`${multplications[ans][idx][0]}×${multplications[ans][idx][1]}=`)
        }
        probs.push(prob)
        anss.push(ans)
      }  
      action += 1;
      setProblems(probs)
      setAnswers(anss)
    }
  },[scene])

  useEffect(()=>{
    let startTime: number = Date.now();
    if(scene == 1){
      const interval = setInterval(() => {
        setTimer(Date.now()-startTime)
      }, 10);
      return () => clearInterval(interval);
    }
  },[scene]);

  return (
    <>
      <Header />
      <main className='mx-auto'>
        <div className='frame border-2 border-black mx-auto mt-10'>
          {scene==0 && <Start setScene={setScene}/>}
          {scene==1 && <Game setScene={setScene} timer={timer} numberofQuesions={numberofQuesions} problems={problems} answers={answers}/>}
          {scene==2 && <Result setScene={setScene} timer={timer}/>}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
