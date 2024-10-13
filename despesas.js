let expenses = {};
let currentYear = new Date().getFullYear(); // Captura o ano atual
let currentMonth = new Date().getMonth(); // Captura o mês atual (0 = janeiro, 11 = dezembro)

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('expense-name').value;
    const value = parseFloat(document.getElementById('expense-value').value);
    
    // Adiciona a despesa ao mês e ano atuais
    if (!expenses[currentYear]) {
        expenses[currentYear] = {}; // Cria o ano se não existir
    }
    if (!expenses[currentYear][currentMonth]) {
        expenses[currentYear][currentMonth] = []; // Cria o mês se não existir
    }

    const expense = { name, value, id: Date.now() };
    expenses[currentYear][currentMonth].push(expense);

    updateExpensesTable();
    calculateTotals();

    // Limpa os campos
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-value').value = '';
});

function updateExpensesTable() {
    const tableBody = document.querySelector('#expenses-table tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de atualizá-la

    // Exibe as despesas por ano e por mês
    for (let year in expenses) {
        // Adiciona um cabeçalho para o ano
        const yearRow = document.createElement('tr');
        yearRow.innerHTML = `<td colspan="3"><strong>Despesas de ${year}</strong> <button onclick="toggleYear(${year})">Ver/Esconder</button></td>`;
        tableBody.appendChild(yearRow);

        // Container para as despesas do ano (que podem ser escondidas)
        const yearContainer = document.createElement('tbody');
        yearContainer.id = `year-${year}`;
        tableBody.appendChild(yearContainer);

        for (let month in expenses[year]) {
            const monthName = getMonthName(month);
            const monthRow = document.createElement('tr');
            monthRow.innerHTML = `<td colspan="3"><strong>${monthName} de ${year}</strong></td>`;
            yearContainer.appendChild(monthRow);

            // Exibe as despesas do mês
            expenses[year][month].forEach(expense => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${expense.name}</td>
                    <td>${formatCurrency(expense.value)}</td>
                    <td>
                        <button onclick="editExpense(${year}, ${month}, ${expense.id})">Editar</button>
                        <button onclick="deleteExpense(${year}, ${month}, ${expense.id})">Excluir</button>
                    </td>
                `;
                yearContainer.appendChild(row);
            });
        }
    }
}

function calculateTotals() {
    let monthlyTotal = 0;
    if (expenses[currentYear] && expenses[currentYear][currentMonth]) {
        monthlyTotal = expenses[currentYear][currentMonth].reduce((total, expense) => total + expense.value, 0);
    }
    document.getElementById('monthly-total').textContent = formatCurrency(monthlyTotal);

    let yearlyTotal = 0;
    for (let year in expenses) {
        for (let month in expenses[year]) {
            yearlyTotal += expenses[year][month].reduce((total, expense) => total + expense.value, 0);
        }
    }
    document.getElementById('yearly-total').textContent = formatCurrency(yearlyTotal);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function getMonthName(monthIndex) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames[monthIndex];
}

function editExpense(year, month, id) {
    const expense = expenses[year][month].find(e => e.id === id);
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-value').value = expense.value;

    deleteExpense(year, month, id);
}

function deleteExpense(year, month, id) {
    expenses[year][month] = expenses[year][month].filter(expense => expense.id !== id);
    updateExpensesTable();
    calculateTotals();
}

function toggleYear(year) {
    const yearContainer = document.getElementById(`year-${year}`);
    if (yearContainer.style.display === 'none') {
        yearContainer.style.display = '';
    } else {
        yearContainer.style.display = 'none';
    }
}

// Função para redirecionar para a página de login ao clicar no botão "Sair"
document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = 'login.html'; // Redireciona para a página de login
});
