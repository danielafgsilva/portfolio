import { NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale, localePath } from "@/lib/i18n/config"

export const maxDuration = 60;

function getLocalChromeExecutablePath(): string {
  const fromEnv = process.env.PUPPETEER_EXECUTABLE_PATH ?? process.env.CHROME_PATH
  if (fromEnv) return fromEnv
  if (process.platform === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  }
  if (process.platform === "win32") {
    return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  }
  return "/usr/bin/google-chrome-stable"
}
export async function GET(request: NextRequest) {
  let browser
  const langParam = request.nextUrl.searchParams.get("lang")
  const locale = isLocale(langParam) ? langParam : "en"
  try {
    const isVercel = process.env.VERCEL === "1"
    let executablePath: string | undefined
    let args: string[]
    if (isVercel) {
      chromium.setGraphicsMode = false
      executablePath = await chromium.executablePath()
      args = chromium.args
    } else {
      executablePath = getLocalChromeExecutablePath()
      args = [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ]
    }
    const launchOptions: Parameters<typeof puppeteer.launch>[0] = {
      headless: true,
      executablePath,
      args,
    }
    browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()
    // Production renders its own canonical domain (a trusted env value) rather
    // than the request's Host header, so a forged Host can't point the headless
    // browser elsewhere. Previews/local keep the request origin (their host).
    const baseUrl =
      process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : request.nextUrl.origin
    await page.goto(`${baseUrl}${localePath(locale, "/cv")}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    })
    await page.waitForSelector("#cv-print-content", { timeout: 10000 })
    await page.evaluate(() => {
      const downloadButton = document.querySelector(".no-print")
      if (downloadButton) {
        ;(downloadButton as HTMLElement).style.display = "none"
      }
    })
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
      preferCSSPageSize: false,
    })
    await browser.close()
    return new Response(pdf as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getDictionary(locale).cv.pdfFilename}"`,
      },
    })
  } catch (error) {
    if (browser) {
      await browser.close().catch(() => {})
    }
    // Details stay in the server log; the client only needs to know it failed.
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
