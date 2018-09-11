// ==UserScript==
// @name         Data Flup
// @namespace    http://esheep.ch/
// @version      0.9.1
// @description  Show me some stuff...
// @author       Raphael Theiler
// @include         *
// @grant        GM_registerMenuCommand
// @updateURL    https://raw.githubusercontent.com/ammoniak/TamperMonkeyScripts/master/DataFlup.js
// @downloadURL  https://raw.githubusercontent.com/ammoniak/TamperMonkeyScripts/master/DataFlup.js
// ==/UserScript==

(function() {
    'use strict';
    var traversed=[];

    var process = function(key,value) {
            //console.log(key + " -> " + value);
        if(key.pbRender===false){
            key.set_pbRender(true);
            //console.log(o[i]);
        }
        if(key.pbVisible===false){
            key.set_pbVisible(true);
        }
        if(key.pbReadOnly===true){
            key.set_pbReadOnly(false);
        }
        if(key.pbEnabled===false){
            key.set_pbEnabled(true);
        }
    };

    var getReturnMethod = function(key,value){
        if (key.psReturnMessage != undefined){
            console.log("psReturnMessage: " + key.psReturnMessage + " -> " + key.psReturnObject)
        }
    }

    var traverse = function(o,func) {
        traversed.push(o);
        for (var i in o) {
            //func.apply(this,[i,o[i]]);
            if (i.substr(0,1)!="_" && i!="cssRules" && i!="rules"){
                if (o[i] !== null && typeof(o[i])=="object" && traversed.indexOf(o[i])<0) {
                    if (i!="cssRules"){

                        func(o[i]);
                    }
                    //going one step down in the object tree!!
                    traverse(o[i],func);
                }
            }
        }
    };
    var showEverything = function (){
    console.log("Hello world");
    traversed=[];
    traverse(oWebApp,process);
    console.log("Hello world");
    };
    var showReturnMessages = function (){
    console.log("Hello world");
    traversed=[];
    traverse(oWebApp,getReturnMethod);
    console.log("Hello world");
    };
    GM_registerMenuCommand("DataFlup - show everything", showEverything, "d")
    GM_registerMenuCommand("DataFlup - show all psReturnMessages", showReturnMessages, "d")
    document.addEventListener('keydown', function(e) {
        // pressed cstrl+shit+a
        if (e.keyCode == 65 && e.shiftKey && e.ctrlKey) {
            console.log("key!");
            showEverything();
        }
    }, false);
})();
