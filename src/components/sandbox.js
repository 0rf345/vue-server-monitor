import axios from 'axios'

let apiKey = 'u587507-ef028e160c997d362add8741'
let url = 'https://api.uptimerobot.com/v2/getMonitors'
var limit = 10
var offset = 0
var monitors = []
var globalArr = []
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
  axios.all([apiPOSTrequest(limit, offset)])
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

      axios.all(apiCallArr).then((resArray) => {
        let resMonitors = firstMonitors.slice()
        for (let index in resArray) {
          resMonitors.concat(resArray[index].data.monitors)
        }
        console.log(resMonitors.length)
      })
    })
})

paginationMaster()

/*
axios.all(
  (() => {
    let i = 0
    let res = []
    for (i; i < 3; i++) {
      res.push(a(i))
    }
    return res
  })()
)
  .then(((resArray) => {
    console.log(resArray[0].data.monitors.concat(resArray[1].data.monitors.concat(resArray[2].data.monitors)).length)
  }))
  */

//  goGetter().then(res => console.log(res.length))