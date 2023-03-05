

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var stdDBName = 'StudentManagment';
var stdRelationName = 'StudentData';
var connToken = '90932500|-31949274676897027|90949589';

$('#rno').focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getStdIdAsJsonObj(){
    var rno = $('#rno').val();
    var jsonStr = {
        id:rno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#fname').val(record.fname);
    $('#stdclass').val(record.stdclass);
    $('#bdate').val(record.bdate);
    $('#adrs').val(record.adrs);
    $('#enrdate').val(record.enrdate);
}

function resetForm(){
    $('#rno').val('');
    $('#fname').val("");
    $('#stdclass').val("");
    $('#bdate').val("");
    $('#adrs').val("");
    $('#enrdate').val("");
    $('#rno').prop('disabled', false);
    $('save').prop('disable', true);
    $('#change').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#empid').focus();
}

function validateData(){
    var rno, fname, stdclass, bdate,adrs,enrdate;
    rno = $('#rno').val();
    fname = $('#fname').val();
    stdclass = $('#stdclass').val();
    bdate = $('#bdate').val();
    adrs = $('#adrs').val();
    enrdate = $('#enrdate').val();
    
    if(rno === ''){
        alert('Roll number missing');
        $('#rno').focus();
        return '';
    }
    if(fname === ""){
        alert('name missing');
        $('#fname').focus();
        return '';
    }
    if(stdclass === ""){
        alert('Standard missing');
        $('#stdclass').focus();
        return '';
    }
    if(bdate === ''){
        alert('Birthdate missing');
        $('#bdate').focus();
        return '';
    }
    if(adrs === ''){
        alert('address missing');
        $('#adrs').focus();
        return '';
    }
    if(enrdate === ''){
        alert('enrollnment date missing');
        $('#enrdate').focus();
        return '';
    }
    
    var jsonStrObj = {
        rno:rno,
        fname:fname,
        stdclass:stdclass,
        bdate:bdate,
        adrs:adrs,
        enrdate:enrdate
    };
    return JSON.stringify(jsonStrObj);
}

function getStd(){
    var stdIdJsonObj = getStdIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stdDBName,stdRelationName, stdIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400){
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fname').focus();
    }
    else if(resJsonObj.status === 200){
        $('#rno').prop('disabled', true);
        fillData(resJsonObj);
        $('#change').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fname').focus();
    }
}
function saveData(){
    var jsonStrObj = validateData();
    if (jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#rno').focus();
}
function changeData(){
    $('#change').prop('disabled'.true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg, stdDBName, stdRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#rno').focus();
}