import { getMonitors } from '../monitoringAPI'
import axios from 'axios'

describe('Monitoring API', () => {
  let myAxios = {}

  describe('Setup', () => {
    it('requires axios to be injected', () => {
      getMonitors().catch((err) => {
        expect(err).toContain('Error')
      })
    })
  
    beforeEach(() => {
      myAxios = {
        post: jest.fn().mockResolvedValue({status: 200, data: {}})
      }
    })
  
    it('calls axios', () => {
      getMonitors(myAxios)
        .then((res) => {
          expect(myAxios.post).toHaveBeenCalled()
        })
    })
  })

  describe('Errors', () => {
    it('handles HTTP errors', () => {
      myAxios = {
        post: jest.fn()
          .mockRejectedValueOnce({status: 502, data: {}}) 
      }
      getMonitors(myAxios)
        .then((res) => {
          expect(res).toContain('Error')
        })
    })
    
    it('handles other errors', () => {
      myAxios = {
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
      getMonitors(myAxios)
        .then((res) => {
          console.log(res)
          expect(res).toContain('api_key')
        })
    })
    
  })

  describe('Normal behavior', () => {
    myAxios = {
      post: jest.fn().mockResolvedValue({
        status: 200,
        data: {}
      })
    }

  })
  

  
})