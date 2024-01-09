"use server"

import ResultsPage from "@/components/resultsPage";
import { headers } from "next/headers"
import { NextRequest } from "next/server";

async function fetchDevices() {
  const headersList = headers()
  const referer = headersList.get("referer")
  if (referer) {
    const request = new NextRequest(referer)
    const result = await fetch(`${request.nextUrl.origin}/api/devices/fetch`)

    if (!result.ok) {
      throw new Error("Failed to fetch data")
    }

    return result.json()
  }
}

export default async function Page() {
  const devices = await fetchDevices()

  return (
    <ResultsPage devices={devices}/>
  )
}
