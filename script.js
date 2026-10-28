let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let editingId = null;

render();

function saveExpense() {

    const amount = document.getElementById("amount").value;

    if (amount == "") return;

const item = {
    id: editingId || Date.now(),
    date: new Date().toISOString(),
    category: document.getElementById("category").value,
    amount: Number(amount),
    note: document.getElementById("note").value
};

if (editingId) {
    expenses = expenses.map(e => e.id === editingId ? item : e);
    editingId = null;
} else {
    expenses.push(item);
}

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
            删除<button
    onclick="editExpense(${e.id})"
    style="
        margin-top:6px;
        border:none;
        background:#007aff;
        color:white;
        border-radius:8px;
        padding:4px 10px;
        cursor:pointer;
    ">
    编辑
</button>
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
function editExpense(id){

    const e = expenses.find(x => x.id === id);

    document.getElementById("amount").value = e.amount;
    document.getElementById("category").value = e.category;
    document.getElementById("note").value = e.note;

    editingId = id;

}
    expenses = expenses.filter(e => e.id !== id);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    render();

}
