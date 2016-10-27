/**********************************************************************
***********************************************************************

        共通

***********************************************************************
**********************************************************************/

    /********************************************************************
        栞の読み込み
    *********************************************************************/

        /*

        CurrentPage = "1-2";

        if (CurrentPage.indexOf("-") >= 0) {
            CurrentSection = CurrentPage.split("-")[0];
            CurrentSubsection = CurrentPage.split("-")[1];
        } else {
            CurrentSection = CurrentPage;
            CurrentSubsection = "";
        };


        if (Number(CurrentSection) <= 3) {
            Phase = "1";        
        } else if (Number(CurrentSection) <= 6) {
            Phase = "2";
        } else {
            Phase = "3";
        };

        */

    var Phase = "1";

var NovelTitle = "ふたりのハードプロブレム";
var SecList = [
    {title:"プロローグ",section:"prologue",subsection:"0",phase:"1"},
    {title:"虹を閉じ込めた瞳",section:"1",subsection:["1","2","3","4","5","6","7"],phase:"1"},
    {title:"海へいこう",section:"2",subsection:["1","2","3","4","5","6"],phase:"1"},
    {title:"その柔肌は誰がために",section:"3",subsection:["1","2","3","4","5","6","7","8"],phase:"1"},
    {title:"因果の玉突き",section:"4",subsection:["1","2","3","4","5","6"],phase:"2"},
    {title:"機械の少女",section:"5",subsection:["1","2","3","4","5","6","7","8"],phase:"2"},
    {title:"もうひとつの部屋",section:"6",subsection:["1","2","3","4","5"],phase:"2"},
    {title:"エピローグ",section:"epilogue",subsection:"0",phase:"3"},
    {title:"あとがき",section:"afterwords",subsection:"0",phase:"0"},
    {title:"Acknowledgements",section:"acknowledgements",subsection:"0",phase:"0"},
    {title:"References",section:"references",subsection:"0",phase:"0"}
];


function GetSecData (SearchStr, SearchKey, OutputKey) {
    for (var i=0; i<=SecList.length; i++) {
        if (SecList[i][SearchKey] == SearchStr) {
            if (OutputKey == "index") {
                return i;
            } else {
                return SecList[i][OutputKey];
            }
            break;
        }
    }
}


function DisplayCover(){
    document.getElementById("LoadingIcon").style.display = "none";
    document.getElementById("Cover").style.display = "block";
}


function DisplayContent() {
    document.getElementById("LoadingIcon").style.display = "none";
    document.getElementById("TextBackground").style.display = "block";
    LoadText();
}

function ChangeLoading() {
    document.getElementById("LoadingIcon").src = "images/" + Phase + "/loading.gif";
}



    

/**********************************************************************
***********************************************************************

        カバーページ関連

***********************************************************************
**********************************************************************/

