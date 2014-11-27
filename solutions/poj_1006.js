/*___________________________________________________________POJ 1006题_________________________________________________________________ 
                                                              生理周期 
                                            Time Limit: 1000MS  Memory Limit: 10000K  
                                            Total Submissions: 66586  Accepted: 19524  
 
Description: 
人生来就有三个生理周期，分别为体力、感情和智力周期，它们的周期长度为23天、28天和33天。每一个周期中有一天是高峰。在高峰这天，人会在相应 
的方面表现出色。例如，智力周期的高峰，人会思维敏捷，精力容易高度集中。因为三个周期的周长不同，所以通常三个周期的高峰不会落在同一天。 
对于每个人，我们想知道何时三个高峰落在同一天。对于每个周期，我们会给出从当前年份的第一天开始，到出现高峰的天数（不一定是第一次高峰出现 
的时间）。你的任务是给定一个从当年第一天开始数的天数，输出从给定时间开始（不包括给定时间）下一次三个高峰落在同一天的时间（距给定时间的 
天数）。例如：给定时间为10，下次出现三个高峰同天的时间是12，则输出2（注意这里不是3）。 
 
Input: 
输入四个整数：p, e, i和d。 p, e, i分别表示体力、情感和智力高峰出现的时间（时间从当年的第一天开始计算）。d 是给定的时间，可能小于p, e, 或 i。  
所有给定时间是非负的并且小于365, 所求的时间小于21252。 当p = e = i = d = -1时，输入数据结束。 
 
Output: 
从给定时间起，下一次三个高峰同天的时间（距离给定时间的天数）。  
采用以下格式：  
Case 1: the next triple peak occurs in 1234 days.  
注意：即使结果是1天，也使用复数形式“days”。 
 
Sample Input: 
0 0 0 0 
0 0 0 100 
5 20 34 325 
4 5 6 7 
283 102 23 320 
203 301 203 40 
-1 -1 -1 -1 
 
Sample Output: 
Case 1: the next triple peak occurs in 21252 days. 
Case 2: the next triple peak occurs in 21152 days. 
Case 3: the next triple peak occurs in 19575 days. 
Case 4: the next triple peak occurs in 16994 days. 
Case 5: the next triple peak occurs in 8910 days. 
Case 6: the next triple peak occurs in 10789 days. 

------------------------------------------------------------------------------------------------------------------------------------------------

    解题思路
 
    参考：http://www.cnblogs.com/walker01/archive/2010/01/23/1654880.html
 
    未知数x
    除a余aa
    除b余bb
    除c余cc

    第一步，解方程组：（用循环解可解）
    (b * c * ax) % a = 1;
    (a * c * bx) % b = 1;
    (a * b * cx) % c = 1;

    第二步
    keyA = b * c * ax
    keyB = a * c * bx
    keyC = a * b * cx

    最终求x的方程：
    x = (keyA * aa + keyB * bb + keyC * cc) % lcm(a, b, c) 
    //lcm => 求最小公倍数


    代入：
    
    p_cycle => 23
    e_cycle => 28
    i_cycle => 33

    p + kp * p_cycle - d = n;
    e + ke * e_cycle - d = n;
    i + ki * i_cycle - d = n;

    p + kp * p_cycle = n + d;
    e + ke * e_cycle = n + d;
    i + ki * i_cycle = n + d;

    (n + d) % p_cycle = p;
    (n + d) % e_cycle = e;
    (n + d) % i_cycle = i;
    

*/

var arr = [
    [0, 0, 0, 0], 
    [0, 0, 0, 100], 
    [5, 20, 34, 325], 
    [4, 5, 6, 7], 
    [283, 102, 23, 320], 
    [203, 301, 203, 40] 
];


function getParam(a, b, c) {
    var i = 0;
    var x = true;
    while (x) {
        i++;
        if ((a * b * i) % c == 1) {
            x = false;
        }
    }
    return a * b * i;
}

var p_cycle = 23;
var e_cycle = 28;
var i_cycle = 33;

var param_p = getParam(e_cycle, i_cycle, p_cycle);
var param_e = getParam(p_cycle, i_cycle, e_cycle);
var param_i = getParam(p_cycle, e_cycle, i_cycle);

// 题目里的三个数不存在公约数，所以最小公倍数是他们的乘积
var lcm = p_cycle * e_cycle * i_cycle;

function compute(p, e, i, d) {
    //即: x = (keyA * aa + keyB * bb + keyC * cc) % lcm(a, b, c) 
    d = (param_p * p + param_e * e + param_i * i - d) % lcm;
    if (d <= 0) {
        d += lcm;
    }
    return d;
}

var result;
arr.forEach(function(v, i){
    result = compute(v[0], v[1], v[2], v[3]);
    console.log('Case ' + i + ': the next triple peak occurs in ' + result + ' days.');
});


