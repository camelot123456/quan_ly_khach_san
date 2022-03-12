import axios from 'axios'

import {ACCESS_TOKEN} from '../constants'

export const httpCommon = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        return axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
    } 
    return axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const httpFormDataCommon = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        return axios.create({
            headers: {
                'Accept': 'multipart/form-data, application/json',
                'Content-Type': 'multipart/form-data, application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
    } 
    return axios.create({
        headers: {
            'Accept': 'multipart/form-data, application/json',
                'Content-Type': 'multipart/form-data, application/json'
        }
    })
}
