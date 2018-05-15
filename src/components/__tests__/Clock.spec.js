import Vue from 'vue'
import { mount } from 'vue-test-utils'
import sinon from 'sinon'

import Clock from '../Clock'

describe('Clock', () => {
  const viewClone = Vue.extend(Clock)
  const wrapper = mount(Clock)

  it('loads renders a Clock element', () => {
    expect(wrapper.html()).toContain('id="Clock"')
  })
})