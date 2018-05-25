
//  User API-Key for using uptimeRobot's getMonitors
//  let jsonConf = require('../config/configuration.json')

let url = 'https://api.uptimerobot.com/v2/getMonitors'
let timeOUTms = 20 * 1000
var total = 0
var offset = 0
var limit = 50

/*
 * Status
 * 0 - paused
 * 1 - not checked yet
 * 2 - up
 * 8 - seems down
 * 9 - down
 */

let apiPOSTrequest = (injAxios, localOffset, apiKey) => {
  return injAxios.post(url, {
    format: 'json',
    api_key: apiKey,
    logs: '1',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded'
    },
    offset: localOffset
  }, {
    timeout: timeOUTms
  })
}

export function getMonitors (injAxios, apiKey) {
  if (!injAxios) {
    console.log('Axios not injected!')
    return Promise.reject(new Error('axios not injected'))
  }
  return injAxios.all([apiPOSTrequest(injAxios, 0, apiKey)])
    .then((res0) => {
      if (res0[0].data.stat === 'fail') {
        console.log('Uptime Robot returned stat fail in data')
        throw (res0[0].data)
      }
      let firstMonitors = res0[0].data.monitors
      let pagination = res0[0].data.pagination

      limit = pagination.limit
      total = pagination.total
      offset += limit
      let apiCallArr = []
      for (offset; offset < total; offset += limit) {
        apiCallArr.push(apiPOSTrequest(injAxios, offset, apiKey))
      }

      if (apiCallArr.length === 0) {
        return firstMonitors
      }

      return injAxios.all(apiCallArr).then((resArray) => {
        let resMonitors = firstMonitors.slice()
        for (let index in resArray) {
          resMonitors = resMonitors.concat(resArray[index].data.monitors)
        }
        return resMonitors
      }).catch((err) => {
        console.log('UptimeRobot rejected our mass call')
        console.log(err)
        return new Error(err)
      })
    }).catch((err) => {
      console.log('UptimeRobot rejected our first call')
      console.log(err)
      return Promise.reject(new Error('Error: See console log above'))
    })
}
