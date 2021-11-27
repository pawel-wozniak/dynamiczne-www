importScripts('pesel_validate.js'); 

self.onmessage = function(e){calculate(e.data);}

function calculate(e) {
    let start = new Date("1930-01-01");
    let end = new Date("2050-12-31");
    for(let i= start; i<= end; i.setDate(i.getDate()+1)) {
        let pesel = [i.getFullYear().toString(), i.getMonth().toString(), i.getDay().toString(), e[3]];
        if(isPeselValid(pesel) == "PESEL valid") self.postMessage(toPesel(pesel));
    }
}