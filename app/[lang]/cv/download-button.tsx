"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

export function DownloadCVButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { locale, t } = useI18n()

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/cv/pdf?lang=${locale}`)
      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = t.cv.pdfFilename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert(t.cv.downloadError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className="inline-flex items-center justify-center gap-2 h-11 px-8 whitespace-nowrap rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <Download className="h-4 w-4 shrink-0 pointer-events-none" />
      {isLoading ? t.cv.generating : t.cv.download}
    </button>
  )
}
