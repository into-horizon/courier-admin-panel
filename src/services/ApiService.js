import axios from 'axios';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import { endSession } from '../store/auth'
import { isJwtExpired } from 'jwt-check-expiration';
let api = process.env.REACT_APP_API;

export default class ApiService {

  async get(endpoint, params, headers) {
    let res = await axios({
      method: 'get',
      url: `${api}/${endpoint}`,
      params: params,
      headers: headers|| this.bearer(await this.token())
    })

    return res.data
  }
  async post(endpoint, data, header, params = null) {
    let res = await axios({
      method: 'post',
      url: `${api}/${endpoint}`,
      data: data,
      headers: header|| this.bearer(await this.token()),
      params: params,

    });
    return res.data
  }

  async update(endpoint, data, header, params = null) {
    let res = await axios({
      method: 'put',
      url: `${api}/${endpoint}`,
      params: params,
      data: data,
      headers: header|| this.bearer(await this.token())
    });
    return res.data
  }

  async delete(endpoint, data, header, params = null) {
    let res = await axios({
      method: 'delete',
      url: `${api}/${endpoint}`,
      data: data,
      params: params,
      headers: header|| this.bearer(await this.token())
    });
    return res.data
  }

  bearer(token) {
    return {session_id:cookie.load('session_id') , Authorization: ` Bearer ${token}` }
  }

  basic(data) {
    return { Authorization: ` Basic ${btoa(`${data.email}:${data.password}`)}` }
  }
  async token() {
    let token = cookie.load('access_token', { path: '/' })

    if (!token) return 
    else if (!isJwtExpired(token)) {
      return token
    }
    else {

      let { refresh_token, access_token, status, session_id } = await this.post('auth/refresh', null, this.bearer(cookie.load('refresh_token',{ path: '/' }) ))
      if (status === 200) {
        cookie.remove('access_token', { path: '/' })
        cookie.remove('refresh_token', { path: '/' })
        cookie.save('access_token', access_token, { path: '/' })
        cookie.save('refresh_token', refresh_token, { path: '/' })

        return access_token
      } else return 
    }
  }
  // token(){
  //   return 
  // }

}

