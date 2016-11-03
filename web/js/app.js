
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
        /*
        afterAdd: function () {
            console.log("huehuehdushdfjshdjfskdj");
            //$('.simpleCart_items table').addClass();
            $('.simpleCart_items table').addClass('table table-hover');
            $(".simpleCart_items table tr").wrapAll('<tbody></tbody>');
        },
        
        */
       /*
        afterRemove : function () {
            console.log("huehuehdushdfjshdjfskdj");
            //$('.simpleCart_items table').addClass();
            $('.simpleCart_items table').addClass('table table-hover');
            $(".simpleCart_items table tr").wrapAll('<tbody></tbody>');
        }
        */
    });


});

