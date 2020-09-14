import request from '@/utils/request'
export function getComment(data){
    return request({
        url:'tender/test/get_info',
        data
    })
}