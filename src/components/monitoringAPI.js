
// User API-Key for using uptimeRobot's getMonitors
let apiKey = 'u587507-ef028e160c997d362add8741'
let url = 'https://api.uptimerobot.com/v2/getMonitors'

/*
 * Status
 * 0 - paused
 * 1 - not checked yet
 * 2 - up
 * 8 - seems down
 * 9 - down
 */

export function getMonitors (injAxios) {
  if (!injAxios) {
    return Promise.reject(new Error('Error, axios not injected'))
  } else {
    return injAxios.post(url, {
      api_key: apiKey,
      format: 'json',
      logs: '1',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then((res) => {
        return res.data.monitors
      }).catch((err) => {
        let msg = 'Rejected: Error, status code: ' + err.status + '\n'
        msg += err.data.error ? ('Got error message from API: ' + err.data.error.message) : ''
        console.log(msg)
        return msg
      })
  }
}
