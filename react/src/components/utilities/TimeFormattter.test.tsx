import TimeFormatter from '@/components/utilities/TimeFormatter.tsx'
import {describe, it, expect} from 'vitest'

const timeTool = new TimeFormatter()

describe('TimeFormatter correctly returns values', () => {
  it('parses raw milliseconds into a stopwatch string', () => {
    const msString = timeTool.formatMilliseconds(559)
    expect(msString).toBe('00:05:59')
  })
  it('parses raw milliseconds into a sentence format', () => {
    const msString1 = timeTool.stringifyMilliseconds(559)
    expect(msString1).toBe('5.59 seconds')
    // const msString2 = timeTool.formatMilliseconds(659)
    // expect(msString2).toBe('6.59 seconds')
  })
})