function MakeCover(){
    target = document.getElementsByTagName("html");
    target[0].innerHTML = target[0].innerHTML.replace(/images\/[1-3]\//g,"images/" + Phase + "/");
    target = document.getElementById("Cover");
    target.style.backgroundImage = 'url("images/' + Phase + '/cover.png")';
    target = document.getElementById("Index1");
    target.innerHTML = '<span class="SecSpan"><a href="' + SecList[0].section + '.html">' + SecList[0].title + '</a></span>';
    target = document.getElementById("SectionTitle");
    for (var i=0; i<=SecList.length-1; i++) {
        if (SecList[i].subsection != "0") {
            target.innerHTML = target.innerHTML + '§' + SecList[i].section + ' '　+ SecList[i].title;
            if (SecList[i+1].subsection != "0") {
                target.innerHTML = target.innerHTML + '<br>';
            }
        }
    }
    target = document.getElementById("Subsection");
    for (var i=0; i<=SecList.length-1; i++) {
        if (SecList[i].subsection !="0") {
            for (var j=0; j<=SecList[i].subsection.length-1; j++) {
                target.innerHTML = target.innerHTML
                                    + '<span class="SubsecSpan" id="' + SecList[i].section + '-' + SecList[i].subsection[j]
                                    + '"><a href="' + SecList[i].section + '-' + SecList[i].subsection[j]
                                    + '.html">' + SecList[i].subsection[j] + '</a></span>';
            }
            if (SecList[i+1].subsection != "0") {
                target.innerHTML = target.innerHTML + '<br>';
            }
        }
    }
    target = document.getElementById("Index3");
    for (var i=1; i<=SecList.length-1; i++) {
        if (SecList[i].subsection=="0") {          
            target.innerHTML = target.innerHTML
                                + '<span class="SecSpan"><a href="' + SecList[i].section + '.html">'
                                + SecList[i].title + '</a></span>';
            if (i!=SecList.length-1) {
                target.innerHTML = target.innerHTML + '<br>';
            }
        }
    }
}

function OpenIndex(){
    var target = document.getElementById("Index");
    target.style.display="block";    
}

function CloseIndex(){
    var target = document.getElementById("Index");
    target.style.display="none";
}

function OpenCharacters(){
    var target = document.getElementById("Characters");
    target.style.display="block";    
}

function CloseCharacters(){
    var target = document.getElementById("Characters");
    target.style.display="none";
}

function OpenKeyWords(){
    var target = document.getElementById("KeyWords");
    target.style.display="block"; 
}

function CloseKeyWords(){
    var target = document.getElementById("KeyWords");
    target.style.display="none";
}

function OpenSetting(){
    var target = document.getElementById("Setting");
    target.style.display="block"; 
}

function CloseSetting(){
    var target = document.getElementById("Setting");
    target.style.display="none";
}



/**********************************************************************
***********************************************************************

        本文ページ関連

***********************************************************************
**********************************************************************/

function MakeContent() {

    var FileName;
    var Section;
    var Subsection;
    var SecTitle;
    var Prev = new Array();
    var Next = new Array();
    var Text = new XMLHttpRequest();
    var HeadAndBody;
    var CurrentPage;
    var CurrentSection;
    var CurrentSubsection;
    var HTML = new Array();
    var Content;
    var target;
    

    /********************************************************************
        セクション番号の読み込み
    *********************************************************************/

    FileName = window.location.href.split("/").pop();

    if (FileName.indexOf("-") !== -1) {
        Section = FileName.split("-")[0].substring(FileName[0].length - 1);
        Subsection = FileName.split("-")[1].substring(0, 1);
    } else {
        Section = FileName.substring(0, FileName.indexOf(".htm"));
        Subsection = "0";
    };

    SecTitle = GetSecData(Section,"section","title");
    
    /********************************************************************
        head/bodyの出力
    *********************************************************************/
    

    Text.open("GET", "texts/html.txt", false);
    Text.send("");
    target = document.getElementsByTagName("body");
    
    target[0].outerHTML = Text.responseText;
    target = document.getElementsByTagName("title");
    if (Subsection == "0") {
        target[0].innerHTML = SecTitle + "／" + target.innerHTML;
    } else {
        target[0].innerHTML = "§" + Section + " " + SecTitle + "(" + Subsection + ")／" + target[0].innerHTML;
    }
    target = document.getElementsByTagName("link");
    target[0].outerHTML = target[0].outerHTML.replace('<link rel="shortcut icon" href="images/1/favicon.png" type="image/png">',
                                                      '<link rel="shortcut icon" href="images/'+ Phase + '/favicon.png" type="image/png">');
    target = document.getElementById("LoadingIcon");
    target.src = 'images/' + Phase + '/loading.gif';
    if (Subsection == "1") {
        target = document.getElementById("SecCoverImg");
        target.src = 'images/section' + Section + '.png';
        target = document.getElementById("SecCoverLogo");
        target.src = 'images/' + Phase + '/logo_sl.png';
        switch (Section) {
            case "1":
                target.style.right = "5px"
                break;
            case "2":
                target.style.left = "5px"
                break;
            case "3":
                target.style.left = "5px"
                break;
            case "4":
                target.style.right = "5px"
                break;
            case "5":
                target.style.left = "5px"
                break;
            case "6":
                target.style.right = "5px"
                break;
        }
        
    } else {
        target = document.getElementById("SectionCover");
        target.style.display = "none"
    }
    target = document.getElementById("SecCoverLogo");
    

    
    /********************************************************************
        ヘッダー／フッターのリンク修正
    *********************************************************************/

    Prev = document.getElementsByClassName("NaviPrev");
    Next = document.getElementsByClassName("NaviNext");

    
    for (var i in Prev) {
        if (Section == "prologue") {
            document.getElementById("HeaderPrev").style.visibility="hidden";
            document.getElementById("FooterPrev").style.visibility="hidden";
            Next[i].href = '1-1.html';
        } else if (Section == "references") {
            Prev[i].href = 'acknowledgements.html';
            document.getElementById("HeaderNext").style.visibility="hidden";
            document.getElementById("FooterNext").style.visibility="hidden";
        } else {
            if (Subsection == "0") {
                switch (Section) {
                    case "epilogue":
                        Prev[i].href = '6-5.html';
                        Next[i].href = 'afterwords.html';
                        break;
                    case "afterwords":
                        Prev[i].href = 'epilogue.html';
                        Next[i].href = 'acknowledgements.html';
                        break;
                    case "acknowledgements":
                        Prev[i].href = 'afterwords.html';
                        Next[i].href = 'references.html';
                        break;
                }
            } else {
                if (Subsection == "1") {
                    if (Section == "1") {
                        Prev[i].href = 'prologue.html';
                        Next[i].href = '1-2.html';
                    } else {
                        Prev[i].href = String(Number(Section) - 1) + "-"
                                        + String(SecList[GetSecData(String(Number(Section)-1),"section","index")]["subsection"].length) 
                                        + '.html';
                        Next[i].href = Section + "-" + String(Number(Subsection) + 1) + '.html';
                    }
                } else if (Subsection == String(SecList[GetSecData(Section,"section","index")]["subsection"].length)) {
                    if (Section == "6") {
                        Prev[i].href = '6-4.html';
                        Next[i].href = 'epilogue.html';
                    } else {
                        Prev[i].href = Section + "-" + String(Number(Subsection) - 1) + '.html';
                        Next[i].href = String(Number(Section) + 1) + "-" + '1.html';
                    }
                } else {
                    Prev[i].href = Section + "-" + String(Number(Subsection) - 1) + '.html';
                    Next[i].href = Section + "-" + String(Number(Subsection) + 1) + '.html';
                }
            }
        }
    }
                
                
    /********************************************************************
        CSSの読み込み
    *********************************************************************/


    HTML = document.getElementsByTagName("html");
    HTML[0].innerHTML = HTML[0].innerHTML + '<link rel="stylesheet" href="style.css" type="text/css">';
    
    
    


}

    /********************************************************************
            本文の表示
    *********************************************************************/
    function LoadText() {
        var FileName = window.location.href.split("/").pop();

        if (FileName.indexOf("-") !== -1) {
            var Section = FileName.split("-")[0].substring(FileName[0].length - 1);
            var Subsection = FileName.split("-")[1].substring(0, 1);
        } else {
            var Section = FileName.substring(0, FileName.indexOf(".htm"));
            var Subsection = "0";
        };

        var SecTitle = GetSecData(Section,"section","title");

        var Text = new XMLHttpRequest();

        if (Subsection !== "0") {
            Text.open("GET", "texts/" + Section + "-" + Subsection + ".txt", false);
        } else {
            Text.open("GET", "texts/" + Section + ".txt", false);
        };

        Text.send("");

        var Content = Text.responseText;

        while (Content.indexOf('|') > -1) {
            Content = Content.replace('|','<ruby>');
            Content = Content.replace('《','<rp>[</rp><rt>');
            Content = Content.replace('》','</rt><rp>]</rp></ruby>');
        };

        while (Content.indexOf('!sc') > -1) {
            Content = Content.replace('!sc','<span class="SC">');
            Content = Content.replace('sc!','</span>');
        };

        document.getElementById("Content").innerHTML = Content;
    }

