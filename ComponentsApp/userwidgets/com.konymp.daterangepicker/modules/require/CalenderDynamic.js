/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/

define(function() {

    var konymp = konymp || {};
    konymp.Reusable = konymp.Reusable || {};

    var konyLoggerModule = require('com/konymp/daterangepicker/KonyLogger');
    konymp.logger = new konyLoggerModule("Date Range Picker");
    /*
    class calendar_widget constructor
    month_param 					- This is the month on which the calendar need to be intialized
    year_param	 					- This is the year on which the calendar need to be intialized

    //Method Description

    This constructor creates the required ui Components in the calendar Widget

     */
    konymp.Reusable.calendarWIDGET = function(month_param, year_param, dateClickStatus, numberOfMonths) {
        try {
            konymp.logger.trace("----------------------------- Start calendarWIDGET", konymp.logger.FUNCTION_ENTRY);
            this.month = month_param;
            this.year = year_param;
            this.data = [];
            this.currentFlex = 1;
            this.FLEXCOUNT = numberOfMonths;
            this.calendarROWS = 5;
            this.WeekStartDay = 0;
            this.MonthData = [];
            this.MONTHHEADERCOUNT = 5;
            this.dateClickStatus = dateClickStatus;

            //Initalization of the data  json in the calendar widget
            for (var i = 0; i < this.FLEXCOUNT; i++) {
                this.data[i] = {
                    "MONTH": "",
                    "YEAR": "",
                    "calendarDATA": "",
                    "FLEXINDEX": "",
                    "HOLIDAYS": ""
                };
                this.data[i].FLEXINDEX = i;
            }

            //Initialization of the month data
            for (i = 0, diff = -1; i < this.MONTHHEADERCOUNT; i++, diff++) {
                this.MonthData[i] = {
                    "MONTH": "",
                    "YEAR": "",
                    "BUTTONINDEX": i
                };
            }
            this.DataConstructorIntializate();
            this.MonthDataConstructorIntializate();
            konymp.logger.trace("----------------------------- End calendarWIDGET", konymp.logger.FUNCTION_EXIT);
        } catch (e) {
            konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        }
    };

    /*
    This method is to create the Data in the Month Header of  the calendar
    AcessByInstance:false
     */

    konymp.Reusable.calendarWIDGET.prototype.MonthDataConstructorIntializate = function() {
        try {
            konymp.logger.trace("----------------------------- Start MonthDataConstructorInitializate", konymp.logger.FUNCTION_ENTRY);
            for (var i = 0, diff = -2; i < this.MONTHHEADERCOUNT; i++, diff++) {
                var monthYearKeyPair = this.retriveMonthDetails(this.month, this.year, diff);
                this.MonthData[i].MONTH = monthYearKeyPair.MONTH;
                this.MonthData[i].YEAR = monthYearKeyPair.YEAR;
            }
            konymp.logger.trace("----------------------------- End MonthDataConstructorInitializate", konymp.logger.FUNCTION_EXIT);
        } catch (e) {
            konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        }
    };




    /*
    This method is to create the Data in the label in the calendar cells  of the calendar Month
    AcessByInstance:false
     */

    konymp.Reusable.calendarWIDGET.prototype.DataConstructorIntializate = function() {
        try {
            konymp.logger.trace("----------------------------- Start DataConstructorInitializate", konymp.logger.FUNCTION_ENTRY);
            var middleFlex = parseInt((this.FLEXCOUNT - 1) / 2);

            for (var calendarIndex = 0; calendarIndex < (this.FLEXCOUNT); calendarIndex++) {
                this.calendarDataIntialize(calendarIndex, this.retriveMonthDetails(this.month, this.year, (calendarIndex)));
            }
            konymp.logger.trace("----------------------------- End DataConstructorInitializate", konymp.logger.FUNCTION_EXIT);
        } catch (e) {
            konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        }
    };

    /*
    Method Description: This is the helper method for the DataConstructorIntializate function
    AcessByInstance:false
     */

    konymp.Reusable.calendarWIDGET.prototype.calendarDataIntialize = function(calendarIndex, monthDetailsJson) {
        try {
            konymp.logger.trace("----------------------------- Start calendarDataInitialize", konymp.logger.FUNCTION_ENTRY);
            this.data[calendarIndex].MONTH = monthDetailsJson.MONTH;
            this.data[calendarIndex].YEAR = monthDetailsJson.YEAR;
            this.data[calendarIndex].calendarDATA = this.retrivemonthData(this.data[calendarIndex].MONTH, this.data[calendarIndex].YEAR);
            konymp.logger.trace("----------------------------- End calendarDataInitialize", konymp.logger.FUNCTION_EXIT);
        } catch (e) {
            konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        }
    };


    /*
    Method Description: This method is used to return the widget reference of the calendar
    AcessByInstance:true
     */

    konymp.Reusable.calendarWIDGET.prototype.getcalendar = function() {
        return this.data;
    };

    /*
    Method Description: This is the helper method for the DataConstructorIntializate function and this is used to be retrive the data for the month
    AcessByInstance:false
     */

    konymp.Reusable.calendarWIDGET.prototype.retrivemonthData = function(month, year) {
        try {
            konymp.logger.trace("----------------------------- Setting retrivemonthData", konymp.logger.FUNCTION_ENTRY);
            var d = new Date();
            d.setDate(1);
            d.setMonth(month);
            d.setFullYear(year);
            var emptycellslength = d.getDay() - this.WeekStartDay;
            if (emptycellslength < 0) {
                emptycellslength = 7 - emptycellslength * -1;
            }
            var data = [];
            d.setDate(d.getDate() - emptycellslength);
            for (var i = 0; i <= emptycellslength - 1; i++) {
                data[i] = {
                    "LABEL": {
                        "Day": d.getDate().toFixed(),
                        "Date": d.toDateString(),
                        "isMothDay": false,
                    },
                    "data": {
                        "CellData": "",
                        "TYPE": ""
                    }
                };
                d.setDate(d.getDate() + 1);
            }
            for (i = emptycellslength; i < 42; i++) {
                if (d.getMonth() === month) {
                    data[i] = {
                        "LABEL": {
                            "Day": d.getDate().toFixed(),
                            "Date": d.toDateString(),
                            "isMothDay": true,
                        },
                        "data": {
                            "CellData": "",
                            "TYPE": ""
                        }
                    };

                } else {
                    data[i] = {
                        "LABEL": {
                            "Day": d.getDate().toFixed(),
                            "Date": d.toDateString(),
                            "isMothDay": false,
                        },
                        "data": {
                            "CellData": "",
                            "TYPE": ""
                        }
                    };
                }
                d.setDate(d.getDate() + 1);
            }
            konymp.logger.trace("----------------------------- End retrivemonthData", konymp.logger.FUNCTION_EXIT);
            return data;
        } catch (e) {
            konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        }
    };


    //helper method functions for the calendar Widget

    konymp.Reusable.calendarWIDGET.prototype.retriveMonthDetails = function(month, year, diff) {
        try {
            konymp.logger.trace("----------------------------- Start retriveMonthDetails", konymp.logger.FUNCTION_ENTRY);
            var d = new Date();
            d.setDate(1);
            d.setMonth(month);
            d.setFullYear(year);
            d.setMonth(d.getMonth() + diff);
			konymp.logger.trace("----------------------------- End retriveMonthDetails", konymp.logger.FUNCTION_EXIT);
            return {
                "MONTH": d.getMonth(),
                "YEAR": d.getFullYear()
            };
        } catch (e) {
            konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        }
    };

    // helper method to retrive the name of teh Day
    konymp.Reusable.calendarWIDGET.prototype.retriveDayName = function(day_param) {
        try {
            konymp.logger.trace("----------------------------- Start retriveDayName", konymp.logger.FUNCTION_ENTRY);
            if (day_param < 7) {
                switch (day_param) {
                    case 0:
                        return "Sunday";
                    case 1:
                        return "Monday";
                    case 2:
                        return "Tuesday";
                    case 3:
                        return "Wednesday";
                    case 4:
                        return "Thursday";
                    case 5:
                        return "Friday";
                    case 6:
                        return "Saturday";
                    default:
                        throw "some wrong input in the retrive Day Name function of calendar helper";
                }
            } else {

                throw "something went wrong in the retriving Day Name";
            }
            konymp.logger.trace("----------------------------- End retriveDayName", konymp.logger.FUNCTION_EXIT);
        } catch (e) {
            konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        }
    };

    konymp.Reusable.calendarWIDGET.prototype.retriveMonthName = function(month_int) {
        try {
            konymp.logger.trace("----------------------------- Start retriveMonthName", konymp.logger.FUNCTION_ENTRY);
            switch (month_int) {
                case 0:
                    return "January";
                case 1:
                    return "February";
                case 2:
                    return "March";
                case 3:
                    return "April";
                case 4:
                    return "May";
                case 5:
                    return "June";
                case 6:
                    return "July";
                case 7:
                    return "August";
                case 8:
                    return "September";
                case 9:
                    return "October";
                case 10:
                    return "November";
                case 11:
                    return "December";

                default:
                    throw "Wrong parameter passing in the function retrive month Name";

            }
            konymp.logger.trace("----------------------------- End retriveMonthName", konymp.logger.FUNCTION_EXIT);
        } catch (e) {
            konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        }
    };

    return konymp.Reusable.calendarWIDGET;

});