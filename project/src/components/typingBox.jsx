import {calculateWPM , calculateAccuracy} from "../utils/calculate.js";
import {randomText} from "../utils/textGenerator.js";
import {useState , useEffect} from "react";

import React from 'react';

function TypingBox() {

    const [text, setText] = useState(randomText());
    const [typed, setTyped] = useState("");
    const [time,setTime] = useState(0);
    const [started , setStarted] = useState(false);

    useEffect(() => {
        if(!started) return;

        const interval = setInterval(() => {
            setTime((t) => t+1);
        },1000);

        return () => clearInterval(interval);
    },[started]);

    const handleChange = (e) => {
        if(!started) setStarted(true);
        setTyped(e.target.value);
    };

    const restart = () => {
        setText(randomText());
        setTyped("");
        setTime(0);
        setStarted(false);
    };

    const correctChars = typed
        .split("")
        .filter((char,i)=> char === text[i]).length;
    const wpm = calculateWPM(typed.length,time);
    const accuracy = calculateAccuracy(correctChars,typed.length);


    return (

        <div></div>
    );
}

export default TypingBox;