//取得參數
var cm_js = document.getElementById("cm_main_js");
var cm_iframe_src = cm_js.getAttribute("iframe_src");
var cm_css_href = cm_js.getAttribute("css_href");
var cm_post_url = cm_js.getAttribute("post_url");

// console.log('loading')
// //取得user account
// var gmauseridInput = document.getElementById("gmauserid");
// var gmauserid = "";
// if (gmauseridInput) {
//   gmauserid = gmauseridInput.value;
// }
// cm_iframe_src = cm_iframe_src.replace("{userName}", gmauserid);

//判斷裝置類型
var cm_css_active = "cm_active";
var cm_css_show = "cm_show";
var cm_css_main_div = "cm_main_div"
var isM = isMobileDevice();

if (!isM) {
  cm_css_active += "_pc";
  cm_css_show += "_pc";
  cm_css_main_div += "_pc";
}

//插入css檔
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = cm_css_href;
document.getElementsByTagName('HEAD')[0].appendChild(link);

//插入iframe
var cm_iframe = document.createElement("iframe");
cm_iframe.scrolling = "no";
cm_iframe.style = "border:none;width:100%;height:100%;";
cm_iframe.src = "";

//插入關閉按鈕
var cm_close = document.createElement("div");
cm_close.id = "cm_close";
cm_close.classList.add("cm_close");
// cm_close.innerText = "X";
cm_close.addEventListener("click", closeCM);

//插入關閉按鈕圖
var cm_close_img = document.createElement("img");
cm_close_img.src = cm_iframe_src.split("#")[0] + "static/close.svg";

cm_close.appendChild(cm_close_img);

//插入主要容器div
var cm_main_div = document.createElement("div");
cm_main_div.id = "cm_main_div";
cm_main_div.classList.add(cm_css_main_div);

cm_main_div.appendChild(cm_close);
cm_main_div.appendChild(cm_iframe);

var cm_body = document.getElementsByTagName("body")[0];
cm_body.appendChild(cm_main_div);

//PC版產生客服按鈕
var cm_service_div;
var tArr = cm_iframe_src.split("&");
var templateColor = "", token = "",lang ="en";
for (var k in tArr) {
  if (tArr[k].indexOf("templateColor") > -1) {
    templateColor = tArr[k].split("=")[1];
  }
  if (tArr[k].indexOf("token") > -1) {
    token = tArr[k].split("=")[1];
  }
  if (tArr[k].indexOf("lang") > -1) {
    lang = tArr[k].split("=")[1];
  }
}

if (!isM) {
  cm_service_div = document.createElement("div");
  cm_service_div.classList.add("cm_service");
  cm_service_div.addEventListener("click", openCM);
  var cm_service_img = document.createElement("img");
  cm_service_img.src = cm_iframe_src.split("#")[0] +  "static/service.png";
  cm_service_div.appendChild(cm_service_img);

  if (templateColor) {
    cm_service_div.setAttribute("style", "background-color:" + templateColor + " !important;");
  }
  cm_body.appendChild(cm_service_div);
}
//======插入廣告 Start=====
var cm_ad_box = document.createElement("div");
cm_ad_box.style.display = "none";
cm_ad_box.id = "cm_ad_box";
cm_ad_box.classList.add("cm_ad_box");
cm_body.appendChild(cm_ad_box);

//插入廣告取消XX
var cm_ad_x1 = document.createElement("div");
cm_ad_x1.id = "cm_ad_x1";
cm_ad_x1.innerHTML = 
`
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAABBklEQVQokcWRPU7DQBCFv7cl5grQR74CihUqRIALICwaIy5ATdJzAEgKpCAugAhQgWzlClF6rgBJuUPjRfaGEsFUu/Pm05sf+K9QeCyqIjNzE8nnne64jAtr/U7yJ0F3QTRzE2DbzE0XVZH9AE6BrbqONuztGPgAEjP3NC/PdwHmb2c7Zu4RSICVMztdaztySIClwUAwCH/J95sjteDgJKdnYLORXhk6TLPr12atI4q0N5oZDJs5g8sY/F3nRVVkcnqpwaXBBbAENoQ9xFf4huOtGjpKs5sr87YHfBJdoQXL6T44Sn4/tJj2RjPJHzQ6uF2H5XPgPT4HQKc7LiXfr/U83tPfxxdjFIL1C85k8QAAAABJRU5ErkJggg==">
`;
cm_ad_x1.addEventListener("click", function () {cm_ad_box.classList.add("cm_service_active")});//關閉廣告彈窗
cm_ad_x1.classList.add("cm_ad_x1");
cm_ad_box.appendChild(cm_ad_x1);

//廣告詞框
var cm_ad = document.createElement("div");
cm_ad.id = "cm_ad";
cm_ad.classList.add("cm_ad");
cm_ad.classList.add("user");
cm_ad.innerText = `\u00a0`;

var cm_ad_user_box  = document.createElement("div");
cm_ad_user_box.id = "cm_ad_user_box";
cm_ad_user_box.classList.add("cm_ad_user_box");
cm_ad_user_box.appendChild(cm_ad);
cm_ad_box.appendChild(cm_ad_user_box);

