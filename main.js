// get time

const clock = document.querySelector('.clock');

function getTime(){
    const date = new Date();
    const minute = date.getMinutes();
    const hour = date.getHours();
    const second = date.getSeconds();
    clock.innerText =`${hour < 10 ? `0${hour}`: hour}:${minute < 10 ? `${minute}`: minute}:${second < 10 ? `0${second}`: second}`
}

function TimeLoad(){
    getTime();
    setInterval(getTime,1000);
}

TimeLoad();

// name 
const form = document.querySelector('#name-box');
const input = document.querySelector('.name');
const greeting = document.querySelector('.greeting');

const user = "Hi";

function saveName(text){
    localStorage.setItem(user,text);
}

function handleSubmit(event){
    event.preventDefault();
    const inputValue = input.value;
    sayHello(inputValue);
    saveName(inputValue);
}

function askName(){
    form.classList.add('show');
    form.addEventListener('submit',handleSubmit);
}

function sayHello(text){
    form.classList.remove('show');
    greeting.classList.add('show');
    greeting.innerText = `Hello ${text}!`
}

function getName(){
    const currentUser = localStorage.getItem(user);
    if(currentUser===null){
        askName();
    } else {
        sayHello(currentUser);
    };
}

function nameLoad(){
    getName();
}

nameLoad();
