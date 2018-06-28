define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this._currentSelectedTime = "00:00 AM";
          	_timePickerObject = null;
		},
		initGettersSetters: function() {
		},
      	addTimePicker:function(eventObject){
          	try{
              	var myTimePicker = null;
              	_jsContext = this;
              	//#ifdef android
          		var TimePicker = java.import("android.widget.TimePicker");
          		var konyPackage = java.import("com.konylabs.android.KonyMain");
          		myTimePicker = new TimePicker(konyPackage.getActContext());  
              	myTimePicker.setIs24HourView(true);
                
              	var MyClass = java.newClass("MyClass", "com.konymp.TimePickerListeners",[],{
                  //@override
                  onTimeChanged:function(timePickerView,newHour,newMinute){
                    	if(_jsContext.onTimeSelected!==null && _jsContext.onTimeSelected!==undefined)
                        {
                          _jsContext.onTimeSelected(newHour,newMinute);
                        }
                  }
                });
              	var listenerObj = java.newInstance("MyClass");              
              	myTimePicker.setOnTimeChangedListener(listenerObj);
              
              
// 				var jsTimePickerListenerObject = new com.konymp.jsTimePickerListener();
// 				jsTimePickerListenerObject.setOnTimeChangeCallback(function(picker,hour,minute){alert("changed!!!!");});
               	//myTimePicker.setOnTimeChangedListener(jsTimePickerListenerObject);
              	eventObject.addView(myTimePicker);
      			//#endif
              	//#ifdef iphone
              	var UIDatePicker = objc.import("UIDatePicker");              	
                var deviceWidth = kony.os.deviceInfo().screenWidth;
                var deviceHeight = kony.os.deviceInfo().screenHeight;
              	kony.print("device width, height :"+deviceWidth+","+deviceHeight);
                myTimePicker = UIDatePicker.alloc().initWithFrame({
                        'x': 0,
                        'y': 0,
                        "width": deviceWidth,
                        "height": deviceHeight
                    });
              		myTimePicker.datePickerMode = UIDatePickerModeTime;

              	   var MyClass = objc.newClass("MyClass","NSObject",null,{
                      dateChanged:function(sender){
                    	    if(_jsContext.onTimeSelected!==null && _jsContext.onTimeSelected!==undefined)
                            {
                              	var NSDateFormatter = objc.import("NSDateFormatter");
           						var dateFormatterObj = NSDateFormatter.alloc().jsinit();
           						dateFormatterObj.dateFormat="hh:mm a";
           						currentTime = dateFormatterObj.stringFromDate(_timePickerObject.date);
                              	var timeA = currentTime.split(" ");
                              	var newHourMinutes=timeA[0].split(":");
                              	_jsContext.onTimeSelected(newHourMinutes[0],newHourMinutes[1]);
                            }
                    	}
                    });
					var classInstance = MyClass.alloc().jsinit();
              		myTimePicker.addTargetActionForControlEvents(classInstance,"dateChanged",UIControlEventValueChanged);
      
              
              		eventObject.addSubview(myTimePicker);
              	//#endif
              	_timePickerObject = myTimePicker;
            }catch(exc){
              alert("exception :"+JSON.stringify(exc));
            }
        },
      	jsiosTimeChangedCallback:function(eventObject){
          alert("time changed");
        },
      	setTime:function(timeString){
          try{
          	var timeToSet = timeString;
            //#ifdef android
                var hourMinute = timeToSet.split(":");
            	var hourToSet = Number(hourMinute[0]);
            	var minToSet = Number(hourMinute[1]);
            	kony.runOnMainThread(function(hour,minute){
                  		_timePickerObject.setCurrentHour(hour);
                  		_timePickerObject.setCurrentMinute(minute);
                  },[hourToSet,minToSet]);
            //#endif
            //#ifdef iphone
                var NSDateFormatter = objc.import("NSDateFormatter");
                var dateFormatterObj = NSDateFormatter.alloc().jsinit();
                dateFormatterObj.dateFormat="hh:mm a";
                var dToSet = dateFormatterObj.dateFromString(timeToSet);
                _timePickerObject.setDateAnimated(dToSet,true);
            //#endif
          }catch(exc){
            alert("exception while setting time.."+JSON.stringify(exc));
          }
        },
      	getTime:function(){
		var currentTime = null;      
          //#ifdef android
          currentTime=_timePickerObject.getHour()+":"+_timePickerObject.getMinute();
          //#endif

          //#ifdef iphone
           var NSDateFormatter = objc.import("NSDateFormatter");
           var dateFormatterObj = NSDateFormatter.alloc().jsinit();
           dateFormatterObj.dateFormat="hh:mm a";
           currentTime = dateFormatterObj.stringFromDate(_timePickerObject.date);
          //#endif
          
          return currentTime;
        }
	};
});