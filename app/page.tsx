'use client'

import { useCheckout } from '@moneydevkit/nextjs'

export default function Page() {
  const { navigate, isNavigating } = useCheckout()

  const handlePurchase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const amount = formData.get('amount')
    const message = formData.get('message')

    navigate({
      title: "TIPS",
      description: 'Thank you kind stranger!',
      amount: amount ? Number.parseInt(amount as string) : 21,
      currency: 'SAT',
      metadata: {
        type: 'tip',
        customField: message ?? '',
        successUrl: '/checkout/success',
        name: 'John Doe'
      }
    })
  }

  return (
    <form className="flex flex-col gap-2 items-center justify-center h-screen" onSubmit={handlePurchase}>
      <input className="border-2 border-gray-300 p-2 rounded-md" type="number" inputMode="numeric" required name="amount" placeholder="Amount (sats)" />
      <input className="border-2 border-gray-300 p-2 rounded-md" type="text" maxLength={120} name="message" placeholder="Message (optional)" />
      <button className="bg-blue-500 text-white p-2 rounded-md w-fit mx-auto" type="submit" disabled={isNavigating}>
        {isNavigating ? 'Creating checkout…' : 'Buy Now'}
      </button>
    </form>
  )
}