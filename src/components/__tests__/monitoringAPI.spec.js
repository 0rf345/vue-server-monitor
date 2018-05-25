import { getMonitors } from '../monitoringAPI'
import axios from 'axios'

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

describe('Monitoring API', () => {

  describe('Setup', () => {
    it('requires axios to be injected', () => {
      expect(getMonitors()).rejects.toEqual(new Error("axios not injected"))
    })
  
    let myAxios = {
      post: jest.fn().mockResolvedValue({status: 200, data: {}}),
      all: jest.fn().mockResolvedValue({status: 200, data: {}})
    }
  })

  describe('Errors', () => {
    it('handles HTTP errors', () => {
      let myAxios = {
        post: jest.fn()
          .mockRejectedValueOnce({status: 502, data: {}}) ,
        all: jest.fn().mockResolvedValue(jest.fn().mockRejectedValue({status: 502, data: {}}))
      }
      expect(getMonitors(myAxios)).rejects.toThrowError()
    })
    
    it('handles stat fail reject', () => {
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
          }),
        all: jest.fn()
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
      expect(getMonitors(myAxios)).rejects.toThrowError()
    })

    it('handles stat fail resolve -> reject', () => {
      let myAxios = {
        post: jest.fn()
          .mockResolvedValueOnce({
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
          }),
        all: jest.fn()
        .mockResolvedValueOnce([{
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
        }])
      }
      expect(getMonitors(myAxios)).rejects.toThrowError()
    })

    it('handles error on second axios.all request', () => {
      let myAxios = {
        post: jest.fn().mockResolvedValue({
          status: 200,
          data: {
            stat: 'ok',
            pagination: { offset: 0, limit: 50, total: 10 },
            monitors: monitors
          }
        }),
        all: jest.fn()
          .mockResolvedValueOnce([{
            status: 200,
            data: {
              stat: 'ok',
              pagination: { offset: 0, limit: 50, total: 1000 },
              monitors: monitors
            }
          }])
          .mockRejectedValueOnce([{
            status: 200,
            data: {
              stat: 'fail',
              pagination: { offset: 0, limit: 50, total: 10 },
              monitors: monitors
            }
          }])
      }
      expect(getMonitors(myAxios)).rejects.toThrowError()
    })
    
  })

  describe('Normal behavior', () => {
    let myMonitors = Array(10).fill({ 
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
    })
    let myAxios = {
      post: jest.fn().mockResolvedValue({
        status: 200,
        data: {
          stat: 'ok',
          pagination: { offset: 0, limit: 10, total: 50 },
          monitors: monitors
        }
      }),
      all: jest.fn().mockResolvedValue([{
        status: 200,
        data: {
          stat: 'ok',
          pagination: { offset: 0, limit: 10, total: 50 },
          monitors: monitors
        }
      }])
    }

    it('returns the monitors array with one call', () => {
      expect(getMonitors(myAxios)).resolves.toEqual(monitors)
    })

    it('returns the monitors array with multiple calls', () => {
      let tenMonitors = Array(10).fill({id: 1312323232})
      let axiosResult = {status: 200, data: {stat: 'ok', pagination: { offset: 0, limit: 10, total: 50 },
        monitors: tenMonitors}}
      let paginationAxios = {
        post: jest.fn(),
        all: jest.fn()
          .mockResolvedValueOnce([axiosResult])
          .mockResolvedValue(Array(4).fill(axiosResult))
      }
      expect(getMonitors(paginationAxios)).resolves.toBeDefined()
    })
  })
  
})