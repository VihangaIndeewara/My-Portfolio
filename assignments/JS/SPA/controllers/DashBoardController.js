
$("#home").click(function (){
    $("#HomePage").css("display","block")
    $("#CustomerPage").css("display","none")
    $("#ItemPage").css("display","none")
    $("#PlaceOrderPage").css("display","none")
    $("#AllOrderPage").css("display","none")
});

$("#customer").click(function (){
    $("#HomePage").css("display","none")
    $("#CustomerPage").css("display","block")
    $("#ItemPage").css("display","none")
    $("#PlaceOrderPage").css("display","none")
    $("#AllOrderPage").css("display","none")
});

$('#item').click(function (){
    $("#HomePage").css("display","none")
    $("#CustomerPage").css("display","none")
    $("#ItemPage").css("display","block")
    $("#PlaceOrderPage").css("display","none")
    $("#AllOrderPage").css("display","none")
});

$('#placeOrder').click(function (){
    $("#HomePage").css("display","none")
    $("#CustomerPage").css("display","none")
    $("#ItemPage").css("display","none")
    $("#PlaceOrderPage").css("display","block")
    $("#AllOrderPage").css("display","none")
});

$("#cusImg").click(function (){
    $("#HomePage").css("display","none")
    $("#CustomerPage").css("display","block")
    $("#ItemPage").css("display","none")
    $("#PlaceOrderPage").css("display","none")
    $("#AllOrderPage").css("display","none")
});

$('#itemImg').click(function (){
    $("#HomePage").css("display","none")
    $("#CustomerPage").css("display","none")
    $("#ItemPage").css("display","block")
    $("#PlaceOrderPage").css("display","none")
    $("#AllOrderPage").css("display","none")
});

$('#placeOrderImg').click(function (){
    $("#HomePage").css("display","none")
    $("#CustomerPage").css("display","none")
    $("#ItemPage").css("display","none")
    $("#PlaceOrderPage").css("display","block")
    $("#AllOrderPage").css("display","none")
});

$('#allOrderImg').click(function (){
    $("#HomePage").css("display","none")
    $("#CustomerPage").css("display","none")
    $("#ItemPage").css("display","none")
    $("#PlaceOrderPage").css("display","none")
    $("#AllOrderPage").css("display","block")
});