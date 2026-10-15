let products = [
    {
        sku: "EB1001",
        name: "Vintage Chair",
        qty: 10,
        price: 125
    },
    {
        sku: "EB1002",
        name: "Industrial Lamp",
        qty: 2,
        price: 70
    }
];

function showForm() {
    document
        .getElementById("productForm")
        .classList.toggle("hidden");
}

function renderProducts() {

    const table =
        document.getElementById("inventoryTable");

    table.innerHTML = "";

    let totalStock = 0;

    products.forEach((product,index) => {

        totalStock += product.qty;

        let status =
            product.qty < 5
            ? "<span class='low-stock'>Low Stock</span>"
            : "<span class='good-stock'>In Stock</span>";

        table.innerHTML += `
        <tr>
            <td>${product.sku}</td>
            <td>${product.name}</td>
            <td>${product.qty}</td>
            <td>$${product.price}</td>
            <td>${status}</td>
            <td>
                <button onclick="increaseStock(${index})">+</button>
                <button onclick="decreaseStock(${index})">-</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalProducts").innerText =
        products.length;

    document.getElementById("totalStock").innerText =
        totalStock;
}

function addProduct() {

    const sku =
        document.getElementById("sku").value;

    const name =
        document.getElementById("name").value;

    const qty =
        parseInt(document.getElementById("qty").value);

    const price =
        parseFloat(document.getElementById("price").value);

    if(!sku || !name) return;

    products.push({
        sku,
        name,
        qty,
        price
    });

    renderProducts();
}

function increaseStock(i){
    products[i].qty++;
    renderProducts();
}

function decreaseStock(i){
    if(products[i].qty > 0){
        products[i].qty--;
    }
    renderProducts();
}

renderProducts();
``
