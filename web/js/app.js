
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
            {attr: "stock", label: "Stock"},
            {attr: "price", label: "Precio", view: 'currency'},
            //{view: "decrement", label: false, text: "-"},
            {attr: "quantity", label: "Cantidad"},
            //{view: "increment", label: false, text: "+"},
            {attr: "total", label: "SubTotal", view: 'currency'},
            {view: "remove", text: "Ya no lo quiero", label: false}
        ],
        checkout: {
            type: "SendForm",
            url: "http://localhost:8080/AEEcommerce/Checkout",
            // http method for form, "POST" or "GET", default is "POST"
            //method: "POST",
            // url to return to on successful checkout, default is null
            success: "http://localhost:8080/ShoppingCart/success.html",
            // url to return to on cancelled checkout, default is null
            cancel: "http://localhost:8080/ShoppingCart/cancel.html",
            // an option list of extra name/value pairs that can
            // be sent along with the checkout data
            /* extra_data: {
             storename: "Bob's cool plumbing store",
             cartid: "12321321"
             }*/
            //formato checkout-form
            //http://localhost:8080/AEEcommerce/Checkout?currency=MXN&shipping=0&tax=0&taxRate=0&itemCount=2&item_name_1=Nuevo&item_quantity_1=1&item_price_1=7567&item_options_1=stock%3A+Stock%3A+7+&item_name_2=grecia&item_quantity_2=3&item_price_2=7&item_options_2=stock%3A+Stock%3A+8+&return=success.html&cancel_return=cancel.html&storename=Bob%27s+cool+plumbing+store&cartid=12321321
        },
        tax: 0.075,
        currency: "MXN",
        afterAdd: function () {
            //console.log(this.find({name:"Nuevo"}).stock);
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
    //actualizo el plugin para que retome las configuraciones desde el inicio (no lo hace automaticamente//mal diseño del plugin)
    simpleCart.update();
    updateCartNumber(simpleCart.quantity());
    simpleCart.bind('afterAdd', function (item) {
        /*
         var stock = item.get('stock').split(':')[1];
         if (item.get('quantity') >= stock) {
         console.log('Ya no prro2');
         //item.decrement(item.quantity()-1);
         //item.set('quantity',stock);
         item.quantity(stock - 1);
         } else
         console.log('Ya ci  prro');
         console.log(item.get('stock'));
         //console.log(this.find({name:"Nuevo"})[0].get('Quantity'));
         */
        updateCartNumber(simpleCart.quantity());
        console.log(item.get('id'));
    });
    simpleCart.bind('beforeAdd', function (item) {
        //la variable item representa al objeto tal cual lo recivo de la página 
        //la variable itemr representa al objeto ya almecenado 
        //se especifica esto porque algunas cosas cambian, por ejemplo, 
        //la cantidad es diferente, el id tambien es diferente, y es necesario saber 
        //caracteristicas del objeto tanto ya almacenado como todvia no (el plugin está mal diseñado)
        var stock = item.get('stock').split(':')[1];
        var itemr = this.find({name: item.get('name')});
        if (itemr.length > 0)
            if (itemr[0].get('quantity') + item.quantity() > stock) { //si intenta agregar productos que no hay en stock
                bootbox.alert('<h3>Lo sentimos, no hay stock suficiente :(</h3>');
                console.log('no se agrego prro');
                return false;
            }
        console.log(item.quantity());
        if (item.quantity() > stock) { //si intenta agregar productos por primera vez con stock suficiente
            bootbox.alert('<h3>Lo sentimos, no hay stock suficiente :(</h3>');
            console.log('no se agrego prro2');
            return false;
        }
        $.growl.warning({title: "Mensaje", message: "Producto agregado al carrito"});
        
        console.log(item.quantity());
    });
    simpleCart.bind('beforeRemove',function (item){
        updateCartNumber(simpleCart.quantity()-item.quantity()); 
    });
 
    //Obtener lista de productos

    $.getJSON("http://localhost:8080/AEEcommerce/GetProducts", function (data) {
        // Get the element with id summary and set the inner text to the result.
        //console.log(data.msg);
        var products = "";
        products = $.parseJSON(data.msg);
        products.forEach(function (element) {
            var item = $('<div><div>').addClass('simpleCart_shelfItem');
            item.append('<img width="250" height="150" alt=producto src="http://localhost:8080/AEEcommerce/ProductImage?image=' + element.image + '">');//cambiar src por ruta servlet imagen de producto
            item.append('<h3 class="item_name">' + element.productname + '</h3>');
            item.append('<h4 class="item_price">Precio: ' + numeral(element.salepricemin).format('$0,0.00') + '</h4>');
            item.append('<h5 class="item_stock">Stock: ' + element.stock + ' </h5>');
            item.append('<div class="col-lg-3 col-sm-3 col-xs-3" style=" float: left;"><input class="item_Quantity input form-control" type="number" value="1" /></div>');
            if (element.stock > 0)
                item.append('<div class="col-lg-3 col-sm-3 col-xs-3" style="float: left;" ><button href="javascript:;" title="Agregar al carrito" class="item_add btn btn-success"><i class="glyphicon glyphicon-plus-sign" style="font-size: 25px;"></i></button></div>');
            else
                item.append(' No hay stock');

            $('#cartShelf').append(item);
        });


    });
});

function updateCartNumber(num) {
    $("#cartNumber").text(num);
}

function showModal() {
    $("#modalCart").modal('show');
}

