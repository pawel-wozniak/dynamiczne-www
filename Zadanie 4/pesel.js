var b_validate_one_pesel = document.getElementById("validate_pesel");
var b_show_all_pesels = document.getElementById("show_all_pesels");
var b_find_valid_pesels = document.getElementById("find_valid_pesels");

var f_year = document.getElementById("year");
var f_month = document.getElementById("month");
var f_day = document.getElementById("day");
var f_last_digits = document.getElementById("last_five_pesel");

var d_result = document.getElementById("result");

if (typeof(a) == "undefined") {var a = new Worker("./validate_one_pesel.js");}
if (typeof(b) == "undefined") {var b = new Worker("./show_all_pesels.js");}
if (typeof(c) == "undefined") {var c = new Worker("./find_valid_pesels.js");}

a.onmessage = function(e){d_result.insertAdjacentHTML('beforeend', e.data + ", ");};
b.onmessage = function(e){d_result.insertAdjacentHTML('beforeend', e.data + ", ");};
c.onmessage = function(e){d_result.insertAdjacentHTML('beforeend', e.data + ", ");};

var validate_pesel = e => {d_result.innerHTML = ""; a.postMessage([f_year.value, f_month.value, f_day.value, f_last_digits.value]);}
var show_all_pesels = e => {d_result.innerHTML = ""; b.postMessage([f_year.value, f_month.value, f_day.value, f_last_digits.value]);}
var find_valid_pesels = e => {d_result.innerHTML = ""; c.postMessage([f_year.value, f_month.value, f_day.value, f_last_digits.value]);}

b_validate_one_pesel.addEventListener("click", validate_pesel); 
b_show_all_pesels.addEventListener("click", show_all_pesels); 
b_find_valid_pesels.addEventListener("click", find_valid_pesels); 