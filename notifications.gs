function sendSheetCreationNotification(name) {
  MailApp.sendEmail(Session.getActiveUser().getEmail(),
                    '[TOGGL] Criação de nova aba de mês',
                    'Foi criada uma nova aba na sua planilha de horas, referente ao mês: ' + name);
}
