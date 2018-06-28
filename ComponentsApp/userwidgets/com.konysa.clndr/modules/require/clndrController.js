define(function() {
  var konysa = konysa || {};
  var konyLoggerModule = require('com/konysa/clndr/KonyLogger');
  konysa.logger = new konyLoggerModule("custom calendar");
  constants.DEFAULT_DATE_PATTERN = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._calendarStartMonth = 1;
      this._calendarStartDay = 15;
      this._calendarStartYear = 1990;
      this._calendarEndMonth = 1;
      this._calendarEndDay = 15;
      this._calendarEndYear = 2030;
      this._lastSelectedEvent = null;
      this._monthMap={
        0:"January",
        1:"February",
        2:"March",
        3:"April",
        4:"May",
        5:"June",
        6:"July",
        7:"August",
        8:"September",
        9:"October",
        10:"November",
        11:"December"
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "calendarStartDate", function (val) {
        konysa.logger.trace("----------------------------- Setting calendarStartDate", konysa.logger.FUNCTION_ENTRY);
        try {
          if (constants.DEFAULT_DATE_PATTERN.test(val)) {
            this._calendarStartMonth = Number(val.split("/")[0]) - 1;
            this._calendarStartDay = Number(val.split("/")[1]);
            this._calendarStartYear = Number(val.split("/")[2]);
          } else {
            throw {
              "Error" : "InvalidStartDate",
              "message" : "Invalid Calendar Start Date Entered"
            };
          }
        } catch (exception) {
          konysa.logger.error(JSON.stringify(exception), konysa.logger.EXCEPTION);
          if (exception.Error === "InvalidStartDate") {
            throw (exception);
          }

        }
        konysa.logger.trace("----------------------------- End calendarStartDate", konysa.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "calendarStartDate", function () {
        konysa.logger.trace("----------------------------- Getting calendarStartDate", konysa.logger.FUNCTION_ENTRY);
        return (this._calendarStartMonth + "/" + this._calendarStartDay + "/" + this._calendarStartYear);
      });
      defineSetter(this, "calendarEndDate", function (val) {
        konysa.logger.trace("----------------------------- Setting calendarEndDate", konysa.logger.FUNCTION_ENTRY);
        try {
          if (constants.DEFAULT_DATE_PATTERN.test(val)) {
            this._calendarEndMonth = Number(val.split("/")[0]) - 1;
            this._calendarEndDay = Number(val.split("/")[1]);
            this._calendarEndYear = Number(val.split("/")[2]);
            if ((this._calendarEndYear < this._calendarStartYear) || ((this._calendarEndYear == this._calendarStartYear) && (this._calendarStartMonth > this._calendarEndMonth)) ||
                (this._calendarEndYear == this._calendarStartYear) && (this._calendarStartMonth == this._calendarEndMonth) && (this._calendarStartDay > this._calendarEndDay)) {
              throw {
                "Error" : "InvalidStartDate",
                "message" : "Calendar Start Date should not be greater than End Date"
              };
            }
          } else {
            throw {
              "Error" : "InvalidEndDate",
              "message" : "Invalid Calendar End Date Entered"
            };
          }
        } catch (exception) {
          konysa.logger.error(JSON.stringify(exception), konysa.logger.EXCEPTION);
          if (exception.Error === "InvalidStartDate" || exception.Error === "InvalidEndDate") {
            throw (exception);
          }

        }
        konysa.logger.trace("----------------------------- End calendarEndDate", konysa.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "calendarEndDate", function () {
        konysa.logger.trace("----------------------------- Getting calendarStartDate", konysa.logger.FUNCTION_ENTRY);
        return (this._calendarEndMonth + "/" + this._calendarEndDay + "/" + this._calendarEndYear);
      });

    },
    calendarPostShow:function(){
      debugger;
      var todayDate=new Date();
      var todayDay=todayDate.getDate();
      var todayMonth=1+todayDate.getMonth();
      var toDayYear=todayDate.getFullYear();
      var currentYear=2018;
      var todayDateString=""+todayDay+todayMonth+toDayYear;
      var calendarData=this.getCalendar(currentYear);
      var segObj={};
      var segList=[];
      var secObj={};
      var month;
      var segEachRowItem=[];
      var segRowItems=[];
      var segListItem=[];
      var currentDateString;
      var eventForDay;
      this.view.segTest.removeAll();
      this.view.forceLayout();
      segObj={};
      for(var i=0;i<calendarData.length;i++){
        //Parse the month data.
        month=calendarData[i];
        secObj={};
        secObj["lblMonthText"]=month["month_text"];
        var id;
        segEachRowItem=[];
        segObj={};
        var count=1;
        var iteration=month["last_date"]+month["first_day"];
        for(var j=0;j<iteration;j++){
          //parse the date.
          if(j<month["first_day"]){
            segObj["lblText"+j]="";
            continue;
          }
          id=j%7;
          if(j!==0 && j%7===0){
            segEachRowItem.push(segObj);
            segObj={};
          }
          //segObj["lblText"+id]=""+(count++);
          currentDateString=""+count+(i+1)+currentYear;
          if(todayDateString==currentDateString){
            debugger;
            //segObj["flxItem"+id]={"skin":"sknFlxToday"};
            segObj["lblText"+id]={
              "skin":"sknLblToday",
              "info":{"day":count,"month":(i+1),"year":currentYear},
              "text":""+(count++)
            };
          }else{
            segObj["lblText"+id]={
              "info":{"day":count,"month":(i+1),"year":currentYear},
              "text":""+(count++)
            }
          }
          eventForDay=this.getEventForTheDate(count,1+i,currentYear);
          var eventsCount=eventForDay.length;
          if(eventsCount>0){           
            for(var k=0;k<eventsCount;k++){
              //break;
              segObj["lblTitle"+id+k]={"text":eventForDay[k].title};
              segObj["lblDesc"+id+k]={"text":eventForDay[k].desc};
              segObj["lblNotification"+id+k]={"text":" "};
            }
            segObj["flxItem"+id]={"info":{"isEventAvailable":true}};
          }else{
            segObj["flxItem"+id]={"info":{"isEventAvailable":false}}
          }

        }
        segEachRowItem.push(segObj);
        segRowItems=[];
        segRowItems.push(secObj);
        segRowItems.push(segEachRowItem);
        segListItem.push(segRowItems);
      }
      this.view.segTest.setData(segListItem);
      //this.view.segTest.selectedIndices=[3,0];
      var currentDate=new Date();
      this.view.segTest.selectedRowIndex=[currentDate.getMonth(),-1];
      this.view.forceLayout();
      //this.view.segTest.info={"msg":"hello world!"};
    },
    getEventForTheDate(date,month,year){
      var event=[[],
                 [{
                   "title":"Kony Developer Bootcamp - Abu Dhabi, UAE",
                   "desc":"This five-day Bootcamp is designed for developers and provides participants with the knowledge and skills that are required to design & develop engaging cross-platform mobile applications using Kony Visualizer and Kony Fabric."
                 }
                 ],
                 [{
                   "title":"Kony Webinar: Unpacking V8 SP2",
                   "desc":"Kony AppPlatform V8 Service Pack 2 introduces a new set of features & enhancements on Kony Visualizer and Kony Fabric"
                 },
                  {
                    "title":"Kony Developer Bootcamp - Amman, Jordan",
                    "desc":"This five-day Bootcamp is designed for developers and provides participants with the knowledge and skills that are required to design & develop engaging cross-platform mobile applications using Kony Visualizer and Kony Fabric"
                  }
                 ],
                 [{
                   "title":"Kony Base Camp Tech Talk: FFI vs NFI",
                   "desc":"In this webinar, expert Abhijeet Anand is going to discuss native API/ 3rd party SDK integrations with Kony Project."
                 },
                  {
                    "title":"Kony Digital Banking Roadmap Webinar - Open Banking",
                    "desc":"PSD2 is finally here and 2018 is turning out to be a big year for the banking industry as financial institutions open their APIs and make them available to third-party providers."
                  },
                  {
                    "title":"Kony Knowledge Week",
                    "desc":"Kony Knowledge Week is a quarterly technical article drive whereby Kony experts, both internally and externally, are invited to write technical articles for publication on Kony Base Camp."
                  }
                 ]
                ];
      var rand=Math.random()*3;
      return event[Math.round(rand)];
    },
    getCalendar:function(selectedYear){
      if(selectedYear<1900||selectedYear>2050){
        alert("Not a valid year!");
        return null;
      }
      var year_data=[];
      var month={};
      for(var i=0;i<12;i++){
        month=this.getMonth(i, selectedYear);
        year_data.push(month);
      }
      return year_data;
    },
    getMonth:function(monthIndex,year){
      var month=this._monthMap[monthIndex];
      var monthData={};
      monthData["month_text"]=month;
      var firstDay=new Date(year,monthIndex,1).getDay();
      var lastDay=new Date(year,monthIndex+1,0).getDay();
      var lastDate=(new Date((new Date(year, monthIndex+1,1))-1)).getDate();
      monthData["first_day"]=firstDay;
      monthData["last_day"]=lastDay;
      monthData["last_date"]=lastDate;
      return monthData; 
    },
    /*toggleEvent:function(widget,selectedEvent){
      //kony.print("param: "+param);
      if(this._lastSelectedEvent!==null){
        if(this._lastSelectedEvent.section_index==selectedEvent.section_index && this._lastSelectedEvent.row_index==selectedEvent.row_index){
          //same date has been selected so hide the event.
          this.hideEvent(this._lastSelectedEvent);
          this._lastSelectedEvent=null;
        }else{
          //different date is selected so hide the last event and show the current event.
          this.hideEvent(this._lastSelectedEvent);
          this.displayEvent(selectedEvent);
          this._lastSelectedEvent=selectedEvent;
        }

      }else{
        //No date clicked before so only display the current event.
        this.displayEvent(selectedEvent);
        this._lastSelectedEvent=selectedEvent;
      }
    },*/
    /*displayEvent:function(selectedEvent){
      var rowDate=selectedEvent["row_data"];
      rowDate["flxInfo"]={"height":"50dp","isVisible":true};
      var sectionIndex=selectedEvent["section_index"];
      var rowIndex=selectedEvent["row_index"];
      this.view.segTest.removeAt(rowIndex, sectionIndex);
      this.view.segTest.addDataAt(rowDate, rowIndex, sectionIndex);
      this.view.forceLayout();
    },*/
    /*hideEvent:function(selectedEvent){
      var rowDate=selectedEvent["row_data"];
      rowDate["flxInfo"]={"height":"50dp","isVisible":false};
      var sectionIndex=selectedEvent["section_index"];
      var rowIndex=selectedEvent["row_index"];
      this.view.segTest.removeAt(rowIndex, sectionIndex);
      this.view.segTest.addDataAt(rowDate, rowIndex, sectionIndex);
      this.view.forceLayout();
    },
    onSegMentRowClick:function(){
      alert("from here: "+this.view.segTest.selectedRowIndex);
    }*/
  };
});