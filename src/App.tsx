import React, { useState, useEffect } from 'react'
import { PlusCircle, Trash2, Download } from 'lucide-react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import TopUpForm from './components/TopUpForm'
import { Expense } from './types'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses')
    const storedBalance = localStorage.getItem('balance')
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses))
    if (storedBalance) setBalance(parseFloat(storedBalance))
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
    localStorage.setItem('balance', balance.toString())
  }, [expenses, balance])

  const addExpense = (expense: Expense) => {
    setExpenses(prevExpenses => [expense, ...prevExpenses])
    setBalance(prevBalance => prevBalance - expense.amount)
  }

  const removeExpense = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const expenseToRemove = expenses.find(e => e.id === id)
      if (expenseToRemove) {
        setExpenses(expenses.filter(e => e.id !== id))
        setBalance(prevBalance => prevBalance + expenseToRemove.amount)
      }
    }
  }

  const setInitialBalance = (amount: number) => {
    setBalance(amount)
  }

  const topUpCash = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount)
    setExpenses(prevExpenses => [{
      id: Date.now().toString(),
      description: 'Cash Top Up',
      amount: amount,
      date: new Date().toISOString(),
    }, ...prevExpenses])
  }

  const exportLog = () => {
    const csvContent = [
      ['Date', 'Description', 'Amount'],
      ...expenses.map(expense => [
        new Date(expense.date).toLocaleDateString(),
        expense.description,
        expense.amount.toFixed(2)
      ])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'expense_log.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Expenses Tracker</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Current Balance</h3>
            <span className="text-2xl font-bold text-green-600">${balance.toFixed(2)}</span>
          </div>
          <ExpenseForm onAddExpense={addExpense} onSetInitialBalance={setInitialBalance} />
          <TopUpForm onTopUp={topUpCash} />
          <ExpenseList expenses={expenses} onRemoveExpense={removeExpense} />
          <button
            onClick={exportLog}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Download className="mr-2 h-5 w-5" />
            Export Log
          </button>
        </div>
      </div>
    </div>
  )
}

export default App