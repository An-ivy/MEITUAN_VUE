import request from '@/utils/request'

//获取商品列表
export function getProdByID(data){
    return request({
        url:'tender/test/get_nav',
        data
    })
}