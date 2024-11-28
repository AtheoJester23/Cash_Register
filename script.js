let cashMachine = document.querySelector(".theCid");
let changeDueDisplay = document.getElementById("change-due");

let changeDue = [
  ["ONE HUNDRED"],
  ["TWENTY"],
  ["TEN"],
  ["FIVE"],
  ["ONE"],
  ["QUARTER"],
  ["DIME"],
  ["NICKEL"],
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

let cash_in_drawer = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

let displayCID = "";

document.getElementById("purchase-btn").addEventListener("click", () => {
  let price = document.getElementById("thePrice").value;
  let input = document.getElementById("cash").value;

  let result = 0;

  let totalChange = 0;

  if (input < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else {
    totalChange = input - price;
    console.log(`the total change is: ${totalChange}`);

    console.log(typeof totalChange);

    for (let i = 0; i < cid.length; i++) {
      // let line = String(cid[i]).replace(/,/g, ": $");

      // console.log(cidRev[i][1]);

      while (totalChange >= cash_in_drawer[i]) {
        console.log(`We're at ${cash_in_drawer[i]} right now...`);
        let compute = (totalChange -= cash_in_drawer[i]);
        totalChange = compute;

        changeDueDisplay.innerHTML += `<p>${cash_in_drawer[i]}</p>`;
      }
    }

    console.log(totalChange);
  }

  // console.log(input.value.replace(/\s/g, "") - 5);
});

for (let i = 0; i < cid.length; i++) {
  let line = String(cid[i]).replace(/,/g, ": $");

  displayCID += `<p style="color: white;">${line}</p>`;
}

cashMachine.innerHTML = displayCID;
