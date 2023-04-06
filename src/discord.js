/**
 * 
 * @param {string} passwd 
 * @returns {Promise<number>}
 */
export const sendMessage = (passwd, isTest = false) => fetch(process.env.URL ?? '', {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        username: `Wifi 알리미`,
        avatar_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/WIFI_icon.svg/1024px-WIFI_icon.svg.png",
        content: `이번주 Wifi 비밀번호 : ${passwd}${isTest ? ' (테스트 중이므로 이 메세지는 무시해도 됩니다.)' : ''}`,
    })
}).then(v => {
    return v.status;
});