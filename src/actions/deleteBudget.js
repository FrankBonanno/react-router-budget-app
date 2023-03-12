import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteItem, getAllMatchingItems } from '../helpers';

export function deleteBudget({ params }) {
    try {
        // delete budget
        deleteItem({
            key: 'budgets',
            id: params.id,
        });
        // delete associated expenses
        const associatedExpenses = getAllMatchingItems({ category: 'expenses', key: 'budgetId', value: params.id });
        associatedExpenses.forEach((exp) => {
            deleteItem({ key: 'expenses', id: exp.id });
        });

        toast.success('Budget Deleted Successfully!');
    } catch (e) {
        throw new Error('There was a problem deleting that budget :(');
    }

    return redirect('/');
}
