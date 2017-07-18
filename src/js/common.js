/* format float number to same length with zero */
function formatFloat(number, digit) {
  if (isNaN(number)) {
    return number;
  } else {
    var n = digit > 0 && digit < 5 ? digit : 2;
    var symbol = '.';
    var numArr = number.split(symbol);
    var result = number;
    if (numArr.length > 1) {
      var padLen = n - numArr[1].toString().length;
      numArr[1] += (padLen > 0 ? new Array(padLen + 1).join('0') : '');
      result = numArr.join(symbol);
    } else {
      result += '.' + (new Array(n + 1).join('0'));
    }
    return result;
  }
}