cm_ad_user_box.appendChild(cm_ad);
cm_ad_box.classList.add("cm_service_active");

//客服頭像與輸入框
var cm_ad_remote_box  = document.createElement("div");
cm_ad_remote_box.id = "cm_ad_remote_box";
cm_ad_remote_box.classList.add("cm_ad_remote_box");
cm_ad_remote_box.innerHTML = cm_ad_remote_box.innerHTML +  
`<div class="cm_avatar">
  <div class="pic">
    <img id="cm_sticker">
  </div>
</div>`;
// cm_ad_remote_box.appendChild(cm_ad_remote);
cm_ad_box.appendChild(cm_ad_remote_box);

//訊息框呈現
placeholderList = {'zh-tw':"請輸入訊息...",'zh-cn':"请输入讯息...",'en':"Please enter a message...",'en-ph':"Mangyaring magpasok ng mensahe...",'vi':"Vui lòng nhập thông tin..." } 
var placeholder =　placeholderList[lang]
 
var cm_semd_messenge_box  = document.createElement("div");
cm_semd_messenge_box.id = "cm_semd_messenge_box";
cm_semd_messenge_box.classList.add("cm_semd_messenge_box");
cm_semd_messenge_box.innerHTML = 
`<div class="cm_footer">
  <div class="input_message"> 
    <input id="cm_input" type="text" placeholder="`+placeholder+`" maxlength="50">
  </div>
  <img id="cm_submit" class="cm_submit" src="`+ cm_iframe_src.split("#")[0] +`static/send.png">
</div>`;
cm_ad_remote_box.appendChild(cm_semd_messenge_box);

//======插入廣告 End=====

//打開客服系統
function openCM() {
  // //取得user account
  var gmauseridInput = document.getElementById("gmauserid");
  var gmauserid = "";
  if (gmauseridInput) {
    gmauserid = gmauseridInput.value;
  }
  cm_iframe_src = cm_iframe_src.replace("{userName}", gmauserid);

  if (cm_iframe.getAttribute("src") == "") {
    cm_iframe.src = cm_iframe_src;
  }

  if (!isM) {
    cm_service_div.classList.add("cm_service_active");
  }

  cm_main_div.classList.add(cm_css_show);
  setTimeout(function () {
    cm_main_div.classList.add(cm_css_active);
  }, 10);
}

//關閉客服系統
function closeCM() {
  cm_main_div.classList.remove(cm_css_active);
  setTimeout(function () {
    cm_main_div.classList.remove(cm_css_show);
    if (!isM) {
      cm_service_div.classList.remove("cm_service_active");
    }
  }, 300);
}

//判斷是否為行動裝置
function isMobileDevice(){
  var mobileDevices = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
  var isM = false;
  for (var i=0 ; i<mobileDevices.length ; i++){
    if (navigator.userAgent.match(mobileDevices[i])) {
      isM = true;
    }
  }
  return isM;
}

//取得亂數
function randomusefloor(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

//取得亂數文字
function makerandomletter(max) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < max; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function getRandomWord() {
  return makerandomletter(2)+randomusefloor(10000,99999);
}


var waitingTime = 60; //無動作時間 
//*****監聽滑鼠動作*****
timeCounter = 0
timeoutID = window.setInterval(( () => {
  // console.log(' timeCounter ', timeCounter)
  if(timeCounter % waitingTime == 0 && !isLoadedMessege) { //每10秒檢查reqeust 並再送出
    if(!token) {
      return
    }
    sendRequest()
  }
  if(timeCounter % waitingTime == waitingTime - 1) { //顯示
    if(!isLoadedMessege) {
      console.log('isLoadedMessege ',isLoadedMessege) 
    }

    if(!cm_main_div.classList.contains(cm_css_show))  cm_ad_box.classList.remove("cm_service_active");
  } 
  timeCounter++;
}), 1000);
document.addEventListener("mousemove", function(){ timeCounter = 0 });
document.addEventListener("touchmove", function(){ timeCounter = 0 });
document.getElementById('cm_submit').addEventListener("click", function(){
  var inputText = document.getElementById("cm_input").value
  if(inputText == '') return 
  cm_ad_box.classList.add("cm_service_active")
  cm_iframe_src = cm_iframe_src + `&msg=${inputText}`
  cm_iframe.src = cm_iframe_src

  document.getElementById("cm_input").value = ''
  cm_iframe_src = cm_iframe_src.split('&msg=')[0]
  openCM()
});
//*****監聽滑鼠動作*****

var request = new XMLHttpRequest(); 
var isLoadedMessege = false
// 定義連線方式
request.onload = reqOnload; 
request.onerror = reqError;

function sendRequest() {
  request.open('POST', cm_post_url, true);
  request.send(JSON.stringify({
          'token': token,
          'lang':lang
    }));
}
function reqOnload () {
  isLoadedMessege =true;
  const data = JSON.parse(this.responseText);
  console.log("reqOnload.",data);
  if(data.status == true) {
    cm_ad_box.style.display = "inline-flex";
    cm_ad.innerText = data.data.message
    var sticker = document.getElementById('cm_sticker');
    sticker.src = data.data.sticker
  }
}
function reqError (err) {
  console.log("reqError.",reqError);
}