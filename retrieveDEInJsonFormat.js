<script runat="server">

Platform.Load("core", "1.1.1");

var config = {
    name: "DATA_EXTENSION_NAME",
    cols: ["FIELD1", "FIELD2","FIELD3"]
}

var records = retrieveRecords(config);

var text = '{"items":' + Stringify(records) + '}';
  
Write(text);
  
  
function retrieveRecords(config) {

    var prox = new Script.Util.WSProxy();

    var data = prox.retrieve("DataExtensionObject[" + config.name + "]", config.cols, config.filter);
  
    var records = formatResult(data);
  
    return records;
}
 
function formatResult(data) {
    var results = [];
    for (var i = 0; i < data.Results.length; i++) {
      var result_list = data.Results[i].Properties;
      var obj = {};
      for (k in result_list) {
        var key = result_list[k].Name;
        var val = result_list[k].Value
        if (key.indexOf("_") != 0) obj[key] = val;
      }
      results.push(obj);
    }
   return results;
}  
</script>
