exports.formatDate = function(date){
  if(date.indexOf('-') == -1){
    var fDate = date.slice(0, 4)+'-'+date.slice(4, 6)+'-'+date.slice(6);
    return fDate;
  }
  return date;
}