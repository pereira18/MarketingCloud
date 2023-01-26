<script runat="server">
  /************************************************* 
  Filtro: (x != xxxxx && y is null && z >= getUTCDate() ) 
 *************************************************/ 
  Platform.Load("core","1.1.1");
  var ExternalKey = "DE EXTERNAL KEY"
  var DE = DataExtension.Init(ExternalKey);
  var currentDate = new Date();

  var complexFilter = {
    LeftOperand: {
      Property: "x", 
      SimpleOperator: "notEquals", 
      Value: "xxxxx" 
    },
    LogicalOperator: "AND",
    RightOperand: {
      LeftOperand: {
        Property: "y", 
        SimpleOperator: "isNull"
      },
      LogicalOperator: "AND",
      RightOperand: {
        Property: "z", 
        SimpleOperator: "greaterThanOrEqual", 
        Value: currentDate 
      }
    }
  }

  var data = DE.Rows.Retrieve(complexFilter);
  Write("Rows to be deleted: " + data.length + "</br>");

  var objs = [];

  if(data.length > 0){
    for (var i=0; i<data.length; i++) {
      objs.push({
        CustomerKey: ExternalKey,
        Keys: [{Name:"ID", Value:data[i].ID}]
      });
    }

    var prox = new Script.Util.WSProxy();

    var res = prox.deleteBatch("DataExtensionObject", objs);
    Write(" Total of deleted Rows: " + objs.length + " </br>");
    Write(" Deleted Rows: " + Stringify(res) + " </br>");
  }else{
    Write(" There are not rows to be deleted </br>");
  }

</script>

