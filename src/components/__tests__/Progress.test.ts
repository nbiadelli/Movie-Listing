// RadialProgress.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RadialProgress from '../shared/Progress.vue'

describe('RadialProgress.vue', () => {
  it('renders the correct percentage based on acceptance', () => {
    const wrapper = mount(RadialProgress, {
      props: {
        acceptance: 7.5
      }
    })

    expect(wrapper.text()).toContain('75%')
  })

  it('updates the percentage when the acceptance prop changes', async () => {
    const wrapper = mount(RadialProgress, {
      props: {
        acceptance: 7
      }
    })

    expect(wrapper.text()).toContain('70%')

    // Update the prop
    await wrapper.setProps({ acceptance: 8.2 })
    expect(wrapper.text()).toContain('82%')
  })

  it('sets correct style values for progress and size', () => {
    const wrapper = mount(RadialProgress, {
      props: {
        acceptance: 9.1
      }
    })

    const progressDiv = wrapper.find('.radial-progress')

    expect(progressDiv.attributes('style')).toContain('--value: 91')
    expect(progressDiv.attributes('style')).toContain('--size: 3rem')
  })
})
