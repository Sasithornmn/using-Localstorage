document.addEventListener("DOMContentLoaded", function () {
  LoadMenuItems();
  setupPayBillButton();
  updateOrdersDisplay();
});

function LoadMenuItems() {
  fetch("menu.json")
    .then((Response) => Response.json())
    .then((menuItems) => {
      const menuContainer = document.querySelector(".menu");
      menuContainer.innerHTML = "";

      menuItems.forEach((item) => {
        const menuItemElement = document.createElement("div");
        menuItemElement.classList.add("menu-item");
        menuItemElement.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.price}</p> `;
        menuContainer.appendChild(menuItemElement);

        menuItemElement.addEventListener("click", function () {
          let orders = 
            JSON.parse(localStorage.getItem("customerOrders")) || [];
          const existingOderIndex = orders.findIndex(
            (order) => order.name === item.name
          );

          if (existingOderIndex > -1) {
            orders[existingOderIndex].quantity += 1;
          } else {
            orders.push({ name: item.name, price: item.price, quantity: 1 });
          }

          localStorage.setItem("customerOrders", JSON.stringify(orders));
          updateOrdersDisplay();
        });
      });
    });
}

function updateOrdersDisplay() {
  const ordersPanel = document.querySelector("orders-panel");
  const ordersList = document.getElementById("orders-list");
  const totalCostElement = document.getElementById("total-cost");
  let orders = JSON.parse(localStorage.getItem("customerOrders")) || [];
  let totalCost = 0;

  ordersList.innerHTML = "";

  orders.forEach((order) => {
    const li = document.createElement("li");
    li.textContent = `${order.name} - Quantity: ${order.quantity} - Price: ${order.price}`;
    ordersList.appendChild(li);

    const price = parseFloat(order.price.replace("$", ""));
    totalCost += price * order.quantity;
  });

  totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
}

function setupPayBillButton() {
  const payBillButton = document.getElementById("pay-bill-btn");
  payBillButton.addEventListener("click", function () {
    // localStorage.clear();
    localStorage.removeItem("customerOrders");
    updateOrdersDisplay();
  });
}
