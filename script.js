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
                    class="product-image"
                    src="https://picsum.photos/50?random=${index}">

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
                ? "<span class='status-low'>Low Stock</span>"
                : "<span class='status-good'>In Stock</span>"
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
                    −
                </button>

                <button
                    class="action-btn edit"
                    onclick="editProduct(${index})">
                    ✏️
                </button>

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

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}

function addProduct(){

    const sku =
    document.getElementById("sku").value;

    const name =
    document.getElementById("name").value;

    const qty =
    Number(document.getElementById("qty").value);

    const price =
    Number(document.getElementById("price").value);

    if(!sku || !name) return;

    products.push({
        sku,name,qty,price
    });

    renderProducts();
}

function increaseStock(index){
    products[index].qty++;
    renderProducts();
}

function decreaseStock(index){
    products[index].qty--;
    renderProducts();
}

function deleteProduct(index){

    if(confirm("Delete product?")){

        products.splice(index,1);

        renderProducts();
    }
}

function editProduct(index){

    const product =
    products[index];

    product.name =
    prompt(
        "Product Name",
        product.name
    ) || product.name;

    product.price =
    Number(
        prompt(
            "Price",
            product.price
        )
    );

    product.qty =
    Number(
        prompt(
            "Quantity",
            product.qty
        )
    );

    renderProducts();
}

function toggleTheme(){

    document.body.classList.toggle(
        "dark"
    );

    localStorage.setItem(
        "theme",
        document.body.classList.contains(
            "dark"
        )
    );
}

window.onload = () => {

    const savedProducts =
    localStorage.getItem(
        "products"
    );

    if(savedProducts){

        products =
        JSON.parse(
            savedProducts
        );
    }

    if(
        localStorage.getItem(
            "theme"
        ) === "true"
    ){
        document.body.classList.add(
            "dark"
        );
    }

    renderProducts();

    new Chart(
        document.getElementById(
            "salesChart"
        ),
        {
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
                        3200,
                        4500,
                        6200,
                        8400,
                        9600,
                        12400
                    ],
                    borderColor:"#3b82f6",
                    fill:true
                }]
            }
        }
    );
};
