// poj_1001 
// URL: http://poj.org/problem?id=1001

/**
    Description

    对数值很大、精度很高的数进行高精度计算是一类十分常见的问题。比如，对国债进行计算就是属于这类问题。

    现在要你解决的问题是：对一个实数R( 0.0 < R < 99.999 )，要求写程序精确计算 R 的 n 次方(Rn)，其中n 是整数并且 0 < n <= 25。

    Input

    T输入包括多组 R 和 n。 R 的值占第 1 到第 6 列，n 的值占第 8 和第 9 列。

    Output

    对于每组输入，要求输出一行，该行包含精确的 R 的 n 次方。输出需要去掉前导的 0 后不要的 0 。如果输出是整数，不要输出小数点。

    Sample Input

    95.123 12
    0.4321 20
    5.1234 15
    6.7592  9
    98.999 10
    1.0100 12

    Sample Output

    548815620517731830194541.899025343415715973535967221869852721
    .00000005148554641076956121994511276767154838481760200726351203835429763013462401
    43992025569.928573701266488041146654993318703707511666295476720493953024
    29448126.764121021618164430206909037173276672
    90429072743629540498.107596019456651774561044010001
    1.126825030131969720661201
*/

//========== 算法 ==========


// 大数处理类
// 将数字转化为数组，并记录小数点的位置
// eg: 1234.5 => 
//  numberArray: [5, 4, 3, 2, 1]
//  pointPosition: 1
var BigNumber = function(numberString) {
    // 传入的是BigNumber的实例
    if (typeof numberString != 'string' && typeof numberString != 'number') {
        this.pointPosition = numberString.pointPosition;
        this.numberArray = numberString.numberArray;
    } else {
        // 传入的是数字或字符串
        numberString = numberString + '';
        this.pointPosition = numberString.length - 1 - numberString.indexOf('.');
        numberString = numberString.replace('.', '');
        var numberArray = [];
        var i, j;
        for (i = numberString.length - 1, j = 0; i >= 0; i--) {
            numberArray[j] = numberString[i] * 1;
            j++;
        }
        this.numberArray = numberArray;
    }
};

// 输出数字
BigNumber.prototype.toNumber = function() {
    var outPut = '';
    var arr = this.numberArray;
    var pointPosition = this.pointPosition;
    var len = arr.length;
    while (len--) {
        outPut += arr[len];
        if (len == pointPosition) {
            outPut += '.';
        }
    }    
    return outPut;
};

// 求n次幂
BigNumber.prototype.pow = function(n) {
    var result = this;
    while(--n) {
        result = BigNumber.multi(result, this);
    }
    return result;
};

// 乘法
BigNumber.multi = function(a, b) {

    var numberA = a.numberArray;
    var numberB = b.numberArray;

    var result = [];

    var i, j, len, len2, tem;

    for (i = 0, len = numberA.length; i < len; i++) {
        
        up = 0;

        for (j = 0, len2 = numberB.length; j < len2; j++) {
            targetPosition = i + j;
            tem = numberA[i] * numberB[j];
            if (result[targetPosition] >= 0) {
                result[targetPosition] += tem
            } else {
                result[targetPosition] = tem;
            }
            result[targetPosition] += up;
            up = ~~(result[targetPosition] / 10);
            result[targetPosition] %= 10;
        }

        if (up) {
            result[result.length] = up;
        }

    }

    var pointPosition = a.pointPosition + b.pointPosition; 

    return new BigNumber({
        numberArray: result,
        pointPosition: pointPosition
    });

};


//===== 运行 =====
var obj = [{
        r: 95.123,
        n: 12,
        t: '548815620517731830194541.899025343415715973535967221869852721'
    }, {
        r: 0.4321,
        n: 20,
        t: '0.00000005148554641076956121994511276767154838481760200726351203835429763013462401'
    }, {
        r: 5.1234,
        n: 15,
        t: '43992025569.928573701266488041146654993318703707511666295476720493953024'
    }, {
        r: 6.7592,
        n: 9,
        t: '29448126.764121021618164430206909037173276672'
    }, {
        r: 98.999,
        n: 10,
        t: '90429072743629540498.107596019456651774561044010001'
    }, {
        r: 1.0100,
        n: 12,
        t: '1.126825030131969720661201'
}];

var s = Date.now();
var big;
var result;
obj.forEach(function(v, i, a) {
    
    big = new BigNumber(v.r);

    result = big.pow(v.n);
    result = result.toNumber()
    console.log('target: ' + v.t);
    console.log('result: ' + result);

    console.log(v.t + '' == result);

    console.log('---------------------------------------------------------------');

});

console.log('UseTime: ' + (Date.now() - s) + ' ms');
