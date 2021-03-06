const form=document.querySelector(".js-form");
const input=form.querySelector("input");
const greeting=document.querySelector(".js-greetings");
const USER_LS="currentUser",SHOWING_CN="showing";


function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN)
    greeting.classList.add(SHOWING_CN);
    greeting.innerText=`Hello ${text}`;
}

function handleSubmit(event){
    event.preventDefault();
    //form에 엔터했을때 새로 고침되는거 막음
    const currentVal=input.value;
    paintGreeting(currentVal);
    saveName(currentVal);
}


function askForName(){
   form.classList.add(SHOWING_CN);
   form.addEventListener("submit",handleSubmit);
}



function loadName(){
    const currentUser=localStorage.getItem(USER_LS);
    if(currentUser===null ){
        askForName();
       
    }
    else{
        paintGreeting(currentUser);
        
    }
   
}

function init(){
    loadName();
}

init();