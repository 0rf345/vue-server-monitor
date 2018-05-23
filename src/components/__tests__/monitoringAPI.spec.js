import { getMonitors } from '../monitoringAPI'
import axios from 'axios'

describe('Monitoring API', () => {

  describe('Setup', () => {
    it('requires axios to be injected', () => {
      return expect(getMonitors()).rejects.toContain('Error')
    })
  
    let myAxios = {
      post: jest.fn().mockResolvedValue({status: 200, data: {}})
    }
  
    it('calls axios', () => {
      getMonitors(myAxios)
        .then((res) => {
          expect(myAxios.post).toHaveBeenCalled()
        })
    })
  })

  describe('Errors', () => {
    it('handles HTTP errors', () => {
      let myAxios = {
        post: jest.fn()
          .mockRejectedValueOnce({status: 502, data: {}}) 
      }
      return expect(getMonitors(myAxios)).resolves.toContain('Error')
    })
    
    it('handles other errors', () => {
      let myAxios = {
        post: jest.fn()
          .mockRejectedValueOnce({
            status: 200,
            data: {
              stat: 'fail',
              error: { 
                type: 'invalid_parameter',
                parameter_name: 'api_key',
                passed_value: 'notSomethingCorrect',
                message: 'api_key not found.'
              }
            }
          })
          
      }
      return expect(getMonitors(myAxios)).resolves.toContain('api_key')
    })
    
  })

  describe('Normal behavior', () => {
    let monitors = [
      { 
        id: 780459894,
        friendly_name: 'Amazon',
        url: 'https://www.amazon.com',
        type: 1,
        status: 9,
        ssl:
        {
          brand: 'DigiCert Inc',
          product: 'DigiCert Global CA G2',
          expires: 1557057600 
        }
      },
      { 
        id: 780459899,
        url: 'https://www.csd.uoc.gr',
        type: 1,
        status: 2,
        ssl:
        {
          brend: 'TERENA',
          product: 'TERENA SSL CA 3',
          expires: 1606910400
        }
      }
    ]
    let myAxios = {
      post: jest.fn().mockResolvedValue({
        status: 200,
        data: {
          stat: 'ok',
          pagination: { offset: 0, limit: 50, total: 10 },
          monitors: monitors
        }
      })
    }

    it('Returns the monitors array', () => {
      return expect(getMonitors(myAxios)).resolves.toEqual(monitors)
    })
  })
  

  
})