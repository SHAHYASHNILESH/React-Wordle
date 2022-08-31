import React, { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]); // each guess is an array
  const [history, setHistory] = useState(['hello', 'ninja']); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    //console.log('Formatting the guess - ',currentGuess);
    let solutionArray=[...solution];
    let formatedGuess=[...currentGuess].map((l)=>{
       return {key:l,color:'grey'}
    });
    formatedGuess.forEach((l,i)=>{
        if(solutionArray[i] === l.key){
            formatedGuess[i].color='green';
            solutionArray[i]=null;
        }
    })
    formatedGuess.forEach((l,i)=>{
        if(solutionArray.includes(l.key) && l.color!=='green'){
            formatedGuess[i].color='yellow';
            solutionArray[solutionArray.indexOf(l.key)]=null;
        }
    })
    return formatedGuess
  };
  const addNewGuess = () => {};

  const handleKeyup = ({ key }) => {
    //console.log(key);
    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log("you used all your guesses!");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log('you already tried that word.')
        return
      }
      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars.')
        return
      }
      const formatted=formatGuess();
      console.log(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
