import {encodeHtmlEntities} from '@/lib/helperFunctions.tsx'

type Time = {
  minutes: number
  seconds: number
  milliseconds: number
}

export default class ChallengeTool {
  private parseTimer(ms: number): Time {
    const minutes = Math.floor(ms / 6000)
    const seconds = Math.floor((ms % 6000) / 100)
    const milliseconds = ms % 100

    return {minutes: minutes, seconds: seconds, milliseconds: milliseconds}
  }
  public formatMilliseconds(ms: number): string {
    const {seconds, milliseconds, minutes} = this.parseTimer(ms)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
  }

  public stringifyMilliseconds(ms: number): string {
    const {seconds, milliseconds, minutes} = this.parseTimer(ms)
    return `${minutes ? minutes.toString() + ' minutes and ' : ''}${seconds ? seconds.toString() : ''}${milliseconds ? '.' + milliseconds.toString() : ''} seconds`
  }

  public formatChallengeContentJson(challengeJson) {
    return JSON.parse(challengeJson)
      // .map((val) => val.trim())
      // .filter((val) => val.length && val.substring(0, 2) !== '//')
  }
  public encodeHtmlEntities(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }
  public sliceStringStatus(
    string: string,
    startIndex: number,
    endIndex: number,
    status: 'success' | 'error'
  ) {
    const classStatus = status === 'success' ? 'highlight' : 'error-highlight'
    return string.replace(
      string.substring(startIndex, endIndex),
      `<mark class=${classStatus}>${encodeHtmlEntities(string.substring(startIndex, endIndex))}</mark>`
    )
  }


  public calculateWeightedLevels(charCount: number) {
    const levelCount = Math.floor(charCount / 30)
    const levels: {[key: string]: number} = {}
    for (let i = 1; i <= levelCount; i++) {
      levels[i] = levelCount - i + 1
    }
    if (levelCount === 0) levels['1'] = 1
    return levels
  }
}
