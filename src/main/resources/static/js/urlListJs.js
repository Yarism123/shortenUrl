/**
 * private String originalUrl;
 * private String shortUrl;
 * private int callCount;
 * private LocalDateTime createdTime;
 * */

function getUrlList(){
    const requestUrl = `/getUrlList`;

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
        .then(urlList => {
            const tbodyDom = document.querySelector('tbody');
            tbodyDom.innerHTML = ''; //기존 내용을 초기화

            urlList.forEach(urlInfo => {
                const row = document.createElement('tr');
                const currentUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                const createdDate = new Date(urlInfo.createdTime);
                const formattedDate = `${createdDate.getFullYear()}/${String(createdDate.getMonth() + 1).padStart(2, '0')}/${String(createdDate.getDate()).padStart(2, '0')}`;


                row.innerHTML = `
                    <th scope="row">${urlInfo.id}</th>
                    <td><a href="${urlInfo.originalUrl}" target="_blank" style="text-decoration: none">${urlInfo.originalUrl}</a></td>
                    <td><a href="${currentUrl}/${urlInfo.shortUrl}" target="_blank" style="text-decoration: none">${currentUrl}/${urlInfo.shortUrl}</a></td>
                    <td>${formattedDate}</td>
                    <td>${urlInfo.callCount + '회'}</td>`;
                row.classList.add('table-success');

                tbodyDom.appendChild(row);
            })

        })
        .catch(error =>{
            alert(error);
        });
}

window.onload = getUrlList;