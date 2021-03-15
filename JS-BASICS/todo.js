

const toDoForm=document.querySelector(".js-toDoForm");
const toDoInput=toDoForm.querySelector("input");
const toDoList=document.querySelector(".js-toDoList");
const TODOS_LS="toDos";

let toDos=[];

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    //local 저장소에 string으로 다저장 하려고 하므로 
    //string으로 변환해줘야함
    //이걸 안하면 storage에서 'object'로 보이고 내용이 안보임
    //json에 대해서는 다음에 배움
    //JSON=javascript object notion
}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);
        //가져온것을 자바스크립트 obj로 변환
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        //각각에 대해 paintToDo 함수가 실행됨
        //foreach 랑 filter 잘 기억해 두기

    }
}

function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
      });
    //foreach에서 함수를 실행하는 것 같이 
    //array 의 모든 아이템을 통해 함수를 실행
    //true 인 아이템만 모아서 새로운 array를 만든다
    toDos=cleanToDos;
    //이렇게 하려면 toDos가 const이면 안되고 let
    //이어야 함
    saveToDos();
}

function paintToDo(text){

    const li=document.createElement("li");
    const delBtn=document.createElement("button");
    const span=document.createElement("span");
    delBtn.innerText="✖";//윈도우키+세미콜론 하면 이모지 사용 가능
    delBtn.addEventListener("click",deleteToDo);
    delBtn.classList.add("del_btn");
    const newId=toDos.length+1;
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id=newId;

    toDoList.appendChild(li);
    const toDoObj={
        text:text,
        id: toDos.length+1
    };
    toDos.push(toDoObj);
    saveToDos();
     
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}

function init(){

    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();