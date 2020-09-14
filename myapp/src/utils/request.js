import axios from 'axios';
const BASE_URL='http://admin.gxxmglzx.com/';
export default function ({
    url,
    data
}) {
    return new Promise(resolve => {
        axios.get(BASE_URL + url, {
            params: data
        }).then(res => {
            console.log('request.js',res)
            if (res.data.errcode === 200) {
                resolve(res.data.data)
            }else{
                console.log('request',res.errmsg)
            }
        }).catch(err=>{
            console.log(err)
        })
    })

}