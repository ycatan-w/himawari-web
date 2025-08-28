export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}`
}

export function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + (m ?? 0);
}
