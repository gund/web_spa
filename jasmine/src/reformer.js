var reformer10 = {
    one: 'I',
    five: 'V',
    ten: 'X',
    fifty: 'L',
    hundred: 'C',
    fiveHundred: 'D',
    thousand: 'M',
    toReform: function (n) {
        if (n <= 10) {
            switch (n) {
                case 1:
                    return this.one;
                    break;
                case 5:
                    return this.five;
                    break;
                case 10:
                    return this.ten;
                    break;
                default:
                    if (1 < n && n < 4) {
                        return (function () {
                            var summat = '', i = 0;
                            for (i; i < n; i++) summat += reformer10.one;
                            return summat;
                        })();
                    }
                    if (n >= 4) {
                        if (n == 4 || n == 9) {
                            return (function () {
                                var summatmat = '';
                                var four = 5 - parseInt(n);
                                var nine = 10 - parseInt(n);
                                if (four == 1) summatmat = reformer10.one + reformer10.five;
                                if (nine == 1) summatmat = reformer10.one + reformer10.ten;
                                return summatmat;
                            })();
                        } else {
                            return (function () {
                                var summatmat = reformer10.five, i = 0;
                                var countTosummat = parseInt(n) - 5;
                                for (i; i < countTosummat; i++) summatmat += reformer10.one;
                                return summatmat;
                            })();
                        }
                    }
                    break;
            }
        }
    }
};

var reformer100 = {
    one: 'I',
    five: 'V',
    ten: 'X',
    fifty: 'L',
    hundred: 'C',
    fiveHundred: 'D',
    thousand: 'M',
    toReform: function (n) {
        if (10 < n && n <= 100) {
            switch (n) {
                case 50:
                    return this.fifty;
                    break;
                case 100:
                    return this.hundred;
                    break;
                default:
                    if (n % 10 == 0) {
                        if (10 < n && n < 40) {
                            return (function () {
                                var summatmat = '', i = 0;
                                var countSum = n / 10;
                                for (i; i < countSum; i++) summatmat += reformer100.ten;
                                return summatmat;
                            })();
                        }
                        if (n >= 40) {
                            if (n == 40 || n == 90) {
                                return (function () {
                                    var summatmat = '';
                                    var four = 50 - parseInt(n);
                                    var nine = 100 - parseInt(n);
                                    if (four == 10) summatmat = reformer100.ten + reformer100.fifty;
                                    if (nine == 10) summatmat = reformer100.ten + reformer100.hundred;
                                    return summatmat;
                                })();
                            } else {
                                return (function () {
                                    var summatmat = reformer100.fifty, i = 0;
                                    var summatmCount = (n - 50) / 10;
                                    for (i; i < summatmCount; i++) summatmat += reformer100.ten;
                                    return summatmat;
                                })();
                            }
                        }
                    } else {
                        var countSum = n / 10;
                        var countSumInt = Math.floor(countSum);
                        var countSumFloat = Math.round((countSum - Math.floor(countSum)) * 10);
                        if (10 < n && n < 40) {
                            return (function () {
                                var summatmat = '', i = 0;
                                for (i; i < countSumInt; i++) summatmat += reformer100.ten;
                                return summatmat + reformer10.toReform(countSumFloat);
                            })();
                        }
                        if (n > 40) {
                            if ((40 < n && n < 50) || (90 < n && n < 100)) {
                                return (function () {
                                    var summatmat = '';
                                    var forty = 50 - parseInt(n);
                                    var ninth = 100 - parseInt(n);
                                    if (forty < 10)
                                        summatmat = (reformer100.ten + reformer100.fifty) + reformer10.toReform(countSumFloat);
                                    if (ninth < 10)
                                        summatmat = (reformer100.ten + reformer100.hundred) + reformer10.toReform(countSumFloat);
                                    return summatmat;
                                })();
                            } else {
                                return (function () {
                                    var summatmat = reformer100.fifty, i = 0;
                                    var countSumFifty = (n - 50) / 10;
                                    var countSumIntFifty = Math.floor(countSumFifty);
                                    var countSumFloatFifty = Math.round((countSumFifty - Math.floor(countSumFifty)) * 10);
                                    for (i; i < countSumIntFifty; i++) {
                                        summatmat += reformer100.ten;
                                    }
                                    return summatmat + reformer10.toReform(countSumFloatFifty);
                                })();
                            }
                        }
                    }
                    break;
            }
        }
    }
};

