var cart = [];

var products = [
    {
        id: 1,
        name: "Camera",
        price: 10000,
        image: "📸.jpg"
    },
    {
        id: 2,
        name: "Piano",
        price: 20000,
        image: "download (1).jpg"
    },
    {
        id: 3,
        name: "Violin",
        price: 25000,
        image: "download (2).jpg"
    }
];

var productList = document.getElementById("productList");
var cartItems = document.getElementById("cartItems");
var totalPrice = document.getElementById("totalPrice");

for (var i = 0; i < products.length; i++) {
    var product = products[i];

    productList.innerHTML +=
        '<div class="product">' +
            '<img class="product-image" src="' + product.image + '" alt="' + product.name + '">' +
            '<h3>' + product.name + '</h3>' +
            '<p>Rs. ' + product.price + '</p>' +
            '<button onclick="addToCart(' + product.id + ')">Add to Cart</button>' +
        '</div>';
}

function addToCart(id) {
    var product;
    var existingItem;

    for (var i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            product = products[i];
        }
    }

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            existingItem = cart[i];
        }
    }

    if (existingItem) {
        existingItem.quantity++;
    } else {
        var newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        };

        cart.push(newItem);
    }

    renderCart();
}

function changeQuantity(id, amount) {
    var item;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            item = cart[i];
        }
    }

    item.quantity = item.quantity + amount;

    if (item.quantity < 1) {
        item.quantity = 1;
    }

    renderCart();
}

function removeFromCart(id) {
    var newCart = [];

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }

    cart = newCart;
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];

        cartItems.innerHTML +=
            '<div class="cart-row">' +
                '<div class="cart-product">' +
                    '<img src="' + item.image + '" alt="' + item.name + '">' +
                    '<strong>' + item.name + '</strong>' +
                '</div>' +
                '<div>Rs. ' + item.price + '</div>' +
                '<div class="quantity">' +
                    '<button onclick="changeQuantity(' + item.id + ', -1)">-</button>' +
                    '<span>' + item.quantity + '</span>' +
                    '<button onclick="changeQuantity(' + item.id + ', 1)">+</button>' +
                '</div>' +
                '<div>Rs. ' + (item.price * item.quantity) + '</div>' +
                '<button class="remove" onclick="removeFromCart(' + item.id + ')">Remove</button>' +
            '</div>';
    }

    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        total = total + cart[i].price * cart[i].quantity;
    }

    totalPrice.innerHTML = "Total: Rs. " + total;
}