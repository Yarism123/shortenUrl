import {showAlert} from "./utils.js";

//1.폼제출
document.querySelector('#urlForm').addEventListener('submit',function (event){
    event.preventDefault(); //기본제출 동작 방지
    addUrl();
});

//2.복사버튼
document.querySelector('#button-addon2').addEventListener('click',copyInput);

function addUrl(){
    const originalUrl =document.querySelector('#originalUrl').value;
    const requestObject = { originalUrl: originalUrl};

    fetch('/createUrl',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(requestObject)
    })
        .then(response => {
            //성공로직
            if(response.status == 200){
                showAlert(true,"단축 URL 생성 완료!");
                return response.json();
            } else{
                throw new Error("단축 URL 생성 실패"); // 에러 발생
            }
        })
        .then(data => {
            const currentUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            const shortenUrlDom = document.querySelector('#shortenUrl');
            shortenUrlDom.value = currentUrl + '/' + data.shortenUrl;
        })
        .catch(error =>{
            showAlert(false,error);
        });

    return false;
}

function copyInput(){
    const inputFieldDom = document.querySelector('#shortenUrl')

    // 입력 필드가 비활성화 상태이므로, 활성화 후 값을 복사
    inputFieldDom.disabled = false; // 비활성화된 필드를 활성화
    inputFieldDom.select(); // 입력 필드의 내용을 선택
    inputFieldDom.setSelectionRange(0, 99999); // 모바일 기기에서 선택 범위 설정

    // 클립보드에 복사
    navigator.clipboard.writeText(inputFieldDom.value)
        .then(() => {
            alert('복사 완료: ' + inputFieldDom.value); // 복사 성공 메시지
        })
        .catch(err => {
            alert('복사 실패: ', err); // 복사 실패 메시지
        });

    inputFieldDom.disabled = true; // 다시 비활성화
}

