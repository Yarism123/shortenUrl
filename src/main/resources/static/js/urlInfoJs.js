import {showAlert} from "./utils.js";

document.querySelector('#urlInfoForm').addEventListener('submit',function (event){
   event.preventDefault();
   getUrlInfo();
});

function getUrlInfo(){
    const shortUrl = document.querySelector('#shortenUrl_input').value;
    const requestUrl = `/getUrlInfo?shortUrl=${encodeURIComponent(shortUrl)}`;

    fetch(requestUrl,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            //성공로직
            if(response.status == 200){
                return response.json();
            } else{
                throw new Error("해당 단축 URL이 존재하지 않습니다."); // 에러 발생
            }
        })
        .then(data => {
            const span_shortUrlDom = document.querySelector('#span_shortUrl');
            const span_originalUrlDom = document.querySelector('#span_originalUrl');
            const span_dateDom = document.querySelector('#span_date');
            const span_callCountDom = document.querySelector('#span_callCount');

            const createdDate = new Date(data.createdTime);
            const formattedDate = `${createdDate.getFullYear()}/${String(createdDate.getMonth() + 1).padStart(2, '0')}/${String(createdDate.getDate()).padStart(2, '0')}`;

            const currentUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            span_shortUrlDom.innerText = currentUrl + '/' + data.shortUrl;
            span_originalUrlDom.innerText = data.originalUrl;
            span_dateDom.innerText = formattedDate;
            span_callCountDom.innerText = data.callCount + '회';

        })
        .catch(error =>{
            showAlert(false,error);
        });

    //폼 제출 안되게 false 리턴
    return false;
}
