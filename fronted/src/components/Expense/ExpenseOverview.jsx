import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomLineChart from '../charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onExpeseIncome }) => {

    const[chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(transactions);
        setChartData(result);

    }, [transactions])

  return <div className="card">
    <div className="flex items-center justify-between">
        <div className="">
            <h5 className="text-lg">Expense Overview</h5>
            <p className="text-xs text-gray-400 mt-0.5">Track Your Spending Trends Over Time And Gain Insights Into Where Your Money Goes.</p>
        </div>

        <button className="add-btn" onClick={onExpeseIncome}>
            <LuPlus className='text-lg' />
            Add Income
        </button>
    </div>

    <div className="mt-10">
        <CustomLineChart data={chartData} />
    </div>
  </div>
}

export default ExpenseOverview