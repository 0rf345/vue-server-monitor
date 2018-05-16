import { shallow } from 'vue-test-utils'

import Clock from '../Clock'

describe('Clock', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(Clock)
  })

  it('loads renders a Clock element', () => {
    expect(wrapper.html()).toContain('id="Clock"')
  })

  it('has a timer set', () => {
    expect(wrapper.vm.timer).not.toBeNaN()
  })

  describe('methods', () => {
    it('tick changes current time', () => {
      const currentTime = wrapper.vm.date
      wrapper.vm.tick()
      expect(wrapper.vm.date).not.toBe(currentTime)
    })
  })
})