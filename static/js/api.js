import axios from 'axios';

export function post(path, params) {
    return axios.post(path, params)
}

export function get(path) {
    return axios.get(path)
}