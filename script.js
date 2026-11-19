const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const money = value => value.toLocaleString("pt-BR", {
  style: "currency", currency: "BRL"
});

document.getElementById("calculate").addEventListener("click", () => {
  const incomeInput = document.getElementById("income");
  const expensesInput = document.getElementById("expenses");
  const result = document.getElementById("result");
  const income = Number(incomeInput.value);
  const expenses = Number(expensesInput.value);

  if (incomeInput.value === "" || expensesInput.value === "" ||
      !Number.isFinite(income) || !Number.isFinite(expenses) ||
      income < 0 || expenses < 0) {
    result.className = "result negative";
    result.textContent = "Informe valores válidos e iguais ou maiores que zero nos dois campos.";
    return;
  }

  const balance = income - expenses;
  const percentage = income > 0 ? (balance / income) * 100 : 0;
  result.className = balance >= 0 ? "result positive" : "result negative";

  if (balance > 0) {
    result.textContent = `Sobram ${money(balance)} neste mês (${percentage.toFixed(1).replace(".", ",")}% da renda). Considere direcionar uma parte para seus objetivos e sua reserva.`;
  } else if (balance < 0) {
    result.textContent = `Seus gastos ultrapassam a renda em ${money(Math.abs(balance))}. Revise despesas e priorize o que é essencial.`;
  } else {
    result.textContent = "Sua renda está totalmente comprometida. Tente criar uma pequena margem para imprevistos.";
  }
});
