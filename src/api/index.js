import axios from 'axios'

export function loginAPI(username, password) {
    return axios({
        url: "/api/login",
        method: 'get',
        params: {
            username: username,
            password: password
        }
    })
}

export function autoLoginAPI() {
    return axios({
        url: "/api/autologin",
        method: 'get',
    })
}


export function channelAPI() {
    return axios({
        url: "/api/channel",
        method: 'get',
    })
}

export function articleAPI(id, page) {
    return axios({
        url: "/api/article",
        method: 'get',
        params: {
            channelId: id,
            page: page
        }
    })
}

export function allChannelAPI() {
    return axios({
        url: "/api/allchannel",
        method: 'get',
    })
}

export function userchannelAPI() {
    return axios({
        url: "/api/userchannel",
        method: 'get',
    })
}

export function outloginAPI() {
    return axios({
        url: "/api/outlogin",
        method: 'get',
    })
}

export function changeChannelAPI(channel) {
    return axios({
        url: "/api/changeChannel",
        method: 'post',
        data: {
            channel: channel
        }
    })
}

export function searchwordAPI(word) {
    return axios({
        url: "/api/searchword",
        method: 'get',
        params: {
            word: word
        }
    })
}

export function searchAPI(keyword) {
    return axios({
        url: "/api/search",
        method: 'get',
        params: {
            keyword: keyword
        }
    })
}

export function getarticleAPI(id) {
    return axios({
        url: "/api/getarticle",
        method: 'get',
        params: {
            id: id
        }
    })
}


export function quxiaoDZAPI(id) {
    return axios({
        url: "/api/quxiaoDZ",
        method: 'get',
        params: {
            id: id
        }
    })
}

export function tianjiaDZAPI(id) {
    return axios({
        url: "/api/tianjiaDZ",
        method: 'get',
        params: {
            id: id
        }
    })
}

export function quxiaoGZAPI(name) {
    return axios({
        url: "/api/quxiaoGZ",
        method: 'get',
        params: {
            name: name
        }
    })
}

export function tianjiaGZAPI(name) {
    return axios({
        url: "/api/tianjiaGZ",
        method: 'get',
        params: {
            name: name
        }
    })
}

export function commentAPI(tem) {
    return axios({
        url: "/api/insertcomment",
        method: 'get',
        params: {
            data:tem
        }
    })
}

export function userAPI() {
    return axios({
        url: "/api/user",
        method: 'get',
    })
}

export function usernameAPI(name) {
    return axios({
        url: "/api/username",
        method: 'post',
        data:{
            name:name
        }
    })
}

export function userimgAPI(data) {
    return axios({
        url: "/api/userimg",
        method: 'post',
        data,
    })
}