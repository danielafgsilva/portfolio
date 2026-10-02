import { notFound } from "next/navigation"

// Any unknown URL ("/foo", "/pt/foo") lands here so it gets the localized 404
// (status 404 + noindex). Known Next 15 limitation (vercel/next.js#99287): the
// not-found UI is client-rendered, so the initial HTML is an empty shell.
export default function CatchAll() {
  notFound()
}
