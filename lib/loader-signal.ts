// Tiny signal so the hero animation knows when the pre-loader has finished.
// Module-level state — survives across components on the same page.

let done = false
const listeners = new Set<() => void>()

export const loaderSignal = {
  isDone: () => done,
  signal: () => {
    if (done) return
    done = true
    listeners.forEach((cb) => cb())
  },
  subscribe: (cb: () => void) => {
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
  },
}
