function isPeselValid(e) {
    console.log(e);

    if(parseInt(e[0])>2299 ||parseInt(e[0])<1900) return "Error: incorrect year;";
    if(parseInt(e[1])>12 ||parseInt(e[1])<1) return "Error: incorrect month;";
    if(new Date(e[0]+"-"+e[1]+"-"+e[2]).toString() == "Invalid Date") return "Error: Invalid Date;";

    pesel = toPesel(e);
    console.log(pesel);
    if(pesel.length != 11) return "Error: Invalid pesel;";

    let weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum = sum + (parseInt(pesel.substring(i, i + 1)) * weights[i]);
    }
    sum = (10- (sum % 10) === 10)  ? 0 : 10 - (sum % 10);
    return (sum === parseInt(pesel.substring(10, 11))) ? "PESEL valid" : "PESEL invalid";
}

function toPesel(e) {
    let year = e[0].substring(2);
    let month = "0";
    if(e[0].substring(0,2) === "19") month = e[1];
    if(e[0].substring(0,2) === "20") month = parseInt(e[1])+20;
    if(e[0].substring(0,2) === "21") month = parseInt(e[1])+40;
    if(e[0].substring(0,2) === "22") month = parseInt(e[1])+60;
    if(e[0].substring(0,2) === "18") month = parseInt(e[1])+80;
    month = month.toString();
    if(month.length == 1) month = ['0', month].join('');
    let day = e[2];
    if(day.length == 1) day = ['0', day].join('');
    let digits = e[3];
    return [year, month, day, digits].join('');
}