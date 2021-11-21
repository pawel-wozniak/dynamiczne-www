function isPeselValid(pesel) {
    let weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;

    for (let i = 0; i < weights.length; i++) {
        sum = sum + (parseInt(pesel.substring(i, i + 1)) * weights[i]);
    }
    sum = (10- (sum % 10) === 10)  ? 0 : 10 - (sum % 10);
    return sum === parseInt(pesel.substring(10, 11));
}