function loadScript(url, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    var done = false;
    script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            done = true;
            callback();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
        }
    };
    head.appendChild(script);
}
// make sure your cdn is pointing to https
loadScript("https://code.jquery.com/jquery-2.1.0.min.js", function () 
{

    //grabs your SessionId from the cookies and set it so we can re-use it
    var session = document.cookie.match(/(^|;\s*)sid=(.+?);/)[2];
	
	var account = {"Name": "Aman"};
	
	    //calls Salesforce REST API with jQuery
    jQuery.ajax({
        type: "POST",
        url: "https://ap2.salesforce.com/services/data/v30.0/sobjects/Account/",
		data: account,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "OAuth " + session);
            xhr.setRequestHeader('Accept', "application/json");
            xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
            //usually not needed but when you are
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST');

        },
        success: function (data) {
            alert("Salesforce REST API POST")
            console.log(data);
        }
    });

    //calls Salesforce REST API with jQuery
    jQuery.ajax({
        type: "GET",
        url: "https://ap2.salesforce.com/services/data/v30.0/query/?q=SELECT+Name+FROM+Account+LIMIT+5",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "OAuth " + session);
            xhr.setRequestHeader('Accept', "application/json");
            //usually not needed but when you are
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');

        },
        success: function (data) {
            alert("Salesforce REST API GET")
            console.log(data);
        }
    });
});
