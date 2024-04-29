type Time = {
  minutes: number
  seconds: number
  milliseconds: number
}

export default class TimeFormatter {
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

  stringifyMilliseconds(ms: number): string {
    const {seconds, milliseconds, minutes} = this.parseTimer(ms)
    return `${minutes ? minutes.toString() + ' minutes and ' : ''}${seconds ? seconds.toString() : ''}${milliseconds ? '.' + milliseconds.toString() : ''} seconds`
  }
}
