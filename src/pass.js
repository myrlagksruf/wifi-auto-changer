import { spawn } from 'child_process';

let user = process.env.USER;
let pass = process.env.PASS;

/**
 * 
 * @param {string} passwd 
 * @returns {Promise<boolean>}
 */
export const changePass = async (passwd) => {
    /**
     * 
     * @param {string[]} command 
     */
    let fetchAlter = (command) => new Promise(res => {
        let ls = spawn(`curl`, command);
        /** @type {Buffer[]} */
        let bufArr = [];

        ls.stdout.on('data', data => {
            bufArr.push(data);
        });

        ls.on('close', async (code) => {
            let buf = Buffer.concat(bufArr);
            let str = buf.toString('utf-8');
            res(str);
        });
    });

    try {
        let str = await fetchAlter([
            "http://192.168.0.1/sess-bin/login_handler.cgi",
            "-H", 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            "-H", 'Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            "-H", 'Cache-Control: max-age=0',
            "-H", 'Connection: keep-alive',
            "-H", 'Content-Type: application/x-www-form-urlencoded',
            "-H", 'Origin: http://192.168.0.1',
            "-H", 'Referer: http://192.168.0.1/sess-bin/login_session.cgi?noauto=1',
            "-H", 'Upgrade-Insecure-Requests: 1',
            "-H", 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            "--data-raw", `init_status=1&captcha_on=0&captcha_file=&username=${user}&passwd=${pass}&default_passwd=%EC%B4%88%EA%B8%B0%EC%95%94%ED%98%B8%3Aadmin%28%EB%B3%80%EA%B2%BD%ED%95%84%EC%9A%94%29&captcha_code=`,
            "--compressed", "--insecure"
        ]);
        let ind = str.indexOf("setCookie('") + 11;
        let cookie = `efm_session_id=${str.slice(ind, ind + 16)}`;
        // let passwd = 'testtest1234';
        let res = await fetchAlter([
            'http://192.168.0.1/cgi/timepro.cgi',
            "-H", 'Accept: */*',
            "-H", 'Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            "-H", 'Connection: keep-alive',
            "-H", 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryOcKlYHAYjyJ8bglz',
            "-H", `Cookie: ${cookie}`,
            "-H", 'Origin: http://192.168.0.1',
            "-H", 'Referer: http://192.168.0.1/sess-bin/timepro.cgi?tmenu=easymeshconf&smenu=easymesh',
            "-H", 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            "--data-raw", `$'------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="tmenu"\r\n\r\niframe\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="smenu"\r\n\r\nset_wirelessconf_easymesh\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="simple_query"\r\n\r\nyes\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_main_enable"\r\n\r\n1\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_main_hidden"\r\n\r\n0\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_main_restricted"\r\n\r\n0\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_main_ssid"\r\n\r\nincoding\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_main_pass"\r\n\r\n${passwd}\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_guest_enable"\r\n\r\n0\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_guest_hidden"\r\n\r\n0\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_guest_restricted"\r\n\r\n0\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_guest_ssid"\r\n\r\n\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="all_guest_pass"\r\n\r\n\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz\r\nContent-Disposition: form-data; name="mode"\r\n\r\ncontroller\r\n------WebKitFormBoundaryOcKlYHAYjyJ8bglz--\r\n'`,
            "--compressed", "--insecure"
        ]);
        if (res === 'ok;') {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}