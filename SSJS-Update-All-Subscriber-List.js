<script language=javascript runat=server> 
      Platform.Load("core", "1") 
        var b1 = DataExtension.Init("Test_AddSubscribers"); 
        var data = b1.Rows.Lookup(["IsSubscriber"], ["False"]); 
        if(data){ 
          for (var i = 0; i < data.length; i++){ 
            var status; 
            var EmailAddress = data[i]["EmailAddress"];  
            if(EmailAddress && EmailAddress != ""){ 
              var results = Subscriber.Retrieve({ 
                Property:"SubscriberKey",SimpleOperator:"equals",Value:EmailAddress} 
                                               ); 
              if(results && results[0] && results[0].SubscriberKey == EmailAddress){ 
                var subObj = Subscriber.Init(EmailAddress); 
                var updSubscriber = { 
                  "EmailAddress": EmailAddress, 
                  "EmailTypePreference": "HTML", 
                  "Attributes":{ 
                    "First Name": data[i]["FirstName"], "Last Name": data[i]["LastName"], "City": data[i]["City"]} 
                }; 
                status = subObj.Upsert(updSubscriber); 
                status = status=="OK"? status + '. Updated.' : status; 
              } 
              else{ 
                var newSubscriber = { 
                  "EmailAddress": EmailAddress, 
                  "SubscriberKey": EmailAddress, 
                  "EmailTypePreference": "HTML", 
                  "Attributes":{ 
                    "First Name": data[i]["FirstName"], "Last Name": data[i]["LastName"], "City": data[i]["City"]} 
                }; 
                status = Subscriber.Add(newSubscriber); 
                status = status=="OK"? status + '. Added.' : status; 
              } 
            } 
            else{ 
              status = "Blank email id"; 
            } 
            b1.Rows.Update({ 
                "IsSubscriber": status} 
                              , ["EmailAddress"], [EmailAddress]); 
            Write(Stringify(data[i]["Email Address"]) + status + "<br />"); 
          } 
        }
    </script> 
