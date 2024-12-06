const CID = document.querySelector(".theCID");

// Cash drawer in the array format
const cashDrawer = [
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

console.log(cashDrawer);

for (const something of cashDrawer) {
  let stringedCID = String(something).replace(/,/g, ": $");

  CID.innerHTML += `<p>${stringedCID}</p>`;
}

function calculateChange() {
  // Get input values
  const price = parseFloat(document.getElementById("price").value);
  const amountGiven = parseFloat(document.getElementById("amountGiven").value);

  if (amountGiven < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (amountGiven === price) {
    document.getElementById("result").innerHTML =
      "No change due - customer paid with exact cash";
    return;
  }

  const changeOwed = amountGiven - price;

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

  let remainingChange = changeOwed;
  const changeToGive = [];

  for (const denom of denominations) {
    if (remainingChange <= 0) break;

    // Find the corresponding denomination in the cash drawer
    const drawerItem = cashDrawer.find((item) => item[0] === denom.name);

    // Calculate how many of this denomination we can give
    const count = Math.min(
      Math.floor(remainingChange / denom.value),
      Math.floor(drawerItem[1] / denom.value)
    );

    console.log(count);

    if (count > 0) {
      const amountToGive = count * denom.value;

      // Deduct from cashDrawer
      drawerItem[1] -= amountToGive.toFixed(2);

      changeToGive.push([denom.name, count * denom.value]);
      remainingChange -= count * denom.value;
      remainingChange = Math.round(remainingChange * 100) / 100; // Avoid floating-point errors
    }
  }

  // Display the result
  const resultDiv = document.getElementById("result");

  if (remainingChange > 0) {
    resultDiv.innerHTML = "Status: INSUFFICIENT_FUNDS";
  } else {
    CID.innerHTML = ``;
    resultDiv.innerHTML = `<h3>Change Owed: $${changeOwed.toFixed(2)}</h3>`;
    resultDiv.innerHTML = `<p>Status: OPEN</p>`;

    changeToGive.forEach((item) => {
      resultDiv.innerHTML += `<p>${item[1].toFixed(2)} in ${item[0]}</p>`;
    });

    cashDrawer.forEach((theChange) => {
      CID.innerHTML += `<p>${String(theChange).replace(/,/, ": $")}</p>`;
    });
  }
}
