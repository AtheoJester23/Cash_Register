let cashMachine = document.querySelector(".theCid");

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

let displayCID = "";

document.getElementById("purchase-btn").addEventListener("click", () => {
  const price = document.getElementById("thePrice");
  let input = document.getElementById("cash").value;

  let result = 0;

  console.log(input);

  console.log(price.value);

  // console.log(input.value.replace(/\s/g, "") - 5);

  for (let i = 0; i < cid.length; i++) {
    // let line = String(cid[i]).replace(/,/g, ": $");

    // console.log(cid[i][1]);

    while (input >= cid[i][1]) {
      console.log(i);
      let compute = (input -= cid[i][1]);
      result = compute;
    }
  }

  console.log(result);
});

for (let i = 0; i < cid.length; i++) {
  let line = String(cid[i]).replace(/,/g, ": $");

  displayCID += `<p style="color: white;">${line}</p>`;
}

cashMachine.innerHTML = displayCID;
