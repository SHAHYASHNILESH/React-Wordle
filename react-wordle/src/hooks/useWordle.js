import React, { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    //console.log('Formatting the guess - ',currentGuess);
    let solutionArray = [...solution];
    let formatedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });
    formatedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formatedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });
    formatedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formatedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });
    return formatedGuess;
  };
  const addNewGuess = (formatedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formatedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formatedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });
    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    //console.log(key);
    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log("you used all your guesses!");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("you already tried that word.");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars.");
        return;
      }
      const formatted = formatGuess();
      //console.log(formatted);
      addNewGuess(formatted);
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

  return { turn, currentGuess, guesses, isCorrect,usedKeys, handleKeyup };
};

export default useWordle;
