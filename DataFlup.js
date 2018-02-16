// ==UserScript==
// @name         Data Flup
// @namespace    http://esheep.ch/
// @version      0.3
// @description  Show me some stuff...
// @author       Raphael Theiler
// @match        http://tampermonkey.net/index.php?version=4.5&ext=dhdg&updated=true
// @grant        none
// ==/UserScript==

(function() {
    console.log("Hello world");
    //'use strict';
    var traversed=[];

    function process(key,value) {
            console.log(key + " -> " + value);
    }

    function traverse(o,func) {
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
    }

    //that's all... no magic, no bloated framework
    traverse(oWebApp,process);

    // Your code here...
    console.log("Hello world");
})();
