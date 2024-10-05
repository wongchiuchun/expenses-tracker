import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Expense } from '../types'

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void
  onSetInitialBalance: (amount: number) => void
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, onSetInitialBalance }) => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [initialBalance, setInitialBalance] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && amount) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      }
      onAddExpense(newExpense)
      setDescription('')
      setAmount('')
    }
  }

  const handleSetInitialBalance = () => {
    const balance = parseFloat(initialBalance)
    if (!isNaN(balance)) {
      onSetInitialBalance(balance)
      setInitialBalance('')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">
          Set Initial Balance
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="number"
            name="initialBalance"
            id="initialBalance"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="Enter initial balance"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSetInitialBalance}
          >
            Set
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter expense description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter expense amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm