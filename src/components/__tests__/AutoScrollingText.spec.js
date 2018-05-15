import Vue from 'vue'
import { mount } from 'vue-test-utils'
import sinon from 'sinon'

import AutoScrollingText from '../AutoScrollingText'

describe('AutoScrollingText', () => {
  const ViewClone = Vue.extend(AutoScrollingText)

  let props = {
    customText: 'custom text',
    footerHeight: 0
  }

  const wrapper = mount(AutoScrollingText, {
    propsData: {
      ...props
    }
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
})