let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingId = null;

render();

function saveExpense() {

    const amount = document.getElementById("amount").value.trim();

    if (amount === "") {
        alert("请输入金额");
        return;
    }

    const old = expenses.find(e => e.id === editingId);

    const item = {
        id: editingId || Date.now(),
        date: old ? old.date : new Date().toISOString(),
        category: document.getElementById("category").value,
        amount: Number(amount),
        note: document.getElementById("note").value.trim()
    };

    if (editingId) {
        expenses = expenses.map(e => e.id === editingId ? item : e);
        editingId = null;
    } else {
        expenses.unshift(item);
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("amount").value = "";
    document.getElementById("note").value = "";
    document.getElementById("category").selectedIndex = 0;

    render();
}

function render() {

    let total = 0;

    let html = "";

    expenses.forEach(e => {

        total += Number(e.amount);

        html += `
<div class="item">

    <div class="left">

        <div class="title">${e.category}</div>

        <div class="note">${e.note || ""}</div>

        <div class="date">
            ${formatDate(e.date)}
        </div>

    </div>

    <div class="right">

        <div class="money">
            ¥${Number(e.amount).toFixed(2)}
        </div>

        <button class="editBtn"
            onclick="editExpense(${e.id})">
            编辑
        </button>

        <button class="deleteBtn"
            onclick="deleteExpense(${e.id})">
            删除
        </button>

    </div>

</div>
`;

    });

    document.getElementById("list").innerHTML = html;

    document.getElementById("total").innerHTML =
        "¥" + total.toFixed(2);

    document.getElementById("count").innerHTML =
        expenses.length;
}

function deleteExpense(id) {

    if (!confirm("确定删除吗？")) return;

    expenses = expenses.filter(e => e.id !== id);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    render();
}

function editExpense(id) {

    const e = expenses.find(x => x.id === id);

    if (!e) return;

    document.getElementById("amount").value = e.amount;
    document.getElementById("category").value = e.category;
    document.getElementById("note").value = e.note;

    editingId = id;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function formatDate(dateString){

    if(!dateString) return "";

    const d = new Date(dateString);

    return d.toLocaleString("zh-CN",{
        year:"numeric",
        month:"2-digit",
        day:"2-digit",
        hour:"2-digit",
        minute:"2-digit"
    });

}
