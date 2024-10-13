let expenses = {};
let currentMonth = new Date().getMonth(); // Captura o mês atual

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('expense-name').value;
    const value = parseFloat(document.getElementById('expense-value').value);
    
    // Adiciona a despesa ao mês atual
    if (!expenses[currentMonth]) {
        expenses[currentMonth] = [];
    }
    const expense = { name, value, id: Date.now() };
    expenses[currentMonth].push(expense);

    updateExpensesTable();
    calculateTotals();

    // Limpa os campos
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-value').value = '';
});

function updateExpensesTable() {
    const tableBody = document.querySelector('#expenses-table tbody');
    tableBody.innerHTML = '';

    // Exibe todas as despesas do mês atual
    if (expenses[currentMonth]) {
        expenses[currentMonth].forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${formatCurrency(expense.value)}</td>
                <td>
                    <button onclick="editExpense(${expense.id})">Editar</button>
                    <button onclick="deleteExpense(${expense.id})">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

function calculateTotals() {
    // Calcula o total do mês atual
    let monthlyTotal = 0;
    if (expenses[currentMonth]) {
        monthlyTotal = expenses[currentMonth].reduce((total, expense) => total + expense.value, 0);
    }
    document.getElementById('monthly-total').textContent = formatCurrency(monthlyTotal);

    // Calcula o total anual somando os totais de todos os meses
    let yearlyTotal = 0;
    for (let month in expenses) {
        yearlyTotal += expenses[month].reduce((total, expense) => total + expense.value, 0);
    }
    document.getElementById('yearly-total').textContent = formatCurrency(yearlyTotal);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function editExpense(id) {
    const expense = expenses[currentMonth].find(e => e.id === id);
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-value').value = expense.value;
    
    deleteExpense(id);
}

function deleteExpense(id) {
    expenses[currentMonth] = expenses[currentMonth].filter(expense => expense.id !== id);
    updateExpensesTable();
    calculateTotals();
}

document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = 'login.html';
});
