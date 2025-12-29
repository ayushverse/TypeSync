import texts from "./text.js";

export function randomText(){
    const i = Math.floor(Math.random() * texts.length);
    return texts[i];
}