var contexts = ["selection"];

// search text Youtube
chrome.contextMenus.create({
  title: "Search '%s' Youtube", 
  contexts:contexts, 
  onclick: function(info, tab){ 
    var selectionText = info.selectionText;
    var youtubeSearchUrl = "http://www.youtube.com/results?search_query="+selectionText;
    createTab(youtubeSearchUrl);    
  }
});

// send text Translate
chrome.contextMenus.create({
  title: "Translate '%s' to Turkish", 
  contexts:contexts, 
  onclick: function(info, tab){
    var selectionText = info.selectionText;
    var translateTextUrl = "https://translate.google.com.tr/?hl=tr#en/tr/"+selectionText;
    openWindow(translateTextUrl);
  }
});

// send link Translate
chrome.contextMenus.create({
  title: "Translate selected link to Turkish", 
  contexts:["link"], 
  onclick: function(info, tab){
    var translateLinkUrl = "https://translate.google.com.tr/translate?sl=en&tl=tr&js=y&prev=_t&hl=tr&ie=UTF-8&u="+info.linkUrl+"&edit-text=&act=url";
    createTab(translateLinkUrl);  
  }
});

// send Gmail
chrome.contextMenus.create({
  title: "Send selected text Gmail", 
  contexts:contexts, 
  onclick: function(info, tab){
    var selectionText = info.selectionText;
    var pageUrl = info.pageUrl;
    var mailBody = selectionText +" - "+ pageUrl;
    var translateUrl = "https://mail.google.com/mail/u/0/?view=cm&fs=1&body="+mailBody+"&tf=1";
    createTab(translateUrl);
  }
});

// common funcs
function createTab(url) {
  var tabProperties = {"url" : encodeURI(url)};
  chrome.tabs.create(tabProperties);
}

var createdWindowId = 0;

function openWindow(url){
  if(createdWindowId != 0) {
    chrome.windows.remove(createdWindowId);
  }
  
  chrome.windows.create({'url': url, 'type': 'popup'}, function(window) {
      createdWindowId = window.id;
  });

}