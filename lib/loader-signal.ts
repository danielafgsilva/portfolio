// Module-level signal that lets the Hero delay its typewriter reveal until the
// page-loader intro sequence has finished. Simple pub/sub pattern (not a
// React context on purpose — it needs to survive across separate component
// trees and be reliably in sync with the loader's exit callback).

let done = false
const listeners = new Set<() => void>()

export const loaderSignal = {
  isDone(): boolean {
    return done
  },
  signal(): void {
    if (done) return
    done = true
    for (const listener of listeners) listener()
    listeners.clear()
  },
  subscribe(listener: () => void): () => void {
    if (done) {
      listener()
      return () => {}
    }
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}
