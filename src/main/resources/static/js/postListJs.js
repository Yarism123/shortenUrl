/**
 *     private Long id;
 *     private String title;
 *     private String author;
 *     private Long viewCount;
 *     private Long upVotes;
 *     private LocalDateTime createdDate;
 * */

function getPostList(){
    const requestUrl = `/getPostList`;

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
                throw new Error("Have error"); // 에러 발생
            }
        })
        .then(postList => {
            console.log(postList);
            const tbodyDom = document.querySelector('tbody');
            tbodyDom.innerHTML = ''; //기존 내용을 초기화

            postList.forEach(postInfo => {
                const row = document.createElement('tr');
                const createdDate = new Date(postInfo.createdDate);
                const formattedDate = `${createdDate.getFullYear()}/${String(createdDate.getMonth() + 1).padStart(2, '0')}/${String(createdDate.getDate()).padStart(2, '0')}`;

                row.innerHTML = `
                    <th scope="row">${postInfo.id}</th>
                    <td>
                        <a href="/post/${postInfo.id}" style="text-decoration: none">${postInfo.title}</a>
                    </td>
                    <td scope="row">${postInfo.author}</td>
                    <td scope="row">${formattedDate}</td>
                    <td scope="row">${postInfo.viewCount}</td>
                    <td scope="row">${postInfo.upVotes}</td>
                    `;

                tbodyDom.appendChild(row);
            });

        })
        .catch(error =>{
            alert(error);
        });
}

window.onload = getPostList;