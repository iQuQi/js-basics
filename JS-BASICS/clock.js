const clockContainer=document.querySelector(".js-clock");
const clockTitle=clockContainer.querySelector("h1");

function getTime(){
    const date=new Date();
    const minutes=date.getMinutes();
    const hours=date.getHours();
    const seconds=date.getSeconds();
    clockTitle.innerText=`${hours<10?`0${hours}`:hours}:${
        minutes<10?`0${minutes}`:minutes}:${
        seconds<10?`0${seconds}`:seconds}`;
        //0-9의 숫자는 앞에 0하나 붙여서 나오게 삼항연산자 활용
    
}

function init(){
    getTime();
    setInterval(getTime,1000);//매초 마다 다시 시간을 받아오게 함
} 

init();