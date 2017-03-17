function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function handleReceiveRequest(responceText){
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(responceText,"text/html");

    // console.log("from handler")
    // console.log(xmlDoc)
    // console.log(xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue)

    title = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue
    console.log(title);
    return title;

}

function getTitle(obj) {
    if (obj.href != undefined) {
        obj.title = httpGetAsync(obj.href, handleReceiveRequest);
        console.log(obj);
        return obj;
    } else {
        console.log("no href in object");
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log(request);
        titles = console.log(request.links.map(getTitle))


        sendResponse({fullLinks: [{
            "href" : "http://example.com",
            "inner" : "innerExample",
            "title" : "example title"
            }]
        });

        return true;
    }
);
