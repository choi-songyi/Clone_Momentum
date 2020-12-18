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

