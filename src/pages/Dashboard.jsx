// rrd imports
import { useLoaderData } from 'react-router-dom';
// libraries
import { toast } from 'react-toastify';
// components
import Intro from '../components/Intro';
// helper functions
import { fetchData } from '../helpers';

// Loader
export function dashboardLoader() {
    const userName = fetchData('userName');
    return { userName };
}

// action
export async function dashboardAction({ request }) {
    const data = await request.formData();
    const formData = Object.fromEntries(data);

    // Save user to db/ls
    try {
        localStorage.setItem('userName', JSON.stringify(formData.userName));
        return toast.success(`Welcome, ${formData.userName} to HomeBudget!`);
    } catch (error) {
        throw new Error('There was a problem creating your account :(');
    }
}

const Dashboard = () => {
    const { userName } = useLoaderData();

    return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};

export default Dashboard;
