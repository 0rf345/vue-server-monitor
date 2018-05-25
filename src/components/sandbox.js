import axios from 'axios'
//  let jsonConf = require('../config/configuration.json')

let jsonURL = 'http://localhost:8000'
let apiKey = ''

axios.get('/key.json', {baseURL: jsonURL})
  .then(res => {
    apiKey = res.data.apiKey
    paginationMaster()
      .then(res => console.log(res.length))
  })
  .catch(err => console.log(err))


let url = 'https://api.uptimerobot.com/v2/getMonitors'
var limit = 10
var offset = 0
var total = 0
var timeOUTms = 10 * 1000

let apiPOSTrequest = (localLimit, localOffset) => {
  return axios.post(url, {
    api_key: apiKey,
    format: 'json',
    logs: '1',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    },
    limit: localLimit,
    offset: localOffset
  }, {
    timeout: timeOUTms
  })
}

let paginationMaster = (() => {
  return axios.all([apiPOSTrequest(limit, offset)])
    .then((res0) => {
      let firstMonitors = res0[0].data.monitors
      let pagination = res0[0].data.pagination
      
      //  production
      //  limit = pagination.limit
      total = pagination.total
      offset += limit
      let apiCallArr = []
      for (offset; offset < total; offset += limit) {
        apiCallArr.push(apiPOSTrequest(limit, offset))
      }

      return axios.all(apiCallArr).then((resArray) => {
        let resMonitors = firstMonitors.slice()
        for (let index in resArray) {
          resMonitors = resMonitors.concat(resArray[index].data.monitors)
        }
        return resMonitors
      })
    })
})
