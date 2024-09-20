export function showAlert(isCheck,message){
    const bodyDom = document.querySelector('body');
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'mx-auto', 'w-25', 'mt-2');
    alertDiv.innerHTML = message;

    if(isCheck){
        alertDiv.classList.add('alert-success');
    } else{
        alertDiv.classList.add('alert-danger');
    }
    bodyDom.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

export async function validatePostPassword(id, password) {
    /*  [PostPasswordCheckRequest]
    *   private Long id;
        private String password;
    * **/
    const requestObject = { id: id, password: password };
    const requestUrl = `/post/passwordCheck`;
    try {
        const response = await fetch(requestUrl, {
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