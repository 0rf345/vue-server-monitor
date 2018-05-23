import axios from 'axios'

let apiKey = 'u587507-ef028e160c997d362add8741'
let url = 'https://api.uptimerobot.com/v2/getMonitors'

axios.post(url, {
  api_key: apiKey,
  format: 'json',
  logs: '1',
  headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded'
  }
})
  .then((response) => {
    console.log('Resolved')
    console.log(response)
  })
  .catch((error) => {
    console.log('Rejected')
    console.log(error)
  })