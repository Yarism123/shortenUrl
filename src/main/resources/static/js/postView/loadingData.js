/*
* 글,댓글 데이터 불러오기 동작
* **/
export default function loadingData(){
    document.addEventListener('DOMContentLoaded',function (){
        // URL에서 ID 추출
        const postId = window.location.pathname.split("/").pop(); // 예: /post/1 -> 1
        const requestUrl = `/postView/${postId}`

        fetch(requestUrl)
            .then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error("게시물을 가져오는데 실패했습니다.");
                }
            })
            .then(post => {
                document.querySelector('#post-div').setAttribute('data-postId',post.postId);
                document.querySelector('#titleTv').innerHTML = post.title;
                document.querySelector('#authorTv').innerHTML = post.author;
                document.querySelector('#bodyTv').innerHTML = post.body;
                document.querySelector('#upVotesTv').innerHTML = post.upVotes;
                document.querySelector('#dislikeVotesTv').innerHTML = post.dislikeVotes;
                document.title = post.title;

                post.comments.forEach(comment => {
                    const cardDom = document.createElement('div');
                    cardDom.classList.add('card');
                    cardDom.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${comment.author}</h5>
                        <p class="card-text">${comment.body}</p>
                        <p class="card-text"><small class="text-muted">${dateFormat(comment.createdDate)}</small></p>
                        <button class="btn btn-danger btn-sm delete-button" data-comment-id="${comment.id}" data-bs-toggle="modal" data-bs-target="#commentPasswordModal">지우기</button>
                    </div>
                    `;

                    document.querySelector('#cardListDiv').appendChild(cardDom);
                });

            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    });
}

function dateFormat(createdDate){
    const date = new Date(createdDate);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}
