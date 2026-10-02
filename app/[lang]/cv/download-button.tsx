"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
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
    <Button onClick={handleDownload} size="lg" className="gap-2" disabled={isLoading}>
      <Download className="h-4 w-4" />
      {isLoading ? t.cv.generating : t.cv.download}
    </Button>
  )
}
