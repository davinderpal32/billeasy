
const Services = require(appRoot + "/services");
const Db = require(appRoot + "/models");
const moment = require("moment");
const libs = require("../libs");


exports.getDates = async (startDate, stopDate) => {
    let betweenDates = [];
    let diff = new Date(stopDate) - new Date(startDate),
        noOfDays = diff / 86400000,
        i, temp;

    for (i = 0; i <= noOfDays; i = i + 1) {
        temp = moment(stopDate).add(-i, "days").format('YYYY-MM-DD');
        betweenDates.push(temp);
    }
    return betweenDates;
}

exports.subsetPairNotDivisibleByK = async (arr, N, K) => {
    // Array for storing frequency of modulo
    // values
    let f = new Array(K);
    for (let i = 0; i < K; i++) {
        f[i] = 0;
    }



    // Fill frequency array with values modulo K
    for (let i = 0; i < N; i++) {

        console.log('arr', arr)
        f[arr[i] % K]++;
    }


    // if K is even, then update f[K/2]
    if (K % 2 == 0)
        f[K / 2] = Math.min(f[K / 2], 1);

    // Initialize result by minimum of 1 or
    // count of numbers giving remainder 0
    let res = Math.min(f[0], 1);

    // Choose maximum of count of numbers
    // giving remainder i or K-i
    for (let i = 1; i <= K / 2; i++)
        res += Math.max(f[i], f[K - i]);

    return res;
}

exports.processData = async (k, s) => {
    //Enter your code here
    let values = new Array(k).fill(0);
    let result = 0;

    await s.reduce((target, item, index) => {
        
        values[item % k] += 1;

        return target;
    }, []);
    for (let i of Array.from(
        { length: (k + 1) / 2 - 1 },
        (value, index) => index + 1
    )) {
        result += Math.max(values[i], values[k - i]);
    }

    !(k % 2) && !!values[k / 2] && (result += 1);

    values[0] && (result += 1);

    return result;
}
