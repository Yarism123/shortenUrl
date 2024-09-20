import {validatePostPassword} from "../utils.js";

document.addEventListener('DOMContentLoaded',function (){
    setupPostModify();
});

function setupPostModify() {
    const form = document.querySelector('#postModifyPasswordCheckForm');
    const postPasswordInput = document.querySelector('#postPasswordInput');

    if (form && postPasswordInput) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            const postPassword = postPasswordInput.value;
            const postId = window.location.pathname.split("/").pop();

            console.log(`password = ${postPassword} postId = ${postId}`);
            try {
                const isValid = await validatePostPassword(postId, postPassword);
                console.log("2");
                if (isValid) {
                    await setupPostForm(postId);
                } else {
                    alert("비밀번호가 일치하지 않습니다.");
                }
            } catch (error) {
                console.error("비밀번호 검증 중 오류 발생:", error);
                alert("비밀번호 검증 중 오류가 발생했습니다.");
            }
        });
    } else {
        console.error("폼 요소를 찾을 수 없습니다.");
    }
}


async function setupPostForm(postId) {
    const requestUrl = `/post/modify?postId=${postId}`;

        /*
    * [PostModifyResponse]
    * private String title;
    private String author;
    private Long postId;
    private String body;
    * **/

    try {
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 성공 로직
        if (response.status === 200) {
            const postData = await response.json(); // JSON 형태로 변환

            // 로직
            document.querySelector('#title').value = postData.title;
            document.querySelector('#author').value = postData.author;
            document.querySelector('#body').value = postData.body;
            document.querySelector('#password').value = '';

            document.getElementById('passwordContainer').style.display = 'none';
            document.getElementById('postFormContainer').style.display = 'block';
        } else {
            throw new Error("Have error"); // 에러 발생
        }
    } catch (error) {
        alert(error);
    }
}
