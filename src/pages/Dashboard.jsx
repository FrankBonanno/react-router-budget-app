// rrd imports
import { useLoaderData } from 'react-router-dom';
// libraries
import { toast } from 'react-toastify';
// components
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import Intro from '../components/Intro';
// helper functions
import { createBudget, createExpense, fetchData, waait } from '../helpers';

// Loader
export function dashboardLoader() {
    const userName = fetchData('userName');
    const budgets = fetchData('budgets');
    return { userName, budgets };
}

// action
export async function dashboardAction({ request }) {
    await waait();

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    console.log(_action);

    // New User Submission
    if (_action === 'newUser') {
        try {
            localStorage.setItem('userName', JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName} to HomeBudget!`);
        } catch (error) {
            throw new Error('There was a problem creating your account :(');
        }
    }
    // Create A Budget
    if (_action === 'createBudget') {
        try {
            createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
            return toast.success(`Budget Created!`);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // Add Expense
    if (_action === 'createExpense') {
        try {
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget });
            return toast.success(`Expense ${values.newExpense} Added!`);
        } catch (error) {
            throw new Error('There was a problem adding that expense :(');
        }
    }
}

const Dashboard = () => {
    const { userName, budgets } = useLoaderData();

    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>
                        Welcome back, <span className="accent">{userName}</span>
                    </h1>
                    <div className="grid-sm">
                        {budgets && budgets.length > 0 ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                            </div>
                        ) : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create A Budget To Get Started</p>
                                <AddBudgetForm />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Intro />
            )}
        </>
    );
};

export default Dashboard;