var reformer1000 = {
    one: 'I',
    five: 'V',
    ten: 'X',
    fifty: 'L',
    hundred: 'C',
    fiveHundred: 'D',
    thousand: 'M',
    toReform: function (n) {
        if (100 < n && n <= 1000) {
            switch (n) {
                case 500:
                    return this.fiveHundred;
                    break;
                case 1000:
                    return this.thousand;
                    break;
                default:
                    if (n % 100 == 0) {
                        if (100 < n && n < 400) {
                            return (function () {
                                var summatmat = '', i = 0;
                                var countSum = n / 100;
                                for (i; i < countSum; i++) summatmat += reformer1000.hundred;
                                return summatmat;
                            })();
                        }
                        if (n >= 400) {
                            if (n == 400 || n == 900) {
                                return (function () {
                                    var summat = '';
                                    var four = 500 - parseInt(n);
                                    var nine = 1000 - parseInt(n);
                                    if (four == 100) summat = reformer1000.hundred + reformer100.fiveHundred;
                                    if (nine == 100) summat = reformer1000.hundred + reformer100.thousand;
                                    return summat;
                                })();
                            } else {
                                return (function () {
                                    var summat = reformer1000.fiveHundred, i = 0;
                                    var countSum = (n - 500) / 100;
                                    for (i; i < countSum; i++) summat += reformer1000.hundred;
                                    return summat;
                                })();
                            }
                        }
                    } else {
                        var countSum = n / 100;
                        var countSumInt = Math.floor(countSum);
                        var countSumFloat = Math.round((countSum - Math.floor(countSum)) * 100);
                        if (100 < n && n < 400) {
                            return (function () {
                                var summat = '', i = 0;
                                for (i; i < countSumInt; i++) summat += reformer1000.hundred;
                                return summat + reformer100.toReform(countSumFloat);
                            })();
                        }
                        if (n > 400) {
                            if ((400 < n && n < 500) || (900 < n && n < 1000)) {
                                return (function () {
                                    var summat = '';
                                    var forty = 500 - parseInt(n);
                                    var ninth = 1000 - parseInt(n);
                                    if (forty < 100)
                                        summat = (reformer1000.hundred + reformer1000.fiveHundred) + reformer100.toReform(countSumFloat);
                                    if (ninth < 100)
                                        summat = (reformer1000.hundred + reformer1000.thousand) + reformer100.toReform(countSumFloat);
                                    return summat;
                                })();
                            } else {
                                return (function () {
                                    var summat = reformer1000.fiveHundred, i = 0;
                                    var countSumFifty = (n - 500) / 100;
                                    var countSumIntFifty = Math.floor(countSumFifty);
                                    var countSumFloatFifty = Math.round((countSumFifty - Math.floor(countSumFifty)) * 100);
                                    for (i; i < countSumIntFifty; i++) summat += reformer1000.hundred;
                                    return summat + reformer100.toReform(countSumFloatFifty);
                                })();
                            }
                        }
                    }
                    break;
            }
        }
    }
};

var reformer3000 = {
    one: 'I',
    five: 'V',
    ten: 'X',
    fifty: 'L',
    hundred: 'C',
    fiveHundred: 'D',
    thousand: 'M',
    toReform: function (n) {
        if (1000 < n && n <= 3000) {
            if (n % 1000 == 0) {
                return (function () {
                    var summat = '', i = 0;
                    var countSum = n / 1000;
                    for (i; i < countSum; i++) summat += reformer3000.thousand;
                    return summat;
                })();
            } else {
                var countSum = n / 1000;
                var countSumInt = Math.floor(countSum);
                var countSumFloat = Math.round((countSum - Math.floor(countSum)) * 1000);
                return (function () {
                    var summat = '', i = 0, final_summat;
                    for (i; i < countSumInt; i++) summat += reformer3000.thousand;
                    if (countSumFloat < 100) final_summat = summat + reformer100.toReform(countSumFloat);
                    else final_summat = summat + reformer1000.toReform(countSumFloat);
                    return final_summat;
                })();
            }
        }
    }
};