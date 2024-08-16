// key press off with out number
const numberInputs = document.querySelectorAll("input[type='text']");

numberInputs.forEach((input) => {
  input.addEventListener("input", function (event) {
    // Remove all non-digit characters except the decimal point
    let sanitizedValue = event.target.value.replace(/[^\d.]/g, "");

    // If the input has a decimal point, split the value into integer and decimal parts
    if (sanitizedValue.includes(".")) {
      const parts = sanitizedValue.split(".");

      // Format the integer part with commas every three digits from the right
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // Reconstruct the value with commas and the decimal part
      sanitizedValue = integerPart + (parts.length > 1 ? "." + parts[1] : "");
    } else {
      // Format the entire input value with commas every three digits from the right
      sanitizedValue = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    event.target.value = sanitizedValue;
  });
});

// key press off with out number

const monthlyIncome = document.getElementById("Monthly_Income");

const tithesAmount = document.getElementById("Tithes_amount");
const savingsAmount = document.getElementById("Savings_amount");
const netAmountForBills = document.getElementById("netAmountForBills");
const mortgage = document.getElementById("mortgage");
const carNote = document.getElementById("carNote");
const insurance = document.getElementById("insurance");
const creditCard = document.getElementById("creditCard");
const internet = document.getElementById("internet");
const cable = document.getElementById("cable");
const cellPhone = document.getElementById("cellPhone");
const securitySystem = document.getElementById("securitySystem");
const electric = document.getElementById("electric");
const water = document.getElementById("water");
const otherUtilies = document.getElementById("otherUtilies");
const childCareTuition = document.getElementById("childCareTuition");
const studentLoans = document.getElementById("studentLoans");
const otherLoans = document.getElementById("otherLoans");
const houseKeeper = document.getElementById("houseKeeper");
const lawnCare = document.getElementById("lawnCare");
const monthlyFixedExpenses = document.getElementById("monthlyFixedExpenses");
// Get all input elements with class "numberInput"
const expensesInputs = document.querySelectorAll(".numberInput");
const VariableExpenses = document.querySelectorAll(".VariableExpenses");
const totalSpan = document.getElementById("totalExpenses");
const totalVariableExpenses = document.getElementById("totalVariableExpenses");
const netAmount = document.getElementById("netAmountForBill");
const fixedExpensesWealth = document.getElementById("fixedExpensesWealth");
const variableExpensesWealth = document.getElementById(
  "variableExpensesWealth"
);
const dynamicBgTotalNetWorth = document.getElementById(
  "NetMonthlyWealthDaynamicColor"
);
const NetMonthlyWealth = document.getElementById("NetMonthlyWealth");
const calculateAmountForBills = () => {
  const inputValue = monthlyIncome.value;
  const tithesIncome = (parseFloat(inputValue.replace(/,/g, "")) / 100) * 10;
  const savingsAmountPerMonth =
    (parseFloat(inputValue.replace(/,/g, "")) / 100) * 10;

  const tithesComma = tithesIncome ? tithesIncome.toFixed(2) : 0;
  const savingComma = savingsAmountPerMonth
    ? savingsAmountPerMonth?.toFixed(2)
    : 0;
  const savingAmountComma = parseFloat(savingComma)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  savingsAmount.textContent = savingAmountComma;

  const tithesAmountComma = parseFloat(tithesComma)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  tithesAmount.textContent = tithesAmountComma;
  const TotalAmount =
    parseFloat(inputValue.replace(/,/g, "")) -
    (tithesIncome + savingsAmountPerMonth);

  const netAmountForBillsComma = TotalAmount ? TotalAmount?.toFixed(2) : 0;
  const monthlyIncomeComma = parseFloat(netAmountForBillsComma)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  netAmountForBills.textContent = monthlyIncomeComma;

  // Set the replaced value back to the input field

  calculateNetMonthWealth();
};
function calculateTotal() {
  let total = 0;

  expensesInputs.forEach((input) => {
    total += parseFloat(input.value.replace(/,/g, "")) || 0;
  });
  const totalComma = parseFloat(total)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  totalSpan.textContent = totalComma;
  calculateNetMonthWealth();
}
expensesInputs.forEach((input) => {
  input.addEventListener("input", calculateTotal);
});
function calculateTotalVariableExpenses() {
  let total = 0;
  VariableExpenses.forEach((input) => {
    total += parseFloat(input.value.replace(/,/g, "")) || 0;
  });
  const totalComma = parseFloat(total)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  totalVariableExpenses.textContent = totalComma;
  calculateNetMonthWealth();
}
VariableExpenses.forEach((input) => {
  input.addEventListener("input", calculateTotalVariableExpenses);
});

function calculateNetMonthWealth() {
  const netAmountWealth =
    parseFloat(netAmountForBills.innerText.replace(/,/g, "")) || 0;
  const fixedExpenses = parseFloat(totalSpan.innerText.replace(/,/g, "")) || 0;
  const variableExpenses =
    parseFloat(totalVariableExpenses.innerText.replace(/,/g, "")) || 0;
  netAmount.innerText = netAmountForBills.innerText;
  fixedExpensesWealth.innerText = totalSpan.innerText;
  variableExpensesWealth.innerText = totalVariableExpenses.innerText;
  const ExpensesTotal =
    parseFloat(fixedExpenses.toFixed(2).replace(/,/g, "")) +
    parseFloat(variableExpenses.toFixed(2).replace(/,/g, ""));
  const total = parseFloat(netAmountWealth) - ExpensesTotal;
  NetMonthlyWealth.innerText = total
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  total > 100
    ? (dynamicBgTotalNetWorth.style.backgroundColor = "#1fb655")
    : total <= 100 && total > 0
    ? (dynamicBgTotalNetWorth.style.backgroundColor = "yellow")
    : total == 0
    ? (dynamicBgTotalNetWorth.style.backgroundColor = "#ff06b7")
    : (dynamicBgTotalNetWorth.style.backgroundColor = "red");
}

calculateAmountForBills();
calculateTotal();
calculateTotalVariableExpenses();
calculateNetMonthWealth();
/*  parseFloat(netAmountWealth) === 0
      ? ExpensesTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); */
