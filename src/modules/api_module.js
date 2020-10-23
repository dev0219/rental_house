const axios = require('axios')
const BASE_URL = 'http://porter-1.nchill.xyz/';

async function getdata(endpoint) {
  var res = await axios({
    method: 'get',
    url: `${BASE_URL}${endpoint}`,
  });
    var getresult = res.data;
    return getresult;  
}

async function postdata( endpoint,params) {
  var res = await axios({
    method: 'post',
    url: `${BASE_URL}${endpoint}`,
    data: params,
  });
    var postresult = res.data;
    return postresult;  
}

async function get_parmadata( endpoint,params) {
  var res = await axios({
    method: 'get',
    url: `${BASE_URL}${endpoint}`,
    params: params,
  });
    var postresult = res.data;
    return postresult;  
}
export {getdata, postdata,get_parmadata};
