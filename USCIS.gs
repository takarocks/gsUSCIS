/**
 * Get USCIS Status
 * Version 0.1
 *
 * @return USCIS Case Status text
 * @customfunction
 */
function getStatus(caseid, querytype) {
  var url = 'https://egov.uscis.gov/casestatus/mycasestatus.do';
  var formData = {
    'appReceiptNum': caseid,
    'initCaseSearch': querytype
  };
  var options = {
    'method' : 'post',
    'payload' : formData
  };
  var html = UrlFetchApp.fetch(url, options);
  var output = null;

  // TO-DO http status code checker

  // error message check
  var regExpErrMsg = new RegExp('(<div id="formErrorMessages">)(.*?)(<\/div>)','gs');
  var errMsg = regExpErrMsg.exec(html)[2].replace(/<[^>]+>/g,"").replace(/[\n\r]+/g,"").split(" ").join(" ").trim();

  // If an error message exists, return the message.
  if (errMsg.length > 1) {
    output = errMsg;
  } else {
    // case status retrieval
    var regExpStatus = new RegExp('(<h1>)(.*?)(<\/h1>)','gs');
    var status = regExpStatus.exec(html)[2];
    output = status;
  }

  return output;
}


/**
 * Get USCIS Case status
 *
 * @param caseid          USCIS Case ID
 *
 * @return casestatus     Case status text string
 * @customfunction
 */
function USCIS(caseid) {
  if (caseid == null) {
    // return if caseid is not provided
    return null;
  };
  //var caseid = '';
  var querytype = 'CHECK STATUS';
  casestatus = getStatus(caseid, querytype);
  return casestatus;;
}
