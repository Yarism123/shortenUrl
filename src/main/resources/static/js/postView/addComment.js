/*
* 댓글 등록 동작
*  **/

/**
 * InputData: CommentEntityResponse
 * */

export default function setupCommentForm() {
    document.addEventListener('DOMContentLoaded',function (){
        const commentForm = document.querySelector('#commentForm');
        commentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            addComment();
        });
    });
}

//댓글 추가
function addComment() {
    const author = document.querySelector('#comment-author').value;
    const password = document.querySelector('#comment-password').value;
    const body = document.querySelector('#comment-body').value;
    const postId = document.querySelector('#post-div').getAttribute('data-postId');

    const requestObject = {author: author, password: password, body: body, postId: postId};

    fetch('/addComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
    })
        .then(response => {
            //성공로직
            if (response.status == 200) {
                window.location.href = '/post/' + postId; // 게시글 목록 페이지로 이동
            } else {
                throw new Error("게시글 등록 실패"); // 에러 발생
            }
        })
        .catch(error => {
            console.log(error);
        });
}