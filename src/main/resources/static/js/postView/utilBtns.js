/*
[ 버튼 동작 ]
* 1.추천(완료)
* 2.비추천(완료)
* 3.돌아가기 (완료)
* 4.수정
* **/
export default function setupUtilBtn(){
    document.addEventListener('DOMContentLoaded',function (){
        //1.추천
        document.querySelector('#likeBtn').addEventListener('click',function (event){
            event.preventDefault();
            SetupVoteBtn('LIKE');
        });
        //2.비추천
        document.querySelector('#dislikeBtn').addEventListener('click',function (event){
            event.preventDefault();
            SetupVoteBtn('DISLIKE');
        });
        //3.돌아가기
        document.querySelector('#backBtn').addEventListener('click',function (event){
            event.preventDefault();
            SetupBackBtn();
        });

        document.querySelector('#modifyBtn').addEventListener('click',function (event){
            event.preventDefault();
            SetupModifyBtn();
        });
    });
}

function SetupModifyBtn() {
    const postId = document.querySelector('#post-div').getAttribute('data-postId');
    window.location.href = `/post/modify/${postId}`;
}

function SetupVoteBtn(voteType){

    /*
    private Long postId;
    private VoteType voteType;
    * **/
    const requestUrl = '/post/recommend';
    const postId = document.querySelector('#post-div').getAttribute('data-postId');
    const requestObject = {postId: postId,voteType:voteType};

    fetch(requestUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(requestObject)
    })
        .then(response => {
            if(response.status == 200){
                return response.json();
            } else{
                throw new Error("error"); // 에러 발생
            }
        })
        .then(data => {
            /*  [ data ]
            * private Long upVotes;
              private Long dislikeVotes;
              * **/
            document.querySelector('#upVotesTv').innerHTML = data.upVotes;
            document.querySelector('#dislikeVotesTv').innerHTML = data.dislikeVotes;
        })
        .catch(error =>{
            alert(error);
        });
}

function SetupBackBtn(){
    const previousUrl = document.referrer;
    if (previousUrl) {
        window.location.href = previousUrl;
    } else {
        window.location.href = window.location.protocol + '//'
            + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/postList';
    }
}