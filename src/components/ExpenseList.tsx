import React, { useState } from 'react'
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Expense } from '../types'

interface ExpenseListProps {
  expenses: Expense[]
  onRemoveExpense: (id: string) => void
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onRemoveExpense }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const expensesPerPage = 10

  const indexOfLastExpense = currentPage * expensesPerPage
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense)

  const totalPages = Math.ceil(expenses.length / expensesPerPage)

  const goToNextPage = () => setCurrentPage(page => Math.min(page + 1, totalPages))
  const goToPreviousPage = () => setCurrentPage(page => Math.max(page - 1, 1))

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Expense History</h3>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses recorded yet.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {currentExpenses.map((expense) => (
              <li key={expense.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm font-medium mr-4 ${expense.description === 'Cash Top Up' ? 'text-green-600' : 'text-red-600'}`}>
                    {expense.description === 'Cash Top Up' ? '+' : '-'}${expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemoveExpense(expense.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ExpenseList