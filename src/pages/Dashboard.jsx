// rrd imports
import { useLoaderData } from 'react-router-dom';
// libraries
import { toast } from 'react-toastify';
// components
import AddBudgetForm from '../components/AddBudgetForm';
import Intro from '../components/Intro';
// helper functions
import { createBudget, fetchData } from '../helpers';

// Loader
export function dashboardLoader() {
    const userName = fetchData('userName');
    const budgets = fetchData('budgets');
    return { userName, budgets };
}

// action
export async function dashboardAction({ request }) {
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
                    <div className="grid-small">
                        {/* {budgets ? () : ()} */}
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Intro />
            )}
        </>
    );
};

export default Dashboard;
