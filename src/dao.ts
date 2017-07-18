var Database = require('better-sqlite3');
var util = require('./util');

exports.initDB = function(){
  var db = new Database('afina.db');

  var sqlTables = 'select * from sqlite_master';
  var sqlMainTable = 'create table trade_history '+
    '(trade_date text, trade_time text, stock_code text, stock_name text, in_out text, price real, amount integer, sum real, trade_code text, hold_code text, location text)';

  var tables = db.prepare(sqlTables).all();
  if(tables.length == 0){
    db.prepare(sqlMainTable).run();
  }

  var row = db.prepare(sqlTables).all();
  console.log(row.length);
}

exports.loadHist = function(from, to, stock_name, category){
  var db = new Database('afina.db');
  var sqlLoadHist = 'select * from trade_history t';
  var params:string[] = [];
  if(arguments.length >0){
    sqlLoadHist += ' where t.trade_date >= date(?) and t.trade_date <= date(?) and t.stock_name like ? || "%" and t.in_out like ? || "%"';
    params = [from, to, stock_name, category];
  }
  sqlLoadHist += ' order by 1, 2, 3'

  return db.prepare(sqlLoadHist).all(params);
}

exports.saveHist = function(dataInput){
  var data = JSON.parse(dataInput);
  var db = new Database('afina.db');

  var sqlSaveHist = 'insert into trade_history values(date(?), time(?), ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  var stmt = db.prepare(sqlSaveHist);

  for(var i=1, size=data.length; i<size; i++){
    var params:string[] = [];
    params.push(util.formatDate(data[i][0]+""));
    for(var j=1, cols=data[i].length; j<cols; j++){
      params.push(data[i][j]);
    }
    var result = stmt.run(params);
    console.log(JSON.stringify(result));
  }
}