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

const arrayTodos = [];

function saveTodos(){
    localStorage.setItem(willDo,JSON.stringify(arrayTodos));
}

function plusList(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    const span = document.createElement("span");
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