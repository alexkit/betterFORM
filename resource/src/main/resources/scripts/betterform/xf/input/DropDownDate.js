define("betterform/xf/input/DropDownDate", ["dojo", "dijit", "text!betterform/xf/templates/DropDownDate.html", "i18n!betterform/xf/input/nls/DropDownDate"], function(dojo, dijit) {/*
 * Copyright (c) 2012. betterFORM Project - http://www.betterform.de
 * Licensed under the terms of BSD License
 */

dojo.provide("betterform.xf.input.DropDownDate");

dojo.declare(
        "betterform.xf.input.DropDownDate",
        [dijit._Widget, dijit._Templated],
{
    templateString: dojo.cache("betterform", "xf/templates/DropDownDate.html"),
    widgetsInTemplate:true,
    minimumYear: 1900,
    maximumYear: 2100,
    years:'',
    months:'',
    days:'',
    appearance:null,
    monthsArray:null,

    postMixInProperties:function() {
        this._msg = dojo.i18n.getLocalization("betterform.xf.input", "DropDownDate", this.lang);
        this.monthsArray = new Array(this._msg["january"], this._msg["february"], this._msg["march"], this._msg["april"],
                                     this._msg["may"], this._msg["june"], this._msg["july"], this._msg["august"],
                                     this._msg["september"], this._msg["october"], this._msg["november"],
                                     this._msg["december"]);
        var rangeStart;
        var rangeEnd;
        var now = new Date().getFullYear();
        if (this.appearance.indexOf("=") != -1) {
            rangeStart = this.appearance.substring(this.appearance.indexOf("=") + 1);

            if (rangeStart.indexOf(":") != -1) {
                rangeEnd = rangeStart.substring(rangeStart.indexOf(":") + 1);
                rangeStart = rangeStart.substring(0, rangeStart.indexOf(":"));
            }

            if (rangeStart.indexOf("-") != -1) {
                rangeStart = now - parseInt(rangeStart.substring(rangeStart.indexOf("-") + 1), "10");
            } else if (rangeStart.indexOf("+") != -1) {
                rangeStart = now + parseInt(rangeStart.substring(rangeStart.indexOf("+") + 1), "10");
            }

            if (rangeEnd != undefined) {
                if (rangeEnd.indexOf("+") != -1) {
                    rangeEnd = now + parseInt(rangeEnd.substring(rangeEnd.indexOf("+") + 1), "10");
                } else if (rangeEnd.indexOf("-") != -1) {
                    rangeEnd = now - parseInt(rangeEnd.substring(rangeEnd.indexOf("-") + 1), "10");
                }
            } else {
                rangeEnd = now;
            }

        } else {
            rangeEnd = now;
            rangeStart = rangeEnd - 10;
        }

        rangeStart = parseInt(rangeStart, "10");
        rangeEnd = parseInt(rangeEnd, "10");

        // console.debug("DropDownDate: Range Start: ", rangeStart, " End: ", rangeEnd);
        this.templateString = "<div class='xfDropDownDateControl'><input class='xfValue' type='hidden' dojoAttachPoint='valueNode' value=''/><" +
            "span class='xfDropDownDate'><select size='1' dojoType='dijit.form.ComboBox' dojoAttachPoint='daysFacet' class='xfDropDownDateDays'><option></option><" +
            "option>01</option><option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option><" +
            "option>09</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><" +
            "option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><" +
            "option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option></select><" +
            "select size='1' dojoType='dijit.form.ComboBox' dojoAttachPoint='monthsFacet' class='xfDropDownDateMonths'><option value=''></option><" +
            "option value='01'>"+this._msg["january"]+"</option><option value='02'>"+this._msg["february"]+"</option><option value='03'>"+this._msg["march"]+"<" +
            "/option><option value='04'>"+this._msg["april"]+"</option><option value='05'>"+this._msg["may"]+"</option><option value='06'>"+this._msg["june"]+"<" +
            "/option><option value='07'>"+this._msg["july"]+"</option><option value='08'>"+this._msg["august"]+"</option><option value='09'>"+this._msg["september"]+"<" +
            "/option><option value='10'>"+this._msg["october"]+"</option><option value='11'>"+this._msg["november"]+"</option><option value='12'>"+this._msg["december"]+"<" +
            "/option></select><select size='1' dojoType='dijit.form.ComboBox' dojoAttachPoint='yearsFacet' class='xfDropDownDateYears'>";

        var end = "</select></span></div>";


        this.templateString = this.templateString + "<option></option>";
        if (rangeStart > rangeEnd) {
            for (var i = rangeStart; i >= rangeEnd; i--) {
                this.templateString = this.templateString + "<option>" + i + "</option>";
            }
        } else {
            for (var z = rangeStart; z <= rangeEnd; z++) {
                this.templateString = this.templateString + "<option>" + z + "</option>";
            }
        }
        this.templateString = this.templateString + end;

        this.minimumYear = rangeStart;
        this.maximumYear = rangeEnd;

        if (rangeStart >= rangeEnd) {
            this.minimumYear = rangeEnd;
            this.maximumYear = rangeStart;
        }

        // console.debug("DropDownData.postMixInProperties before");
        this.inherited(arguments);
        // console.debug("DropDownData.postMixInProperties after");
        this.incremental = false;
    },

    postCreate:function() {
        console.debug("DropDownDate.postCreate this.domNode:", this.valueNode, " this.value: ", this.value);
        this.daysDijit  = dijit.byId(this.daysFacet.id);
        this.monthDijit = dijit.byId(this.monthsFacet.id);
        this.yearDijit  = dijit.byId(this.yearsFacet.id);

        this.inherited(arguments);

        dojo.attr(this.valueNode, "value", this.value);
        this.applyValues(this.value);
        dojo.connect(this.daysDijit, "onChange", this, "onDaysChanged");
        dojo.connect(this.monthDijit, "onChange", this, "onMonthsChanged");
        dojo.connect(this.yearDijit, "onChange", this, "onYearsChanged");
    },

    applyValues:function(value) {
         console.debug("DropDownDate.applyValues value:",value);
        if (value != undefined) {

            var splittedValue = value.split("-");
            if (splittedValue.length != 3) {
                console.warn("DropDownDate.applyValues: value: ", value ," can't be applied");
                return;
            }
            // console.debug("DropDownDate.postCreate this.timeContainer:", splittedValue);

            this.years = splittedValue[0];
            this.months = splittedValue[1];
            this.days = splittedValue[2];

            this.daysDijit.set('value', this.days);
            this.monthDijit.set('value', this.monthsArray[parseInt(this.months, "10") - 1]);
            //this.monthDijit.set('displayValue', this.monthsArray[parseInt(months)-1]);
            this.yearDijit.set('value', this.years);
        }
    },

    onDaysChanged:function(evt) {
        // console.debug("DropDownDate.onDaysChanged.");
        var selectedItem = this.daysDijit.get("item");
        if (selectedItem != undefined && selectedItem.value != "") {
            this.days = selectedItem.value;
        } else {
            this.days = this.daysDijit.get("value");
        }
    },

    onMonthsChanged:function(evt) {
        // console.debug("DropDownDate.onMonthsChanged.");
        var selectedItem = this.monthDijit.get("item");
        var value;
        if (selectedItem != undefined) {
            // console.debug("DropDownDate.onMonthsChanged() selectedItem defined: |", selectedItem.value, "|");
            value = parseInt(selectedItem.value, "10");
        } else {
            var month = this.monthDijit.get("value");
            if (isNaN(month)) {
                value = parseInt(dojo.indexOf(this.monthsArray,month) + 1, "10");
            } else {
                value = parseInt(month, "10");
            }
        }

        // console.debug("DropDownDate.onMonthsChanged() current month value:", value);
        if (value < 10) {
            // console.debug("DropDownDate.onMonthsChanged() adding leading zero to month.");
            value = "0" + value;
            // console.debug("DropDownDate.onMonthsChanged() modified month value:", value);
        }

        this.months = value;
    },

    onYearsChanged:function(evt) {
        // console.debug("DropDownDate.onYearsChanged oldYear: " , this.years);
        var selectedItem = this.yearDijit.get('item');
        var year;

        if (selectedItem != undefined && selectedItem.value != "") {
            year = selectedItem.value;
        } else {
            // console.debug("DropDownDate.onYearsChanged this.yearDijit.get('value'): " , this.yearDijit.get("value"));
            year = this.yearDijit.get("value");
        }

        // TODO: LW: Implement invalid state for range, problem is that the value is not invalid for the processor
        // TODO: LW: workaround: defined a constraint according to the bf:appearance=XYZ value
/*
        if (year > this.maximumYear) {
            this.years = this.maximumYear;
            this.yearDijit.set("displayedValue",this.years);
        } else if (year < this.minimumYear) {
            this.years = this.minimumYear;
            this.yearDijit.set("displayedValue",this.years);
        } else {
            //In range!
            this.years = year;
        }
*/
        if (year < this.minimumYear || year > this.maximumYear){
            console.warn("DropDownDate.onYearsChanged: selected year is invalid, " + year + " is not >= " + this.minimumYear + " and <= " + this.maximumYear);
        }
        this.years = year;

        // console.debug("DropDownDate.onYearsChanged newYear: " , this.years);
    },

    _onFocus:function() {
        // console.debug("DropDownDate._onFocus");
        this.inherited(arguments);
        // this.handleOnFocus();
    },

    _onBlur:function() {
        // console.debug("DropDownDate._onBlur this.value:",this.value);
        this.inherited(arguments);
        this.onChange(this.value);
    },

    // TODO: Lars: verify if commented functions can be removed
/*
    _handleSetControlValue:function(value) {
        console.debug("DropDownDate._handleSetControlValue value",value);
        this.applyValues(value);
    },
*/
    getControlValue:function() {
        this.value = this.years + "-" + this.months + "-" + this.days;
        // console.debug("betterform.ui.input.DropDownDate.getControlValue currentDate: ", this.value);
        dojo.attr(this.valueNode, "value", this.value);
        return this.value;
    },


    set:function(attrName, value){
        console.debug("DropDownDate.set: attrName: "+ attrName+ "  value",value);
        if(attrName == "value"){
            this.applyValues(value);
        }else if(attrName == "readOnly"){
            this.daysDijit.set("readOnly", value);
            this.monthDijit.set("readOnly", value);
            this.yearDijit.set("readOnly", value);
        }
    },

    get:function(attrName) {
        // console.debug("DropDownDate.get: attrName",attrName);
        if(attrName == "value"){
            return this.getControlValue();
        }
    }
});
});