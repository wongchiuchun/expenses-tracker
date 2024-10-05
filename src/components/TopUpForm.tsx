import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'

interface TopUpFormProps {
  onTopUp: (amount: number) => void
}

const TopUpForm: React.FC<TopUpFormProps> = ({ onTopUp }) => {
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount) {
      onTopUp(parseFloat(amount))
      setAmount('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topUpAmount" className="block text-sm font-medium text-gray-700">
          Top Up Amount
        </label>
        <input
          type="number"
          name="topUpAmount"
          id="topUpAmount"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter top up amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Top Up Cash
      </button>
    </form>
  )
}

export default TopUpForm