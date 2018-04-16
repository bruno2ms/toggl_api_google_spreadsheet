# Toggl and Google SpreadSheet integration

Docs on `setup.gs`


## Instalação

Pequenos passos de como instalar e executar o script


### Obtendo configurações

Acesse o [site do toggle](git@github.com:bruno2ms/toggl_api_google_spreadsheet.git)
e copie sua *token* de acesso, substitua no local indicado em [setup.gs](setup.gs).

Para obter os id's de workspace e clientes, acesse a [página reports](https://toggl.com/app/reports/),
selecione o workspace e cliente e aplice o filtro Você será redirecionado para a página com a seguinte url:
`https://toggl.com/app/reports/summary/[WORKSPACE_ID]/period/thisWeek/clients/CLIENTS_ID/billable/both`

Caso deseje restringir sua planilha de horas copie esse WORKSPACE_ID e CLIENTS_ID e preencha-os no setup.gs.


### Adicionando ao Google

Acesse o menu na aba da sua Planilha de Jornada de Horas **Ferramentas >
Editor** de Script cole o conteudo do [setup.gs](setup.gs) modificado com sua
chave de api e outras configuraçẽos pertinentes. O Google provavelmente pedirá
permissão de execução do script, conceda-o.

Copie o conteúdo do [script.gs](script.gs) para o google também. Vá na home do google e no menu
deverá ter uma nova opção `Toggl`, você pode clicar e pedir para atualizar sua planilha a qualquer hora.
> Pode ser que o google só te peça a permissão ao tentar executar manualmente.
