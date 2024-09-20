let currentCommentId = null;

export default function setupCommentDelete() {
    document.addEventListener('DOMContentLoaded',function () {
        document.querySelector('#commentDeleteForm').addEventListener('submit', async function (event) {
            event.preventDefault();
            const commentPassword = document.querySelector('#commentPasswordInput').value;

            // validateCommentPassword 함수를 비동기적으로 호출
            const isValid = await validateCommentPassword(currentCommentId, commentPassword);

            if (isValid) {
                alert("댓글이 삭제되었습니다.");
                window.location.reload(); // 페이지 새로 고침
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        });

        // [지우기] 버튼 클릭 시 currentCommentId 정보 갱신
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('delete-button')) {
                currentCommentId = e.target.getAttribute('data-comment-id'); // 댓글 ID 저장
            }
        });
    });
}

async function validateCommentPassword(id, password) {
    const requestObject = { id: id, password: password };

    try {
        const response = await fetch('/comment/deleteComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObject)
        });

        // 성공 로직
        return response.status === 200; // true 또는 false 반환
    } catch (error) {
        console.error('오류 발생:', error);
        return false;
    }
}
