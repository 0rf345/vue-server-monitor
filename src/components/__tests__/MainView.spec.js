import Vue from 'vue'
import { shallow, mount } from 'vue-test-utils'
import sinon from 'sinon'

import MainView from '../MainView'

let upMonitor = { 
  id: 780459894,
  friendly_name: 'Amazon',
  url: 'https://www.amazon.com',
  type: 1,
  status: 2,
  ssl:
  {
    brand: 'DigiCert Inc',
    product: 'DigiCert Global CA G2',
    expires: 1557057600 
  }
}

let downMonitor = { 
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
}

let pausedMonitor = { 
  id: 780459894,
  friendly_name: 'Amazon',
  url: 'https://www.amazon.com',
  type: 1,
  status: 0,
  ssl:
  {
    brand: 'DigiCert Inc',
    product: 'DigiCert Global CA G2',
    expires: 1557057600 
  }
}

describe('MainView', () => {
  const viewClone = Vue.extend(MainView)
  //const wrapper = mount(MainView)
  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(MainView)
  })
  //const addServersStub = sinon.stub(wrapper.vm, 'addServers').returns()

  describe('default state', () => {
    it('has correct default data', () => {
      expect(wrapper.vm.fontSize).toBe(40)
      expect(wrapper.vm.footerHeight).toBe(0)
      expect(wrapper.vm.count).toBe(0)
    })
  })

  describe('Returns correct message', () => {
    it('when all servers are operational', () => {
      wrapper.vm.monitors = [upMonitor]
      expect(wrapper.vm.downServersInfo).toContain('All')
    })

    it('when some servers are down', () => {
      wrapper.vm.monitors = [upMonitor, downMonitor]
      expect(wrapper.vm.downServersInfo).toContain('down')
    })
  })

  describe('Recognizes servers correcty', () => {
    it('handles paused servers', () => {
      wrapper.vm.monitors = [upMonitor, downMonitor, pausedMonitor]
      expect(wrapper.vm.pausedServers.length).toEqual(1)
    })
  })

  describe('Methods', () => {
    describe('updateMonitors', () => {
      it('resolves getMonitors', () => {
        let myGetMonitors = jest.fn().mockResolvedValue([upMonitor, downMonitor])
        expect(wrapper.vm.updateMonitors(myGetMonitors)).resolves.toContain(upMonitor)
      })
    })
  })
})