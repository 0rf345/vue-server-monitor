import Vue from 'vue'
import { shallow, mount } from 'vue-test-utils'
import sinon from 'sinon'

import MainView from '../MainView'

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
      expect(wrapper.vm.count).toBe(10)
    })
  })

  describe('methods', () => {
    describe('addServers', () => {
      it('addServers adds', () => {
        let oldServers = wrapper.vm.count
        wrapper.vm.addServers(true, 10)
        expect(wrapper.vm.count).toBe(oldServers + 10)
      })
      it('addServers deducts if able', () => {
        let oldServers = wrapper.vm.count
        wrapper.vm.addServers(false, 5)
        expect(wrapper.vm.count).toBe(oldServers - 5)
      })
      it('addServers does not deduct below 0', () => {
        let oldServers = wrapper.vm.count
        wrapper.vm.addServers(false, 20)
        expect(wrapper.vm.count).toBe(oldServers)
      })
    })
  })
})