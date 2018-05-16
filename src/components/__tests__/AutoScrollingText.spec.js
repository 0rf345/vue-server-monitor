import { shallow } from 'vue-test-utils'

import AutoScrollingText from '../AutoScrollingText'

describe('AutoScrollingText', () => {

  let props = {
    customText: 'custom text',
    footerHeight: 30
  }

  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(AutoScrollingText, {
      propsData: {
        ...props
      }
    })
  })

  describe('Sets up correctly', () => {
    it('has correct font size', () => {
      expect(wrapper.props().footerHeight).toBe(props.footerHeight)
    })
    it('has correct text', () => {
      expect(wrapper.props().customText).toBe(props.customText)
    })
  })

  describe('Exports correctly', () => {
    it('renders an AutoScroller element', () => {
      expect(wrapper.html()).toContain('id="' + wrapper.name() + '"')
    })
  })

  describe('computed properties and watchers', () => {
    it('changes font size based on footerHeight prop', () => {
      let oldFontSize = wrapper.vm.fontSize
      wrapper.setProps({
        footerHeight: 1000
      })
      expect(wrapper.vm.fontSize).not.toBe(oldFontSize)
    })
  })
})