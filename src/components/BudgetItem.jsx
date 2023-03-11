import React from 'react';
import { calcSpentByBudget, formatCurrency, formatPercentage } from '../helpers';

const BudgetItem = ({ budget }) => {
    const { name, id, amount, color } = budget;
    const spent = calcSpentByBudget(id);

    return (
        <div
            className="budget"
            style={{
                '--accent': color,
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} Spent</small>
                <small>{formatCurrency(amount - spent)} Remaining</small>
            </div>
        </div>
    );
};

export default BudgetItem;
