let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

render();

function saveExpense() {

    const amount = document.getElementById("amount").value;

    if (amount == "") return;

    expenses.push({
        id: Date.now(),
        date: new Date().toISOString(),
        category: document.getElementById("category").value,
        amount: Number(amount),
        note: document.getElementById("note").value
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("amount").value = "";
    document.getElementById("note").value = "";

    render();
}

function render() {

    let total = 0;

    let html = "";

    expenses.forEach(e => {

        total += e.amount;

        html += `
<div class="item">
<div>
<b>${e.category}</b><br>
<small>${e.note}</small>
</div>
<div>¥${e.amount}</div>
</div>
`;

    });

    document.getElementById("list").innerHTML = html;

    document.getElementById("total").innerHTML = "今日消费 ¥" + total;

}
