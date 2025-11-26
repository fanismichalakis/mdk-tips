'use client'

import { Suspense } from 'react'
import { useCheckoutSuccess } from '@moneydevkit/nextjs'
import { BitcoinIcon, CornerDownLeftIcon } from 'lucide-react'

const ReceivedPage = () => (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p>Tip received! Thank you! 🤗</p>
        <button className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded-md w-fit mx-auto hover:bg-blue-600 transition-colors hover:cursor-pointer" onClick={() => window.location.href = '/'}>
            <CornerDownLeftIcon className="w-4 h-4" />
        </button>
    </div>
)

const NotReceivedPage = () => (
    <div className="flex flex-col items-center justify-center h-screen">
        <p>Payment has not been confirmed (yet?).</p>
    </div>
)

const LoadingPage = () => (
    <div className="flex flex-col items-center justify-center h-screen">
        <BitcoinIcon className="w-10 h-10 animate-bounce" />
        <p>Verifying payment…</p>
    </div>
)

function SuccessContent() {
  const { isCheckoutPaidLoading, isCheckoutPaid, metadata } = useCheckoutSuccess()

  if (isCheckoutPaidLoading || isCheckoutPaid === null) {
    return <LoadingPage />
  }

  if (!isCheckoutPaid) {
    return <NotReceivedPage />
  }

  // We set 'name' when calling navigate(), and it's accessible here on the success page.
  console.log('Customer name:', metadata?.name) // "John Doe"

  return (
    <ReceivedPage />
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SuccessContent />
    </Suspense>
  )
}

