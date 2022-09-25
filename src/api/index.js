import axios from 'axios'

export function loginAPI(username, password){
    return axios({
        url:"/api/login",
        method:'get',
        params:{
            username:username,
            password:password
        }
    })
}

export function autoLoginAPI(){
    return axios({
        url:"/api/autologin",
        method:'get',
    })
}


export function channelAPI(){
    return axios({
        url:"/api/channel",
        method:'get',
    })
}

export function articleAPI(id,page){
    return axios({
        url:"/api/article",
        method:'get',
        params:{
            channelId:id,
            page:page
        }
    })
}

export function allChannelAPI(){
    return axios({
        url:"/api/allchannel",
        method:'get',
    })
}

export function userchannelAPI(){
    return axios({
        url:"/api/userchannel",
        method:'get',
    })
}

export function outloginAPI(){
    return axios({
        url:"/api/outlogin",
        method:'get',
    })
}