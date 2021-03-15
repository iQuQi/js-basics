const body=document.querySelector("body");

const IMG_NUMBER=6;

function paintImage(imgNumber){
    const image= new Image();
    image.src=`images/${imgNumber+1}.jpg`;
    //string 형태로 넘겨주는거 잊지말기
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    //랜덤으로 숫자 뽑기
    const number=Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber=genRandom();
    paintImage(randomNumber);
}
 

init();