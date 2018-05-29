// ==UserScript==
// @name         Data Flup
// @namespace    http://esheep.ch/
// @version      0.6
// @description  Show me some stuff...
// @author       Raphael Theiler
// @include         *
// @grant        GM_registerMenuCommand
// @updateURL    https://raw.githubusercontent.com/ammoniak/TamperMonkeyScripts/master/DataFlup.js
// ==/UserScript==

(function() {
    'use strict';
    var traversed=[];

    var process = function(key,value) {
            console.log(key + " -> " + value);
    };

    var traverse = function(o,func) {
        traversed.push(o);
        for (var i in o) {
            //func.apply(this,[i,o[i]]);
            if (i.substr(0,1)!="_" && i!="cssRules" && i!="rules"){
                if (o[i] !== null && typeof(o[i])=="object" && traversed.indexOf(o[i])<0) {
                    if (i!="cssRules"){
                        if(o[i].pbRender===false){
                            o[i].set_pbRender(true);
                            console.log(o[i]);
                        }
                        if(o[i].pbVisible===false){
                            o[i].set_pbVisible(true);
                        }
                         if(o[i].pbReadOnly===true){
                            o[i].set_pbReadOnly(false);
												 }
                        if(o[i].pbEnabled===false){
                            o[i].set_pbEnabled(true);
                        }
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


    //that's all... no magic, no bloated framework
    traverse(oWebApp,process);
    // Your code here...
    console.log("Hello world");
    };
    GM_registerMenuCommand("DataFlup - show everything", showEverything, "d")
})();
