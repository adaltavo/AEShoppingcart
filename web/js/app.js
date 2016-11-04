
//broda 

$(function () {
    /*SmartCart
     $('#SmartCart').smartCart ({
     selected: 0, // 0 = produts list, 1 = cart  
     resultName: 'products_selected[]',
     enableImage: true,
     enableImageTooltip: true,
     enableSearch: true,
     enableCategoryFilter: true,
     productItemTemplate:'<strong><%=pname%></strong><br />Category:<%=pcategory%><br/><small><%=pdesc%></small><br/><strong>Price:<%=pprice%></strong>',
     //cartItemTemplate:'<strong><%=pname%></strong>',
     // Events
     onAdd: null,
     onAdded: null,
     onRemove: null,
     onRemoved: null,
     onUpdate: null,
     onUpdated: null,
     onCheckout: null
     });
     */
    simpleCart({
        cartStyle: "table",
        cartColumns: [
            {attr: "name", label: "Nombre"},
            {attr: "size", label: "Talla"},
            {attr: "price", label: "Precio", view: 'currency'},
            {view: "decrement", label: false, text: "-"},
            {attr: "quantity", label: "Cantidad"},
            {view: "increment", label: false, text: "+"},
            {attr: "total", label: "SubTotal", view: 'currency'},
            {view: "remove", text: "Remover", label: false}
        ],
        checkout: {
            type: "PayPal",
            email: "you@yours.com"
        },
        tax: 0.075,
        currency: "MXN",
        afterAdd: function () {
            console.log("huehuehdushdfjshdjfskdj");
            //$('.simpleCart_items table').addClass();
            //$('.simpleCart_items table').addClass('table table-hover');
            //$(".simpleCart_items table tr").wrapAll('<tbody></tbody>');
        },
        /*
         afterRemove : function () {
         console.log("huehuehdushdfjshdjfskdj");
         //$('.simpleCart_items table').addClass();
         $('.simpleCart_items table').addClass('table table-hover');
         $(".simpleCart_items table tr").wrapAll('<tbody></tbody>');
         }
         */
    });
    simpleCart.update();

    //Obtener lista de productos
    var products = "";
    $.getJSON("http://localhost:8080/AEEcommerce/GetProducts", function (data) {
        // Get the element with id summary and set the inner text to the result.
        //console.log(data.msg);
        products = $.parseJSON(data.msg);
        products.forEach(function (element) {
            var item = $('<div><div>').addClass('simpleCart_shelfItem');
            item.append('<img width="250" height="150" alt=producto src="http://'+element.image+'">');//cambiar src por ruta servlet imagen de producto
            item.append('<h3 class="item_name">'+element.productname+'</h3>');
            item.append('<h4 class="item_price">Precio: '+numeral(element.salepricemin).format('$0,0.00')+'</h4>');
            item.append('<input class="item_Quantity input" type="number" />');
            item.append('<a href="javascript:;" title="Agregar al carrito" class="item_add"><i class="glyphicon glyphicon-plus-sign" style=" font-size: 20px;"></i></a>');
            
            
            $('#cartShelf').append(item);
        });
        
       
    });
});

function showModal() {
    $("#modalCart").modal('show');
}

