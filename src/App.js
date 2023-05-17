import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {

const [dice , setDice] = React.useState(allNewDice())
const [tenzies, setTenzies] = React.useState(false)


// Create a Timer
const [seconds , setSeconds] = React.useState(0)
const [minutes , setMinutes] = React.useState(0)
const [timerStart , setTimerStart] = React.useState(false)
const [timerStop , setTimerStop] = React.useState(false)

//React.useEffect(() => {
//let interValid = null;
//if(!tenzies){
//interValid = setInterval(() => {
//setTime(prevState => prevState += 1)
//} , 1000)
//}else {
//clearInterval(interValid)
//}
//},[tenzies])

// Timer Ends Here

    const dieElements = dice.map(die => {
        return <Die value = {die.value} key = {die.id} isHeld = {die.isHeld} holdDice={() => holdDice(die.id)}/>
    })
function allNewDice(){
const randArray = [];
for(let i = 0 ; i < 10 ; i++){
const randNum = createRandDie()
randArray.push(randNum)
}
return randArray
}

React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

function holdDice(id) {
        console.log(id)
             setDice(oldDice => oldDice.map(die => {
              return die.id === id ? {...die , isHeld : !die.isHeld} : die
              }))
    }

function rollDice() {
       if(!tenzies){
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : createRandDie()
        }))
    }else{
    setDice(allNewDice())
    setTenzies(false)
    }
    }

    function createRandDie(){
      return {value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
                }
    }

console.log(allNewDice())
    return (
        <main>
           {tenzies && <Confetti />}
           <h1 className="title">Tenzies</h1>
           <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
           <div className="timer">{minutes<10 ? `0${minutes}` : minutes }:{seconds<10 ? `0${seconds}` : seconds }</div>
            <div className="dice-container">
             {dieElements}
            </div>
       <button className="btnRoll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
       </main>
    )
}
