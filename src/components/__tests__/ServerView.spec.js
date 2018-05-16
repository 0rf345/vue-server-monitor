import { shallow } from 'vue-test-utils'

import ServerView from '../ServerView'

describe('ServerView', () => {
  
  const defaultNumOfServers = 15
  const customNumOfServers = 151
  const defaultServerText = 'Server12345'

  const props = {
    servers: Array(defaultNumOfServers).fill(defaultServerText),
    parentDiv: {
      width: 1920,
      height: 1080
    }
  }

  let wrapper
  beforeEach(() => {
    wrapper = shallow(ServerView, {
      propsData: {
        ...props
      }
    })
  })

  describe('Default data', () => {
    it('Has correct default name', () => {
      expect(wrapper.name()).toBe('ServerView')
    })
    it('cheat should be false after the component has mounted', () => {
      expect(wrapper.vm.cheat).toBe(false)
    })
    it('start with default startingF', () => {
      expect(wrapper.vm.startingF).toBe(300)
    })
  })

  describe('Methods', () => {
    it('updateF updates previousF', () => {
      let newValue = 148
      wrapper.vm.updateF(newValue)
      expect(wrapper.vm.previousF).toBe(newValue)
    })
  })

  describe('Computed properties', () => {
    describe('fontSize is calculated based on the number of servers', () => {
      it('changes based on number of servers', () => {
        let oldFontSize = wrapper.vm.fontSize
        wrapper.setProps({
          servers: Array(customNumOfServers).fill(defaultServerText)
        })
        expect(wrapper.vm.fontSize).not.toBe(oldFontSize)
      })
    })
  })
})