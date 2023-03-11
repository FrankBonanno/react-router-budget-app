import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Libraries
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Actions
import { logoutAction } from './actions/logout';
// Layouts
import Main, { mainLoader } from './layouts/Main';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
// Routes
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import ExpensesPages, { expensesAction, expensesLoader } from './pages/ExpensesPages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        loader: mainLoader,
        children: [
            {
                index: true,
                element: <Dashboard />,
                loader: dashboardLoader,
                action: dashboardAction,
                errorElement: <Error />,
            },
            {
                path: 'budget/:id',
                element: <BudgetPage />,
                loader: budgetLoader,
                action: budgetAction,
                errorElement: <Error />,
            },
            {
                path: 'expenses',
                element: <ExpensesPages />,
                loader: expensesLoader,
                action: expensesAction,
                errorElement: <Error />,
            },
            {
                path: 'logout',
                action: logoutAction,
            },
        ],
        errorElement: <Error />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
            <ToastContainer />
        </div>
    );
}

export default App;
