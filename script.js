let cashMachine = document.querySelector(".theCid");
let changeDueDisplay = document.getElementById("change-due");

const denominations = [
  { name: "ONE HUNDRED", value: 100 },
  { name: "TWENTY", value: 20 },
  { name: "TEN", value: 10 },
  { name: "FIVE", value: 5 },
  { name: "ONE", value: 1 },
  { name: "QUARTER", value: 0.25 },
  { name: "DIME", value: 0.1 },
  { name: "NICKEL", value: 0.05 },
  { name: "PENNY", value: 0.01 },
];

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

let theRev = cid.reverse();

let cidVariable = [];

let cash_in_drawer = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

for (const cash of cid) {
  cashMachine.innerHTML += `<p style="color: white">${String(cash).replace(
    /,/,
    ": $"
  )}</p>`;
}

function calculateChange() {
  let thePrice = parseFloat(document.getElementById("thePrice").value);
  let givenAmount = parseFloat(document.getElementById("cash").value);

  if (givenAmount < thePrice) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (givenAmount === thePrice) {
    changeDueDisplay.innerHTML =
      "<p>No change due - customer paid with exact cash</p>";
  }

  let theChange = givenAmount - thePrice;

  console.log(theChange);
  for (const item of denominations) {
  }
}
