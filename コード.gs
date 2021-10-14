function submitForm(e){
  // Google Form Submissions
  const itemResponses = e.response.getItemResponses();
  let text = "";
  for(var i = 0; i < itemResponses.length; i++){
    let itemResponse = itemResponses[i];
    let question = itemResponse.getItem().getTitle();
    let answer = itemResponse.getResponse();
    text += "\n" + question + "\n" + answer;
  }
  // Webhook URL
  const postUrl = PropertiesService.getScriptProperties().getProperty('targetUrl');
  const payload = {
    "text": text
  }
  const options = {
    "method":"POST",
    "headers":{"Content-Type":"application/json; charset=UTF-8"},
    "payload": JSON.stringify(payload),
    "muteHttpExceptions":true
  }
  const result = UrlFetchApp.fetch(postUrl, options);
}
function registerScriptProperty(){
  PropertiesService.getScriptProperties().deleteAllProperties;
  // set Webhook URL
  PropertiesService.getScriptProperties().setProperty('targetUrl', '');
}
