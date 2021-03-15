
const COORDS="coords";
const API_KEY="1fcd820e0d467d13b4fcc8cad320fbdc";
const weather=document.querySelector(".js-weather");


function getWeather(lat, lng){
    fetch(

        //해당 사이트에서 날씨를 불러오는 방법은 노마드 코더 바닐라 js 영상참고
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature=json.main.temp;
            const place=json.name;
            weather.innerText=`${temperature} @ ${place}`;
        });
        
        //then으로 해주지 않으면
        //즉 이렇게 fetch를 기다리지 다음작업지시 시에
        //다음 작업은 fetch가 완료되길 기다리지 않을 거라
        //오류 발생

}

//현재 사용자의 위치 저장
function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}


//요청에 성공한 경우
function handleGeoSucces(position){
    //경도와 위도를 설정
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //데이터에 넣을 객체 생성
    const coordsObj ={
        latitude,//latitude:latitude, 와 같은 코드(같은 이름)
        longitude
    };

    //좌표를 저장하고 해당 좌표에 대한 날씨 정보를 가져옴
    saveCoords(coordsObj);
    getWeather(latitude,longitude);

}

//요청에 실패한 경우
function handleGeoError(position){
    console.log("can't access geo location");
}

//요청 성공 여부에 따른 핸들러 함수 호출
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

//좌표계+기온을 불러옴
function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }
    else{
        const parseCoords= JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();