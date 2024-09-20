import {validatePostPassword} from "../utils.js";

export default function setupPostDelete() {
    document.addEventListener('DOMContentLoaded',function (){
        document.querySelector('#postDeleteForm').addEventListener('submit', async function (event) {
            event.preventDefault();
            const postPassword = document.querySelector('#postPasswordInput').value;
            const postId = document.querySelector('#post-div').getAttribute('data-postId');

            // validateCommentPassword 함수를 비동기적으로 호출
            const isValid = await validatePostPassword(postId, postPassword);

            if (isValid) {
                alert("게시글이 삭제되었습니다.");
                window.location.href = "/postList";
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        });
    });
}
