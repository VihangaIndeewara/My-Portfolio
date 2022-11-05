
$("#saveButton").attr("disabled",true)

const idPattern=/^C[0-9]{3}$/;
const namePattern=/^[A-z ]{4,20}$/;
const addressPattern=/^[A-z0-9. /,-]{7,}$/;
const contactPattern =/^[+940-9]{12}$/;

let validationArray=[];

validationArray.push({reg:idPattern,txtField:$("#saveModalInput1"), error:"Customer Id Pattern like this : C[0-9]{3}"});
validationArray.push({reg:namePattern,txtField:$("#saveModalInput2"), error:"Customer name Pattern like this : [A-z]{4,20}"})
validationArray.push({reg:addressPattern,txtField:$("#saveModalInput3"), error:"Customer address Pattern like this : [A-z0-9./,-]{7,}"})
validationArray.push({reg:contactPattern,txtField:$("#saveModalInput4"), error:"Customer contact number Pattern like this : [+940-9]{12}"})


function saveCustomer(){
    let cusId= $("#saveModalInput1").val();
    let cusName=  $("#saveModalInput2").val();
    let cusAddress=  $("#saveModalInput3").val();
    let cusContact=  $("#saveModalInput4").val();

    var customer={
        id:cusId,
        name:cusName,
        address:cusAddress,
        contact:cusContact
    }


    customerArray.push(customer)

    loadAllCustomers()
    clearSaveTexts()

}

$("#saveButton").click(function (){
    saveCustomer()
    bindRowEvents()

})

function loadAllCustomers(){
    $("#cusTable").empty()
    bindRowEvents()

    for (var customer of customerArray) {
        // var row =  "<tr><th>"+customer.id+"</th><td>"+customer.name+"</td><td>"+customer.address+"</td><td>"+customer.contact+"</td></tr>"
        var row =` <tr><th>${customer.id}</th><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`

        $("#cusTable").append(row)
    }
}

function bindRowEvents(){

    $("#cusTable>tr").click(function (){
        let id=$(this).children(":eq(0)").text();
        let name=$(this).children(":eq(1)").text();
        let address=$(this).children(":eq(2)").text();
        let contact=$(this).children(":eq(3)").text();


        console.log(id+" "+name+" "+address+" "+contact);

        $("#updateModalInput1").val(id);
        $("#updateModalInput2").val(name);
        $("#updateModalInput3").val(address);
        $("#updateModalInput4").val(contact);
    })
}

$("#search").click(function (){
    let id=  $("#txtSearch").val();

    for (var customer of customerArray) {
        if (customer.id==id){
            alert(customer.id+" "+customer.name+" "+customer.address+" "+customer.contact)
        }else{
            alert("This id not valid")
        }
    }


})

$("#saveModalInput1,#saveModalInput2,#saveModalInput3,#saveModalInput4").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#saveModalInput1").on('keydown', function (event) {
    if (event.key == "Enter" && check(idPattern,$("#saveModalInput1"))) {
        $("#saveModalInput2").focus();
    }else{
        $("#saveModalInput1").focus()
    }
});

$("#saveModalInput2").on('keydown', function (event) {
    if (event.key == "Enter" && check(namePattern,$("#saveModalInput2"))) {
        $("#saveModalInput3").focus();
    }
});

$("#saveModalInput3").on('keydown', function (event) {
    if (event.key == "Enter" && check(addressPattern, $("#saveModalInput3"))) {
        $("#saveModalInput4").focus();
    }
});

$("#saveModalInput4").on('keydown', function (event) {
    if (event.key == "Enter" && check(contactPattern,$("#saveModalInput4"))) {
        let response = confirm("Do you want to add this customer.?");

        if (response) {
            saveCustomer()

        }

    }

});


$("#saveModalInput1,#saveModalInput2,#saveModalInput3,#saveModalInput4").on('keyup', function (event) {
    checkValidity();
});

$("#saveModalInput1,#saveModalInput2,#saveModalInput3,#saveModalInput4").on('blur', function (event) {
    checkValidity();
});

function check(pattern,textField){

    let inputValue=textField.val();
    return pattern.test(inputValue)? true:false;
}

function checkValidity(){
    let errorCount=0;
    for (let validation of validationArray) {
        if (check(validation.reg,validation.txtField)){
            success(validation.txtField,"");
        }else {
            errorCount=errorCount+1;
            error(validation.txtField,validation.error);
        }

    }
    setSaveButton(errorCount);

}

function success(txtField,error){
    if (txtField.val().length <= 0) {
        defaultText(txtField,"")
    }else{
        txtField.css("border","2px solid green")
        txtField.parent().children("span").text(error)
    }
}

function error(txtField,error){
    if (txtField.val().length <= 0) {
        defaultText(txtField,"")
    }else{
        txtField.css("border","2px solid red")
        txtField.parent().children("span").text(error).css("color","red")
    }
}

function defaultText(txtField,error){
    txtField.css("border","2px solid #ced4da")
    txtField.parent().children("span").text(error).css("color","red")

}

function setSaveButton(value){
    if (value > 0) {
        $("#saveButton").attr("disabled",true)
    }else{
        $("#saveButton").attr("disabled",false)
    }
}


$("#btnUpdate").click(function () {
    let customerID = $("#updateModalInput1").val();
    let customer = searchCustomer(customerID);
    if (customer!=null) {
        customer.name =$("#updateModalInput2").val()
        customer.address =$("#updateModalInput3").val()
        customer.contact =$("#updateModalInput4").val()

        clearUpdateTexts()
        loadAllCustomers()
    } else {
        alert("Update Failed..!");

    }
});

function searchCustomer(cusID) {
    for (let customer of customerArray) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}

$("#btnDelete").click(function () {
    let deleteID = $("#deleteModalInput1").val();

    let option = confirm("Do you really want to delete customer id :" + deleteID);
    if (option){
        if (deleteCustomer(deleteID)) {
            setTextfieldValues("", "", "", "");
        } else {
            alert("No such customer to delete. please check the id");
        }
    }
});

$("#deleteModalInput1").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#deleteModalInput1").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            setTextfieldValues(customer);
        } else {
            alert("There is no customer available for that " + typedId);
            setTextfieldValues("", "", "", "");
        }
    }
});

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customerArray.indexOf(customer);
        customerArray.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function setTextfieldValues(customer) {
    $("#deleteModalInput1").val(customer.id);
    $("#deleteModalInput2").val(customer.name);
    $("#deleteModalInput3").val(customer.address);
    $("#deleteModalInput4").val(customer.contact);
}

function clearSaveTexts(){
    $("#saveModalInput1").focus()
    $("#saveModalInput1,#saveModalInput2,#saveModalInput3,#saveModalInput4").val("");
    defaultText()

}

function clearUpdateTexts(){
    $("#updateModalInput1").focus()
    $("#updateModalInput1,#updateModalInput2,#updateModalInput3,#updateModalInput4").val("");
}
