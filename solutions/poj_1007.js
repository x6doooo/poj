/*
题目大意：
     序列“未排序程度”的一个计算方式是元素乱序的元素对个数。例如：在单词序列“DAABEC'”中，因为D大于右边四个单词，E大于C，所以计算结果为5。这种计算方法称为序列的逆序数。序列“AACEDGG”逆序数为1（E与D）——近似排序，而序列``ZWQM'' 逆序数为6（它是已排序序列的反序）。
     你的任务是分类DNA字符串（只有ACGT四个字符）。但是你分类它们的方法不是字典序，而是逆序数，排序程度从好到差。所有字符串长度相同。
输入：
第一行包含两个数：一个正整数n（0<n<=50）表示字符串长度，一个正整数m（0<m<=100）表示字符串个数。接下来m行，每行一个长度为n的字符串。
输出：
输出输入字符串列表，按排序程度从好到差。如果逆序数相同，就原来顺序输出。
样例输入：
10 6
AACATGAAGG
TTTTGGCCAA
TTTGGCCAAA
GATCAGATTT
CCCGGGGGGA
ATCGATGCAT
 
样例输出:
CCCGGGGGGA
AACATGAAGG
GATCAGATTT
ATCGATGCAT
TTTTGGCCAA
TTTGGCCAAA
*/

function inverse(str) {
    var len = str.length;
    var i, j;
    var count = 0;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (str[i] > str[j]) {
                count++;
            }
        }
    }
    return count;
}

var s = [
    'AACATGAAGG',
    'TTTTGGCCAA',
    'TTTGGCCAAA',
    'GATCAGATTT',
    'CCCGGGGGGA',
    'ATCGATGCAT'
];

var c = [];
s.forEach(function(v) {
    c.push({
        s: v,
        i: inverse(v)
    });
});

c.sort(function(a, b){
    return a.i - b.i;
});

c.forEach(function(v) {
    console.log(v.s);
});





