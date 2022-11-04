let itemArray=[];


$("#saveButtonI").attr("disabled",true)

const codePattern=/^I[0-9]{3}$/;
const descriptionPattern=/^[A-z ]{3,20}$/;
const qtyOnHandPattern=/^[0-9.]{1,}$/;
const unitPricePattern =/^[0-9]{1,}[.00]$/;

let itemValidationArray=[];

itemValidationArray.push({reg:codePattern,txtField:$("#saveModalInput1I"), error:"Item code pattern like this : I[0-9]{3}$"});
itemValidationArray.push({reg:descriptionPattern,txtField:$("#saveModalInput2I"), error:"Item description pattern like this : [A-z]{3,20}"})
itemValidationArray.push({reg:qtyOnHandPattern,txtField:$("#saveModalInput3I"), error:"Item qtyOnHand pattern like this : [0-9.]{1,}"})
itemValidationArray.push({reg:unitPricePattern,txtField:$("#saveModalInput4I"), error:"Item unitPrice  pattern like this : [0-9]{1,}[.00]"})

function saveItem(){
    let itemCode= $("#saveModalInput1I").val();
    let description=  $("#saveModalInput2I").val();
    let qtyOnHand=  $("#saveModalInput3I").val();
    let unitPrice=  $("#saveModalInput4I").val();

    var item={
        code:itemCode,
        description:description,
        qtyOnHand:qtyOnHand,
        unitPrice:unitPrice
    }


    itemArray.push(item)

    loadAllItems()
    clearSaveTexts()

}

$("#saveButtonI").click(function (){
    saveItem()
    bindRowEvents()

})

function loadAllItems(){
    $("#itemTable").empty()
    bindRowEvents()

    for (var item of itemArray) {
        var row =` <tr><th>${item.code}</th><td>${item.description}</td><td>${item.qtyOnHand}</td><td>${item.unitPrice}</td></tr>`

        $("#itemTable").append(row)
    }
}

function bindRowEvents(){

    $("#item>tr").click(function (){
        let code=$(this).children(":eq(0)").text();
        let description=$(this).children(":eq(1)").text();
        let qtyOnHand=$(this).children(":eq(2)").text();
        let unitPrice=$(this).children(":eq(3)").text();

        $("#updateModalInput1I").val(code);
        $("#updateModalInput2I").val(description);
        $("#updateModalInput3I").val(qtyOnHand);
        $("#updateModalInput4I").val(unitPrice);
    })
}

$("#btnSearchI").click(function (){
    let code=  $("#txtSearchI").val();

    for (var item of itemArray) {
        if (item.code==code){
            alert(item.code+" "+item.description+" "+item.qtyOnHand+" "+item.unitPrice)
        }else{
            alert("This id not valid")
        }
    }


})


$("#saveModalInput1I,#saveModalInput2I,#saveModalInput3I,#saveModalInput4I").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#saveModalInput1I").on('keydown', function (event) {
    if (event.key == "Enter" && check(codePattern,$("#saveModalInput1I"))) {
        $("#saveModalInput2I").focus();
    }else{
        $("#saveModalInput1I").focus()
    }
});

$("#saveModalInput2I").on('keydown', function (event) {
    if (event.key == "Enter" && check(descriptionPattern,$("#saveModalInput2I"))) {
        $("#saveModalInput3I").focus();
    }
});

$("#saveModalInput3I").on('keydown', function (event) {
    if (event.key == "Enter" && check(qtyOnHandPattern, $("#saveModalInput3I"))) {
        $("#saveModalInput4I").focus();
    }
});

$("#saveModalInput4I").on('keydown', function (event) {
    if (event.key == "Enter" && check(unitPricePattern,$("#saveModalInput4I"))) {
        let response = confirm("Do you want to add this item.?");

        if (response) {
            saveItem()

        }

    }

});


$("#saveModalInput1I,#saveModalInput2I,#saveModalInput3I,#saveModalInput4I").on('keyup', function (event) {
    checkValidity();
});

$("#saveModalInput1I,#saveModalInput2I,#saveModalInput3I,#saveModalInput4I").on('blur', function (event) {
    checkValidity();
});

function check(pattern,textField){
    let inputValue=textField.val();
    return pattern.test(inputValue)? true:false;
}


function checkValidity(){
    let errorCount=0;
    for (let validation of itemValidationArray) {
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
    txtField.parent().children("span").test(error).css("color","red")

}

function setSaveButton(value){
    if (value > 0) {
        $("#saveButtonI").attr("disabled",true)
    }else{
        $("#saveButtonI").attr("disabled",false)
    }
}

$("#btnUpdateI").click(function () {
    let itemCode = $("#updateModalInput1I").val();
    let item = searchItem(itemCode);
    if (item!=null) {
        item.description =$("#updateModalInput2I").val()
        item.qtyOnHand =$("#updateModalInput3I").val()
        item.unitPrice =$("#updateModalInput4I").val()

        clearUpdateTexts()
        loadAllItems()
    } else {
        alert("Update Failed..!");

    }
});

function searchItem(Code) {
    for (let item of itemArray) {
        if (item.code ==Code) {
            return item;
        }
    }
    return null;
}

$("#btnDeleteI").click(function () {
    let deleteID = $("#deleteModalInput1I").val();

    let option = confirm("Do you really want to delete Item code :" + deleteID);
    if (option){
        if (deleteItem(deleteID)) {
            setTextfieldValues("", "", "", "");
        } else {
            alert("Please check the id");
        }
    }
});

$("#deleteModalInput1I").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedCode = $("#deleteModalInput1I").val();
        let item = searchItem(typedCode);
        if (item != null) {
            setTextfieldValues(item);
        } else {
            alert("Please check the id");
            setTextfieldValues("", "", "", "");
        }
    }
});

function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = itemArray.indexOf(item);
        itemArray.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function setTextfieldValues(item) {
    $("#deleteModalInput1I").val(item.code);
    $("#deleteModalInput2I").val(item.description);
    $("#deleteModalInput3I").val(item.qtyOnHand);
    $("#deleteModalInput4I").val(item.unitPrice);
}



function clearSaveTexts(){
    $("#saveModalInput1I").focus()
    $("#saveModalInput1I,#saveModalInput2I,#saveModalInput3I,#saveModalInput4I").val("");
    defaultText()

}

function clearUpdateTexts(){
    $("#updateModalInput1I").focus()
    $("#updateModalInput1I,#updateModalInput2I,#updateModalInput3I,#updateModalInput4I").val("");
}
