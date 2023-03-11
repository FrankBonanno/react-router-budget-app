import { useLoaderData } from 'react-router-dom';
import Table from '../components/Table';
import { fetchData } from '../helpers';

// Loader
export function expensesLoader() {
    const expenses = fetchData('expenses');
    return { expenses };
}

const ExpensesPages = () => {
    const { expenses } = useLoaderData();

    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>
                        Recent Expenses <small>({expenses.length} total)</small>
                    </h2>
                    <Table expenses={expenses} />
                </div>
            ) : (
                <p>No Expenses To Show ...</p>
            )}
        </div>
    );
};

export default ExpensesPages;
