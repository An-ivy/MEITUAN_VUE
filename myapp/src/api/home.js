import request from '@/utils/request'
export function getCategroy(data){
    return request({
        url:'tender/test/get_type',
        data
    })
}
export function getStar(data){
    return request({
        url:'tender/test/get_store',
        data
    })
}
export function getStoreByID(data){
    return request({
        url:'tender/test/get_store_id',
        data
    })
}