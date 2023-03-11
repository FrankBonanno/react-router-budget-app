// async emulator
export const waait = () => new Promise((res) => setTimeout(res, Math.random() * 800));

// HSL color gen
const generateRandomColor = () => {
    const existingBudgetLength = fetchData('budgets')?.length ?? 0;

    return `${existingBudgetLength * 34} 65% 50%`;
};

// Local Storage Functions
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// get all items from ls
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
};

// delete item from ls
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }

    return localStorage.removeItem(key);
};

// create budget
export const createBudget = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    };
    const existingBudgets = fetchData('budgets') ?? [];

    return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newItem]));
};

// create budget
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId,
    };
    const existingExpenses = fetchData('expenses') ?? [];

    return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]));
};

// Total Spent By Budget
export const calcSpentByBudget = (budgetId) => {
    const expenses = fetchData('expenses') ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc;
        // add curr amount to total
        return (acc += expense.amount);
    }, 0);

    return budgetSpent;
};

/* FORMATTING */
// currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
    });
};
// format percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: 0,
    });
};
// format date
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();
