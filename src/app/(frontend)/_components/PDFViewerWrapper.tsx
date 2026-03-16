// src/app/(frontend)/_components/PdfViewerWrapper.tsx
'use client'

import dynamic from 'next/dynamic'

const PdfViewer = dynamic(() => import('./PDFViewer'), {
  ssr: false,
  loading: () => <p>Loading PDF viewer...</p>,
})

export default function PdfViewerWrapper({ fileUrl }: { fileUrl: string }) {
  return <PdfViewer fileUrl={fileUrl} />
}
