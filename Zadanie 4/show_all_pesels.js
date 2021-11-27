importScripts('pesel_validate.js'); 

self.onmessage = function(e){calculate(e.data);}

function calculate(e) {
    for(let i=0; i<99999 ; i++) {
        let digits = i.toString();
        digits = "0".repeat(5-digits.length) + digits;
        let pesel = [e[0], e[1], e[2], digits];
        if(isPeselValid(pesel) == "PESEL valid") self.postMessage(toPesel(pesel));
    }
}