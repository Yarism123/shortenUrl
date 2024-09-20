import {showAlert} from "./utils.js";

//1.폼제출
document.querySelector('#postForm').addEventListener('submit',function (event){
    event.preventDefault(); //기본제출 동작 방지
    addPost();
});

function addPost(){
    const author = document.querySelector('#author').value;
    const password = document.querySelector('#password').value;
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const requestObject = {author:author,password:password, title:title,body:body};

    fetch('/addPost',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(requestObject)
    })
        .then(response => {
            //성공로직
            if(response.status == 200){
                window.location.href = '/postList'; // 게시글 목록 페이지로 이동
            } else{
                throw new Error("게시글 등록 실패"); // 에러 발생
            }
        })
        .catch(error =>{
            showAlert(false,error);
        });
}

