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

// delete item
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key);
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
