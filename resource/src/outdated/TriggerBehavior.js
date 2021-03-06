/*
 * Copyright (c) 2012. betterFORM Project - http://www.betterform.de
 * Licensed under the terms of BSD License
 */

define(["../../../lib/dojo-release-1.6.1-src/dojo/behavior","../main/lib/dojo-release-1.7.2-src/dojo/_base/connect"],
    function(behavior,connect) {
        return {


        // ############################## TRIGGER MAPPINGS ############################################################
        // ############################## TRIGGER MAPPINGS ############################################################
        // ############################## TRIGGER MAPPINGS ############################################################

        '.xfTrigger .xfValue': function(n) {
            var parentId = n.id.substring(0,n.id.lastIndexOf("-"));
            connect.connect(n, "onclick", function(){
                fluxProcessor.dispatchEvent(parentId);
            });
        }
    }
});

