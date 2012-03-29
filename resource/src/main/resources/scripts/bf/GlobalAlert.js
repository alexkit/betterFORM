/*
 * Copyright (c) 2012. betterFORM Project - http://www.betterform.de
 * Licensed under the terms of BSD License
 */

define(["dojo/_base/declare","bf/Alert"],
    function(declare, Alert){
        return declare(Alert, {
        handleValid:function(id,action){
            console.warn("COMING SOON GLOBAL ALERTS - bf.GlobalAlert.valid [id:" + id , " action: " + action + "]");
        },

        handleInvalid:function(id,action){
            console.warn("COMING SOON GLOBAL ALERTS - bf.GlobalAlert.invalid [id:" + id , " action: " + action + "]");
        }

    });
});