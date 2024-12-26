//cash payment from the user
const cash = document.getElementById("cash");

//list of change that will be give to the user
let changeDueDisplay = document.getElementById("change-due");

//the purchase button
const purchaseBtn = document.getElementById("purchase-btn");

//displayed cash in drawer
let displayCid = document.getElementById("cash-in-drawer");

//the price of the product
let price = 3.26;

//amount of each money inside the cash machine
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

//display the price
document.getElementById("price").innerHTML = `<b>Price:</b> ${price}`;

//The main function to run for computation
const checkRegister = () => {
  //Current input of the user
  let cashInt = parseFloat(cash.value);

  //The total change to give back
  let change = Number((cashInt - price).toFixed(2));

  //To get the total amount of CID
  let totalCid = Number(cid.reduce((total, sum) => total + sum[1].toFixed(2)));

  if (cashInt < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cashInt === price) {
    changeDueDisplay.innerText =
      "No change due - customer paid with exact cash";
    return;
  } else if (cash.value === "") {
    return;
  }

  //if the change is more than the total amount inside the cid
  if (change > totalCid) {
    changeDueDisplay.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  //denomination/ name and the value of the money available to give back to the user
  const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const denominationNames = [
    "ONE HUNDRED",
    "TWENTY",
    "TEN",
    "FIVE",
    "ONE",
    "QUARTER",
    "DIME",
    "NICKEL",
    "PENNY",
  ];

  //array to display for the change-due <div>
  let changeArr = [];

  //copy of the cid, not reference to the cid.
  let cidCopy = [...cid];

  for (let [index, denom] of denominations.entries()) {
    //total amount of that money to give back to user... not to confuse with the change, this is specifically talking about 1 amount. for example penny, how many penny?
    let totalDenom = 0;

    // cidCopy[cidCopy.length - 1 - index][1] basically is like cid[8][1] which shows 100 or etc...
    // while the cid[index][1] is less than 0, means if that value e.g. 1.01(from PENNY) is not less than 0 and change is still greater than or equal to denom(the 100 - 0.01)
    while (change >= denom && cidCopy[cidCopy.length - 1 - index][1] > 0) {
      //change the current value the current index to a subtracted one
      cidCopy[cidCopy.length - 1 - index][1] = Number(
        (cidCopy[cidCopy.length - 1 - index][1] - denom).toFixed(2)
      );
      //Update the remaining global change to this new change
      change = Number((change - denom).toFixed(2));

      //Update the total denom to how much of that denom will be given back to the customer
      totalDenom += denom;
    }

    console.log(`In summary, totalDenom is: ${totalDenom}`);

    //Basically execute this if the code go throug the while loop above
    if (totalDenom > 0) {
      //add an array containing [denomName, totalDenom], e.g. ["ONE HUNDRED", 200]
      changeArr.push([denominationNames[index], totalDenom]);
    }
  }

  //This will be the result if the there's nothing anymore to the denom in the cash machine...
  if (change > 0) {
    changeDueDisplay.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  //Basically the current overall total of the cash machine
  let remainingCid = cidCopy.reduce((total, sum) => total + sum[1], 0);

  //If the cash machine is empty
  if (remainingCid === 0) {
    //Display the current state of cash machine, which is mostly 0 values
    changeDueDisplay.innerHTML =
      "Status: CLOSED" +
      changeArr
        .map((inside) => `${inside[0]}: $${inside[1].toFixed(2)}`)
        .join(" ");
    cid = cid.map((denom) => [denom[0], 0]);
  } else {
    //If the cash machine is not empty display Status: Open and the values of denom
    changeDueDisplay.innerHTML =
      "Status: OPEN <br><br>" +
      changeArr
        .map((inside) => `${inside[0]}: $${inside[1].toFixed(2)} <br>`)
        .join(" ");
  }

  //Update the values of main cid to updated cid which is already processed/ subtracted
  cid = cidCopy;

  //run the displayCashInDrawer function
  displayCashInDrawer();

  //clear the input from the previous inputted value
  cash.value = "";
};

const displayCashInDrawer = () => {
  //update the displayCid/ the one that is always displayed on the right
  displayCid.innerHTML =
    "<h4>Cash in Drawer:</h4>" +
    cid
      .map((cash) => `${cash[0]}: $${cash[1].toFixed(2)} <br>`)
      .reverse()
      .join("");
};

//automatically implement the displayCashInDrawer even without trigger
window.onload = displayCashInDrawer;

//Run the checkRegister Function whenever enter key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkRegister();
  }
});

//Run the checkRegister Function whenever the purchase button is clicked.
purchaseBtn.addEventListener("click", checkRegister);
