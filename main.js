var g_tableArray = [];
var g_index;
var editNotSave;
var editIndex;

$(document).ready(init());


function init(){
    g_index = 0;
    var editNotSave = false;
    initializeLocalStorage();
    initializeList();
    $('.add').on('click',addInformation);
    $('table').on('click','.removeButton',deleteTask);
    $('#first').on('click',sortFirst);
    $('#last').on('click',sortLast);
    $('#phone').on('click', sortNum);
    $('table').on('click','.editButton',editTask);
}

function editInformation()
{
    var lineEntry = {};
    var firstName = $('#fName').val();
    var lastName = $('#lName').val();
    var phoneNumber =$('#pNum').val();

    lineEntry.lineIndex = editIndex;
    lineEntry.firstName = firstName;
    lineEntry.lastName = lastName;
    lineEntry.phoneNumber = phoneNumber;
    g_tableArray[editIndex] = lineEntry;
    $('#fName').val('');
    $('#lName').val('');
    $('#pNum').val('');
    editNotSave = false;
    resetList();
}

function addInformation(event){

    event.preventDefault();
    if (editNotSave)
    {
        editInformation();
        return;
    }

    var lineEntry = {};
    var firstName = $('#fName').val();
    var lastName = $('#lName').val();
    var phoneNumber =$('#pNum').val();

    lineEntry.lineIndex = g_index;
    lineEntry.firstName = firstName;
    lineEntry.lastName = lastName;
    lineEntry.phoneNumber = phoneNumber;

    g_tableArray = JSON.parse(localStorage.tableArray);


    g_tableArray.push(lineEntry);
    localStorage.tableArray = JSON.stringify(g_tableArray);


    var $tr = $('#template').clone();
    $tr.removeAttr('id');
    $tr.children('.FirstName').text(firstName);
    $tr.children('.LastName').text(lastName);
    $tr.children('.PhoneNumber').text(phoneNumber);

    g_index++;


    $('#list1').append($tr);
    $('#fName').val('');
    $('#lName').val('');
    $('#pNum').val('');
}

function publishLineItem(lineEntry,i) {

    var $tr = $('#template').clone();
    $tr.removeAttr('id');
    $tr.children('.FirstName').text(lineEntry.firstName);
    $tr.children('.LastName').text(lineEntry.lastName);
    $tr.children('.PhoneNumber').text(lineEntry.phoneNumber);
    $('#list1').append($tr);

}

function deleteTask(){
    console.log('thanks.');
    var index = $(this).closest("tr").index();

    g_tableArray.splice(index, 1);
    localStorage.tableArray = JSON.stringify(g_tableArray);
    $(this).closest('tr').remove();


}


function sortFirst() {
    debugger;
    g_tableArray.sort( function (le1, le2) {
        debugger;
        var name1 = le1.firstName;
        var name2 =  le2.firstName;
        if (name1 > name2)
            return 1;
        else if (name1 < name2)
            return -1;
        else
            return 0;

    });


    resetList();
}

function sortLast() {

    g_tableArray.sort( function (le1, le2) {

        var name1 = le1.lastName;
        var name2 =  le2.lastName;
        if (name1 > name2)
            return 1;
        else if (name1 < name2)
            return -1;
        else
            return 0;

    });
    resetList();
}

function sortNum() {
    g_tableArray.sort( function (le1, le2) {

        var name1 = le1.phoneNumber;
        var name2 =  le2.phoneNumber;
        if (name1 > name2)
            return 1;
        else if (name1 < name2)
            return -1;
        else
            return 0;

    });
    resetList();
}


function initializeLocalStorage(){
    if(!localStorage.tableArray){
        localStorage.tableArray = '[]';
    }
}

function initializeList(){
    $("#list1").empty();
    g_tableArray = JSON.parse(localStorage.tableArray);

    for (var i = 0; i < g_tableArray.length; ++i)
        publishLineItem(g_tableArray[i], i);

    g_index = g_tableArray.length;

}

function resetList(){
    $("#list1").empty();

    localStorage.tableArray = JSON.stringify(g_tableArray);

    for (var i = 0; i < g_tableArray.length; ++i)
        publishLineItem(g_tableArray[i], i);

    g_index = g_tableArray.length;

}


function editTask() {



    if (g_tableArray.length == 0)
        return;
    editNotSave = true;
    var i = $(this).closest("tr").index();
    var lineEntry = g_tableArray[i];
    editIndex = i;

    $('#fName').val(lineEntry.firstName);
    $('#lName').val(lineEntry.lastName);
    $('#pNum').val(lineEntry.phoneNumber);

}

