/** Small pinging status dot ("open to opportunities", "live", "in development"). */
export function PulseDot({ color = "bg-cyan" }: { color?: "bg-cyan" | "bg-green" }) {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  )
}
