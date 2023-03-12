import React from 'react';
import { Form, Link } from 'react-router-dom';
import { calcSpentByBudget, formatCurrency, formatPercentage } from '../helpers';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';

const BudgetItem = ({ budget, showDelete = false }) => {
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
            {showDelete ? (
                <div className="flex-sm">
                    <Form
                        method="post"
                        action="delete"
                        onSubmit={(e) => {
                            if (!confirm('Are you sure you want to permannently DELETE this budget?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button className="btn btn--warning" type="submit">
                            <span>Delete Budget</span>
                            <TrashIcon width={20} />
                        </button>
                    </Form>
                </div>
            ) : (
                <div className="flex-sm">
                    <Link to={`/budget/${id}`} className="btn">
                        <span>View Details</span>
                        <BanknotesIcon width={20} />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default BudgetItem;
