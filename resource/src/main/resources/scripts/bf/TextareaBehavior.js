/*
 * Copyright (c) 2012. betterFORM Project - http://www.betterform.de
 * Licensed under the terms of BSD License
 */

define(["dojo/behavior"],
    function(behavior) {

        return {

        // ############################## TEXTAREA MAPPINGS ############################################################
        // ############################## TEXTAREA MAPPINGS ############################################################
        // ############################## TEXTAREA MAPPINGS ############################################################
        // xfControl xfTextarea aDefault xsdString xfEnabled xfReadWrite xfOptional xfValid mediatypeHtml
        '.xfTextarea.mediatypeHtml .xfValue' : function (n) {
            var xfControl = dijit.byId(bf.XFControl.getXfId(n));

            xfControl.setValue = function (value) {
                n.innerHTML = value;
            };

            dojo.connect(n,"onkeyup",function(evt){
                // console.debug("onkeypress",n);
                xfControl.sendValue(n.value,evt);
            });

            dojo.connect(n,"onblur",function(evt){
                // console.debug("onblur",n);
                xfControl.sendValue(n.value, evt);
            });

        }
    }
});

