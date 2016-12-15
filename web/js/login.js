/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(function (){
   $("#frmLogin").validate({
       lang:'es',
       rules:{
           username:{
               required:true,
               minlength:3,
               maxlength:20
           },
           password:{
               required:true
           }
       },
       highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        
        submitHandler: function (form) {
            Validate();
            return false;
        }
        
   }); 
   
});

function Validate(){
    $.ajax({
        url:"/AEEcommerce/ValidateUser",
        data:$("#frmLogin").serialize(),
        type:"get"
    }).done(function (json){
        if(json.code==200){
            window.location.replace("index.html");
        }
        else if(json.code==302){
            window.location.replace("cancel.html?error=ya hay una sesion activa: "+json.user);
        }
        else{
            $.growl.error({
                title:"Error",
                message:"usuario no válido",
                location:"bc"
            });
        }
    }).fail();
}


