import { redirect } from 'react-router-dom';

// Libraries
import { toast } from 'react-toastify';

// helpers
import { deleteItem } from '../helpers';

export async function logoutAction() {
    // delete user
    deleteItem({ key: 'userName' });

    // show toast
    toast.success('Account Deleted!');

    // return redirect
    return redirect('/');
}
