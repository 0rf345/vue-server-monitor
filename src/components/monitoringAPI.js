
// User API-Key for using uptimeRobot's getMonitors
let apiKey = 'u587507-ef028e160c997d362add8741'
let url = 'https://api.uptimerobot.com/v2/getMonitors'


export function getMonitors(injAxios) {
  if(!injAxios) {
    return Promise.reject('Error, axios not injected')
  } else {
    return injAxios.post()
      .then((res) => {
        if(res.status !== 200 || res.data.stat === 'fail') {
          let msg = 'Resolved: Error, status code: ' + err.status
          console.log(msg)
          return msg
        } else {
          console.log(res)
          return res
        }
      }).catch((err) => {
        let msg = 'Rejected: Error, status code: ' + err.status + '\n'
        msg += err.data.error ? ('Got error message from API: ' + err.data.error.message) : ''
        console.log(msg)
        return msg
      })
  }
}

export function getMonitors2(injAxios) {
  if(!injAxios) {
    return Promise.reject('Error, axios not injected')
  }
  let result = injAxios.post(url, {
    api_key: apiKey,
    format: 'json',
    logs: '1',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    }
  })
    .then((res) => {
      res
    })
    .catch((error) => {
      'Got status: ' + error.data.status
    })
  return result
}
