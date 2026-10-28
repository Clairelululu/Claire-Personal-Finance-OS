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
        <small>${e.note}</small><br>
        <small style="color:#888;">
            ${e.date ? new Date(e.date).toLocaleString("zh-CN") : "旧记录"}
        </small>
    </div>

    <div style="text-align:right;">
        <div>¥${e.amount}</div>

        <button
            onclick="deleteExpense(${e.id})"
            style="
                margin-top:6px;
                border:none;
                background:#ff3b30;
                color:white;
                border-radius:8px;
                padding:4px 10px;
                cursor:pointer;
            ">
            删除
        </button>
    </div>
</div>
`;

            style="
                margin-top:6px;
                border:none;
                background:#ff3b30;
                color:white;
                border-radius:8px;
                padding:4px 10px;
                cursor:pointer;
            ">
            删除
        </button>
    </div>
</div>
`;

    });

    document.getElementById("list").innerHTML = html;

    document.getElementById("total").innerHTML = "今日消费 ¥" + total;

}
function deleteExpense(id){

    expenses = expenses.filter(e => e.id !== id);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    render();

}
