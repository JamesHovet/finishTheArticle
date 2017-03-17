console.log(document);

// if (document.title.indexOf("Medium") != -1) {
//     //Creating Elements
//     var btn = document.createElement("BUTTON")
//     var t = document.createTextNode("CLICK ME");
//     btn.appendChild(t);
//     //Appending to DOM
//     document.body.appendChild(btn);
// }


const HREF_REGEX = /href=\"(.*?)\"/g
const INNER_HTML_REGEX = />[^<]*<\/a>/
const A_HREF = /(<a.*?href=".*?\/a>)/g
const CONTEXT_ADD = 200

var stripLinks = function stripLinks(str) {
    anchors = str.match(A_HREF);
    // console.log(anchors);
    extracted = anchors.map(extractHref);
    return extracted
}
function cleanup(str){
    return str.replace(/^\s+|\s+$/g, '');
}

var extractHref = function extractHref(str) {
    hrefMatch = str.match(HREF_REGEX);
    inner = str.match(INNER_HTML_REGEX)[0];
    inner = inner.substring(1, inner.length - 4);
    inner = cleanup(inner);
    href = hrefMatch[1].substring(6, hrefMatch[1].length - 1);
    // href = href.replace(/http:/, "https:")
    return {
        "href" : href,
        "inner" : inner
    }
}


//see "https://medium.com/@girlziplocked/the-crippling-fear-of-medical-poverty-352177059149#.61mqs2g4m"

// var getLinks = function getLinks() {
//     var sections = document.getElementsByClassName("section-inner");
//     var links = [];
//     for(var section = 0; section < sections.length; ++section){
//         var node = sections[section];
//         var elementsWithLinks = []
//         // var node = document.body
//
//         for (var i = 0; i< node.childNodes.length; ++i){
//             var childInnerHTML = node.childNodes[i].innerHTML;
//             // console.log(childInnerHTML);
//             if (childInnerHTML.match(A_HREF)){
//                 // console.log(childInnerHTML.match(A_HREF));
//                 elementsWithLinks.push(node.childNodes[i])
//             }
//         }
//
//         out = elementsWithLinks.map((el) => stripLinks(el.innerHTML))
//         links = links.concat(out);
//     }
//     var merged = [].concat.apply([], links);
//     return merged;
// }

function getLinks() {
    var articleDivs = document.getElementsByClassName("postArticle-content")
    if (articleDivs.length > 1) {
        console.log("too many elements");
        return null;
    } else {
        text = articleDivs[0].innerHTML;
        anchorMatches = text.match(A_HREF);
        out = anchorMatches.map(extractHref);
        return out;
    }
}

// function httpGetAsync(theUrl, callback)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous
//     xmlHttp.send(null);
// }
//
// function handleReceiveRequest(responceText){
//     parser = new DOMParser();
//     xmlDoc = parser.parseFromString(responceText,"text/html");
//
//     // console.log("from handler")
//     // console.log(xmlDoc)
//     // console.log(xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue)
//
//     title = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue
//     console.log(title);
//
// }
links = getLinks();
console.log(links);

chrome.runtime.sendMessage({"links" : links}, function(response) {
  console.log(response.fullLinks);
});



//BASICALLY, we have the content page (this one) send a message to the event page (eventPage.js) and then the event page can make the xml request and then send back some data that we can use here.

//this is all because the page itself cannot make an http request, only https. once the event page makes the request and sends back data, we will use it to make the links have rich previews. YAY


// console.log(getLinks());
