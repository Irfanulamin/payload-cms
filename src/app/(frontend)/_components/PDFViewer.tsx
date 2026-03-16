// src/app/(frontend)/_components/PDFViewer.tsx
'use client'

import { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

interface PdfViewerProps {
  fileUrl: string
}

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let objectUrl: string

    async function loadPdf() {
      try {
        const response = await fetch(fileUrl)
        if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.status}`)
        const blob = await response.blob()
        objectUrl = URL.createObjectURL(blob)
        setBlobUrl(objectUrl)
      } catch (err) {
        setError('Could not load PDF. Please try again.')
        console.error(err)
      }
    }

    loadPdf()

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl) // cleanup
    }
  }, [fileUrl])

  if (error) return <p className="text-red-500">{error}</p>
  if (!blobUrl) return <p>Loading PDF...</p>

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div style={{ height: '100vh' }}>
        <Viewer fileUrl={blobUrl} plugins={[defaultLayoutPluginInstance]} />
      </div>
    </Worker>
  )
}
