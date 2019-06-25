var cateogries = [{
    "id": 1,
    "name": "Ropa",
    "created_at": "2019-06-10 14:10:33",
    "updated_at": "2019-06-10 14:10:33"
}, {
    "id": 2,
    "name": "Tecnolog\u00eda",
    "created_at": "2019-06-10 14:10:33",
    "updated_at": "2019-06-10 14:10:33"
}, {
    "id": 3,
    "name": "Hogar",
    "created_at": "2019-06-10 14:10:33",
    "updated_at": "2019-06-10 14:10:33"
}, {
    "id": 4,
    "name": "Libros",
    "created_at": "2019-06-10 14:10:33",
    "updated_at": "2019-06-10 14:10:33"
}]

var products = [{
        "id": 1,
        "category_id": 1,
        "name": "Camisa Tipo Polo",
        "picture": "",
        "price": 45000,
        "quantity": 2,
        "created_at": "2019-06-10 14:10:33",
        "updated_at": "2019-06-10 14:10:33",
        "category": {
            "id": 1,
            "name": "Ropa",
            "created_at": "2019-06-10 14:10:33",
            "updated_at": "2019-06-10 14:10:33"
        }
    },
    {
        "id": 2,
        "category_id": 2,
        "name": "Televisor 49\"",
        "picture": "",
        "price": 1245000,
        "quantity": 1,
        "created_at": "2019-06-10 14:10:33",
        "updated_at": "2019-06-10 14:10:33",
        "category": {
            "id": 2,
            "name": "Tecnología",
            "created_at": "2019-06-10 14:10:33",
            "updated_at": "2019-06-10 14:10:33"
        }
    },
    {
        "id": 3,
        "category_id": 3,
        "name": "Sofá Gianini",
        "picture": "",
        "price": 1148810,
        "quantity": 2,
        "created_at": "2019-06-10 14:10:33",
        "updated_at": "2019-06-10 14:10:33",
        "category": {
            "id": 3,
            "name": "Hogar",
            "created_at": "2019-06-10 14:10:33",
            "updated_at": "2019-06-10 14:10:33"
        }
    },
    {
        "id": 4,
        "category_id": 2,
        "name": "Play Station 4",
        "picture": "",
        "price": 1200000,
        "quantity": 2,
        "created_at": "2019-06-10 14:10:33",
        "updated_at": "2019-06-10 14:10:33",
        "category": {
            "id": 2,
            "name": "Tecnología",
            "created_at": "2019-06-10 14:10:33",
            "updated_at": "2019-06-10 14:10:33"
        }
    },
    {
        "id": 5,
        "category_id": 4,
        "name": "GOT Libro",
        "picture": "",
        "price": 90000,
        "quantity": 1,
        "created_at": "2019-06-10 14:10:33",
        "updated_at": "2019-06-10 14:10:33",
        "category": {
            "id": 4,
            "name": "Libros",
            "created_at": "2019-06-10 14:10:33",
            "updated_at": "2019-06-10 14:10:33"
        }
    }
]

function loadInfo() {
    loadCategories()
    loadProducts()
    //renderCategories()
    //renderProducts()
}

function loadCategories() {
    $.get('https://owak.co/prueba/public/index.php/api/categories', function (data, status) {
        //console.log('Data', data)
        cateogries = data;
        renderCategories()
    })
}

function loadProducts() {
    $.get('https://owak.co/prueba/public/index.php/api/products', function (data, status) {
        //console.log('Data', data)
        products = data;
        renderProducts()
    })
}

function renderCategories() {
    var output = ""
    cateogries.forEach(element => {
        //console.log(element)
        output = `${output} 
        <div class="category-card">
        <div class="category-image">
            <img src="./static/img/categories/clothing.png">
        </div>
        <h3>${element.name}</h3>
    </div>`
    });
    let categorieWrapper = document.getElementById('categoires')
    console.log(categorieWrapper)
    categorieWrapper.innerHTML = output
}

function renderProducts() {
    var output = ""
    products.forEach(element => {
        //console.log(element)
        output = output + `${checkCategorie(element)}`
    });
    let productsWrapper = document.getElementById('products-wrapper')
    console.log(productsWrapper)
    productsWrapper.innerHTML = output
}

function checkCategorie(element) {
    //console.log(element)
    var output = '';
    cateogries.forEach(cat => {
        //console.log('Element Category', element.category_id)
        //console.log('Category Id', cat.id)
        if (element.category_id == cat.id) {
            console.log('Match')
            output = `<div class="product-card">
                    <div class="image-contianer">
                        <div class="tag" style="background:${tagColor(cat.id)}">${cat.name}</div>
                        <img src="./static/img/products/shirt.png">
                    </div>
                    <div class="product-info">
                        <p class="product-name">${element.name}</p>
                        <p class="product-price">Precio: $${formatMoney(element.price)}</p>
                    </div>
                </div>`

        }
    })
    return output
}

function tagColor(id) {
    if (id == 1) {
        return '#499aea'
    }
    if (id == 2) {
        return '#eab749'
    }
    if (id == 3) {
        return '#f23604'
    }
    if (id == 4) {
        return '#7e49ea'
    }
}


function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ".") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};