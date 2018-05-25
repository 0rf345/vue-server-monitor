
// User API-Key for using uptimeRobot's getMonitors
let apiKey = 'u587507-ef028e160c997d362add8741'
let url = 'https://api.uptimerobot.com/v2/getMonitors'
let timeOUTms = 20 * 1000
var total = 0
var offset = 0
var limit = 10

/*
 * Status
 * 0 - paused
 * 1 - not checked yet
 * 2 - up
 * 8 - seems down
 * 9 - down
 */

let apiPOSTrequest = (injAxios, localLimit, localOffset) => {
  return injAxios.post(url, {
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

export function getMonitors (injAxios) {
  return injAxios.all([apiPOSTrequest(injAxios, limit, offset)])
    .then((res0) => {
      let firstMonitors = res0[0].data.monitors
      let pagination = res0[0].data.pagination
      //  production
      //  limit = pagination.limit
      total = pagination.total
      offset += limit
      let apiCallArr = []
      for (offset; offset < total; offset += limit) {
        apiCallArr.push(apiPOSTrequest(injAxios, limit, offset))
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
      })
    })
}

/*  DEPRECATED
function getMonitorsPOST (injAxios) {
  if (!injAxios) {
    console.log('Axios not injected!')
    return Promise.reject(new Error('axios not injected'))
  } else {
    return injAxios.post(url, {
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
      .then((res) => {
        total = res.data.pagination.total

        // production
        // limit = response.data.pagination.limit

        offset = offset + limit

        if (res.data.stat !== 'fail') {
          return res.data.monitors
        }
        throw res
      }).catch((err) => {
        console.log('UptimeRobot rejected our call')
        console.log(err)
        let msg = 'Rejected: Error, status code: ' + err.status + '\n'
        msg += err.data.error ? ('Got error message from API: ' + err.data.error.message) : ''
        console.log(msg)
        return Promise.reject(err)
      })
  }
}
*/
