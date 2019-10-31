var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheets = ss.getSheets();
var sheet = sheets[0];

var TIMEZONE = "America/Sao_Paulo";

var MESES = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ'
]

// Create SpreadSheet menu
function onOpen() {
  var entries = [{
    name : "Preencher planilha atual",
    functionName : "__atualizaAtual"
  }];

  ss.addMenu("Toggl", entries);
};

// Menu functions
function __init() {
  getSheetData();
  verifyMostRecentSheet();
}

function __atualizaAtual() {
  sheet = ss.getActiveSheet();
  getSheetData();
}

function verifyMostRecentSheet() {
  var periodo = getSheetnameData(sheet);
  var today = new Date();
  if (today.getMonth() > periodo.dataFinal.getMonth() || today.getYear() > periodo.dataFinal.getMonth()) {
    createNewSheet(today, periodo)
  }
}

function createNewSheet(today, periodo) {
  var name = MESES[today.getMonth()] + '/' + today.getFullYear();
  name = name[0].toUpperCase() + name.substring(1).toLowerCase();

  sheet = ss.insertSheet(name, 0);
  ss.setActiveSheet(sheet);

  var source_range = ss.getSheets()[1].getRange('A1:G1');
  var target_range = sheet.getRange('A1:G1');
  source_range.copyTo(target_range);

  ss.setColumnWidths(1,7,100);
  ss.setColumnWidth(2,500);
  ss.setColumnWidth(7,150);

  sendSheetCreationNotification(name);
}

function getSheetnameData(sheet) {
  var sheetName = sheet.getName().toUpperCase().split('/');
  var mes = MESES.indexOf(sheetName[0]);
  var ano = Number(sheetName[1]);

  return {
    sheetName: sheetName,
    dataInicial: new Date(ano, mes, 1),
    dataFinal: new Date(ano, mes + 1, 0)
  }
}

function getSheetData() {
  var periodo = getSheetnameData(sheet);
  periodo =  {
    dataInicial: Utilities.formatDate(periodo.dataInicial, TIMEZONE, "yyyy-MM-dd"),
    dataFinal: Utilities.formatDate(periodo.dataFinal, TIMEZONE, "yyyy-MM-dd")
  }

  getEntries(periodo.dataInicial, periodo.dataFinal);
}


function getEntries(dataInicial, dataFinal, page) {
  page = page || 1;

  var headers = {
    "Authorization" : "Basic " + Utilities.base64Encode(apiToken + ':api_token')
  };

  var options = {
    "method":"get",
    "headers":headers
  };

  var url = 'https://toggl.com/reports/api/v2/details';
  var queryString = '?workspace_id=' + workspace_id;
  queryString += '&since=' + dataInicial;
  queryString += '&until=' + dataFinal;
  if (clients_id != undefined) {
    queryString += '&client_ids=' + clients_id;
  }
  queryString += '&order_field=date&order_desc=true'
  queryString += '&page=' + page;
  queryString += '&user_agent=api_test';
  
  Logger.log(url + queryString)

  try {
    var result = UrlFetchApp.fetch(url + queryString, options);
  } catch(err) {
    adicionaErro(err);
  }

  if (result.getResponseCode() == 200) {
    var response = JSON.parse(result.getContentText());

    preencheTabela(response, page);

    Logger.log(url + queryString);
    Logger.log('Resultados: ' + response.data.length);

    // verifica se há mais itens do que foi listado até o momento
    if (response.total_count > page * response.per_page) {
      getEntries(dataInicial, dataFinal, ++page);
    }
  } else {
    adicionaErro('Não foi possível obter dados.');
  }
}

function adicionaErro(erro) {
  sheet.getRange('G1').setValue('Falha na execução em:');
  sheet.getRange('G2').setValue(new Date());
  sheet.getRange('G3').setValue(erro);
}

function preencheTabela(response, page) {

  if (page == 1) {
    sheet.getRange('A2:E200').clear();
    sheet.getRange('G1:G3').clear();
  }

  response.data.forEach(function(time, index) {
    var i = index + ((page -1) * response.per_page ) + 2;
    const COLS = {
      DATA: 1,
      DESC: 2,
      INICIO: 3,
      FIM: 4,
      DURACAO: 5
    };

    sheet.getRange(i, COLS.DATA).setValue(Utilities.formatDate(new Date(time.start), TIMEZONE, 'dd/MM/yyyy'));
    sheet.getRange(i, COLS.DESC).setValue(time.description);
    sheet.getRange(i, COLS.INICIO).setValue(Utilities.formatDate(new Date(time.start), TIMEZONE, 'HH:mm:ss'));
    sheet.getRange(i, COLS.FIM).setValue(Utilities.formatDate(new Date(time.end), TIMEZONE, 'HH:mm:ss'));
    sheet.getRange(i, COLS.DURACAO).setValue(msToTime(time.dur));
  });

  sheet.getRange('G1').setValue('Última execução:');
  sheet.getRange('G2').setValue(new Date());
}

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs; // milliSecs are not shown but you can use ms if needed
}
