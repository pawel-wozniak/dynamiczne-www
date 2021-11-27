importScripts('pesel_validate.js'); 

self.onmessage = function(e){self.postMessage(calculate(e));}

function calculate(e) {
    return isPeselValid(e.data);
}