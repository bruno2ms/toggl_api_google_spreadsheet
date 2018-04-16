// Sua token para acesar a API do toggle
// pode ser obtida em: https://toggl.com/app/profile
var apiToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';

// Para obter os id's de workspace e clientes, acesse a página reports, selecione o workspace e cliente e aplice o filtro
// Você será redirecionado para a página com a seguinte url:
// https://toggl.com/app/reports/summary/[WORKSPACE_ID]/period/thisWeek/clients/CLIENTS_ID/billable/both
var workspace_id = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';

// Comente esta variável caso todas suas entradas sejam do mesmo cliente
var clients_id = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';

// Configure o trigger no GOOGLE SCRIPTS
// Edit > Current project's triggers
// Clique em "Add a new trigger"
// Selecione a função "__init" e configure a frequência desejada
// Caso queira ser notificado quando ocorrer um erro, configure as notifications

// Configure o trigger no GOOGLE SCRIPTS
// Edit > Current project's triggers
// Clique em "Add a new trigger"
// Selecione a função "__init" e configure a frequência desejada
// Caso queira ser notificado quando ocorrer um erro, configure as notifications

// Execute a função __init, pelo editor de Scripts,
// O gogole pedirá que você dê permissão de acesso à planilha (Provavelmente o google identificará a si mesmo como inseguro :shrug:)
