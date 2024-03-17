export default class TimeFormatter {
  formatMilliseconds(ms: number): string {
    const minutes = Math.floor(ms / 6000)
    const seconds = Math.floor((ms % 6000) / 100)
    const milliseconds = ms % 100

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
  }
}
