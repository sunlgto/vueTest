/**
 * example-api
 */

import axios from '../axios';
export default {
  // get
  userLogin(params) {return axios.get("/api/user/login", {params: params});},
  // post
  postExample(params) {return axios.post(`/example/exampleAPI`, params);}
}
