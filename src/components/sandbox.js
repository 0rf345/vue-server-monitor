import axios from 'axios'

let apiKey = 'u587507-ef028e160c997d362add8741'
let url = 'https://api.uptimerobot.com/v2/getMonitors'
var limit = 10
var offset = 0
var monitors = []
var globalArr = []
var total = 0
var timeOUTms = 10 * 1000

function getMonitors (off) {
  return axios.post(url, {
    api_key: apiKey,
    format: 'json',
    logs: '1',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    },
    limit: limit,
    offset: offset
  }, {
    timeout: timeOUTms
  })
    .then((response) => {
      console.log('Resolved')
      total = response.data.pagination.total

      // production
      // limit = response.data.pagination.limit
      
      offset = offset + limit
      return response
    })
    .catch((error) => {
      console.log('Rejected')
      console.log(error)
      console.log(error.response.data)
      return error
    })
}

function goGetter() {
  return getMonitors(offset)
    .then((res) => {
      // console.log(monitors)
      if (offset >= total) {
        monitors = monitors.concat(res.data.monitors)
        console.log(monitors.filter(x => x).length)
        return monitors
      } else {
        //  console.log(res.data.monitors.length)
        return monitors = monitors.concat(res.data.monitors.concat(goGetter()))
      }
    })
    .catch(err => console.log(err))
}

axios.all([
  axios.post(url, {
    api_key: apiKey,
    format: 'json',
    logs: '1',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    },
    limit: 20,
    offset: 0
  }, {
    timeout: timeOUTms
  }),
  axios.post(url, {
    api_key: apiKey,
    format: 'json',
    logs: '1',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    },
    limit: 20,
    offset: 20
  }, {
    timeout: timeOUTms
  }),
  axios.post(url, {
    api_key: apiKey,
    format: 'json',
    logs: '1',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    },
    limit: 20,
    offset: 40
  }, {
    timeout: timeOUTms
  })
])
  .then(axios.spread((res1, res2, res3) => {
    console.log(res1.data.monitors.concat(res2.data.monitors.concat(res3.data.monitors)))
  }))

//  goGetter().then(res => console.log(res.length))