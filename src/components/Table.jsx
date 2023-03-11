import React from 'react';
import ExpenseItem from './ExpenseItem';

const Table = ({ expenses }) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {['Name', 'Amount', 'Date', 'Budget', ''].map((i, index) => (
                            <th key={index}>{i}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((exp) => (
                        <tr key={exp.id}>
                            <ExpenseItem expense={exp} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
