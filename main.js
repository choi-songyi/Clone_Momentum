// get time
const clock = document.querySelector('.clock');

function getTime(){
    const date = new Date();
    const minute = date.getMinutes();
    const hour = date.getHours();
    const second = date.getSeconds();
    clock.innerText =`${hour < 10 ? `0${hour}`: hour}:${minute < 10 ? `0${minute}`: minute}:${second < 10 ? `0${second}`: second}`
}

function TimeLoad(){
    getTime();
    setInterval(getTime,1000);
}

TimeLoad();

// name 
const form = document.querySelector('#name-form');
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

// to do list
const listForm = document.querySelector("#list-form");
const listInput = document.querySelector(".list");
const list = document.querySelector(".list-box");

const willDo = 'I will do';

let arrayTodos = [];


function deleteTodo(event){
    const btn = event.target;
    const parentOfBtn = btn.parentNode;

    list.removeChild(parentOfBtn);
    const cleanToDos=arrayTodos.filter(function(toDo){
        return toDo.id !== parseInt(parentOfBtn.id);
    });
    arrayTodos = cleanToDos;
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(willDo,JSON.stringify(arrayTodos));
}

function plusList(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    const span = document.createElement("span");
    delBtn.addEventListener("click",deleteTodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = arrayTodos.length+1;
    list.appendChild(li);
    const toDoObj ={
        text:text,
        id:arrayTodos.length+1
    };
    arrayTodos.push(toDoObj);
    saveTodos();
}

function handleSubmit2(event){
    event.preventDefault();
    const listByText = listInput.value;
    plusList(listByText);
   listInput.value = "";
}

function loadToDoList(){
    const toDos = localStorage.getItem(willDo);
    if(toDos !==null){
        const parsedTodos = JSON.parse(toDos);
        parsedTodos.forEach(function(toDo){
            plusList(toDo.text);
        });
    };
}

function addToList(){
    loadToDoList();
    listForm.addEventListener('submit',handleSubmit2);
}

addToList();

// background
const body = document.querySelector("body");
const IMG_NUMBER = 5;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `./images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function loadImage(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

loadImage();

// get weather
const weather = document.querySelector(".weather");
const API_KEY = "975f00100e01d41d32c159dd2867c783";
const COORDS = 'coords';

function getWeather(lat,log){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&APPID=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText =`${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("Can't access geo location")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude,parsedCoords.longitude);
    };
}

function loadWeather(){
    loadCoords();
}

loadWeather();