let products = [
{
    sku:"EB1001",
    name:"Vintage Chair",
    qty:10,
    price:125
},
{
    sku:"EB1002",
    name:"Industrial Lamp",
    qty:2,
    price:70
}
];

function renderProducts(){

    const table =
    document.getElementById(
        "inventoryTable"
    );

    table.innerHTML = "";

    let totalStock = 0;

    products.forEach((product,index)=>{

        totalStock += product.qty;

        table.innerHTML += `
        <tr>

            <td>

                <div class="product-info">

                    <img
                    src="https://picsum.photos/50?random=${index}"
                    class="product-image">

                    <div>

                        <div class="product-name">
                            ${product.name}
                        </div>

                        <div class="product-sku">
                            ${product.sku}
                        </div>

                    </div>

                </div>

            </td>

            <td>${product.qty}</td>

            <td>$${product.price}</td>

            <td>

                ${
                product.qty < 5

                ? `<span class="status-low">
                    Low Stock
                   </span>`

                : `<span class="status-good">
                    In Stock
                   </span>`
                }

            </td>

            <td>

                <button
                class="action-btn plus"
                onclick="increaseStock(${index})">
                    +
                </button>

                <button
                class="action-btn minus"
                onclick="decreaseStock(${index})">
                    -
                </button>

                <button
                class="action-btn edit"
                onclick="editProduct(${index})">
                    ✏️
                </button>

                <button
                class="action-btn delete"
                onclick="deleteProduct(${index})">
                    🗑️
                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById(
        "totalProducts"
    ).innerText = products.length;

    document.getElementById(
        "totalStock"
    ).innerText = totalStock;

    saveProducts();
}

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}

function loadProducts(){

    const saved =
    localStorage.getItem("products");

    if(saved){

        products =
        JSON.parse(saved);
    }
}

function addProduct(){

    const sku =
        document.getElementById("sku").value;

    const name =
        document.getElementById("name").value;

    const qty =
        Number(
            document.getElementById("qty").value
        );

    const price =
        Number(
            document.getElementById("price").value
        );

    if(!sku || !name){

        alert(
            "Please enter SKU and Name"
        );

        return;
    }

    products.push({

        sku,
        name,
        qty,
        price

    });

    document.getElementById("sku").value = "";
    document.getElementById("name").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("price").value = "";

    renderProducts();
}

function editProduct(index){

    let product =
        products[index];

    let name =
        prompt(
            "Product Name",
            product.name
        );

    if(name === null) return;

    let price =
        prompt(
            "Product Price",
            product.price
        );

    if(price === null) return;

    let qty =
        prompt(
            "Quantity",
            product.qty
        );

    if(qty === null) return;

    product.name = name;
    product.price = Number(price);
    product.qty = Number(qty);

    renderProducts();
}

function deleteProduct(index){

    const confirmed =
        confirm(
            "Delete this product?"
        );

    if(!confirmed){
        return;
    }

    products.splice(index,1);

    renderProducts();
}

function increaseStock(index){

    products[index].qty++;

    renderProducts();
}

function decreaseStock(index){

    if(products[index].qty > 0){

        products[index].qty--;
    }

    renderProducts();
}

function toggleTheme(){

    document.body.classList.toggle(
        "dark"
    );

    const darkMode =
        document.body.classList.contains(
            "dark"
        );

    localStorage.setItem(
        "theme",
        darkMode
    );

    const btn =
        document.getElementById(
            "themeBtn"
        );

    if(darkMode){

        btn.innerHTML =
        "☀️ Light Mode";

    }else{

        btn.innerHTML =
        "🌙 Dark Mode";
    }
}

window.onload = () => {

    loadProducts();

    renderProducts();

    if(
        localStorage.getItem(
            "theme"
        ) === "true"
    ){

        document.body.classList.add(
            "dark"
        );

        document.getElementById(
            "themeBtn"
        ).innerHTML =
        "☀️ Light Mode";
    }

    const ctx =
    document.getElementById(
        "salesChart"
    );

    if(ctx){

        new Chart(ctx,{

            type:"line",

            data:{

                labels:[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],

                datasets:[{

                    label:"Revenue",

                    data:[
          6200,
                        8400,
                        9600,
                        12400
                    ],

                    borderColor:"#3b82f6",

                    backgroundColor:
                    "rgba(59,130,246,.12)",

                    fill:true,

                    tension:.4
                }]
            },

            options:{

                responsive:true,

                plugins:{
                    legend:{
                        display:true
                    }
                }
            }
        });
    }
};
