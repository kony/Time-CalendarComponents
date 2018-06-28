/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/

define(function() {
  	var konymp = konymp || {};
  	var CalendarWidgetModule = require("com/konymp/daterangepicker/CalenderDynamic");
  	var KonyLoggerModule = require("com/konymp/daterangepicker/KonyLogger");
  	konymp.calendar = konymp.calendar || {};
  	konymp.logger = (new KonyLoggerModule("Date Range Picker")) || function(){};
  	var currDate = new Date();
  	
  	return {
      	/**
		 * @constructor constructor
		 * @param basicConfig
		 * @param layoutConfig
		 * @param pspConfig
		*/
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			try{
				konymp.logger.info("Entered constructor of component", konymp.logger.FUNCTION_ENTRY);
				this._isCheckInClick=true;
				this._checkOutDate={};
				this._checkInDate={};
				this._prevCheckInId = "";
				this._prevCheckInSection = "";
				this._prevCheckOutId = "";
				this._prevCheckOutSection = "";
				this._centerYSet = "";
				this._prevKey = "";
				this._currentKey = "";
				this.createNewCalendar = true;
                this._defaultFromDate = "";
              	this._defaultToDate = "";
              	this.getFullDay = {"Sun": "Sunday","Mon":  "Monday","Tue": "Tuesday","Wed": "Wednesday","Thu": "Thursday","Fri": "Friday","Sat": "Saturday"};
              	this._enableSundays = true;
              	this._enableMondays = true;
              	this._enableTuesdays = true;
              	this._enableWednesdays = true;
              	this._enableThursdays = true;
              	this._enableFridays = true;
              	this._enableSaturdays = true;
              	this._disabledDates = [];
				this._screenHeight = kony.os.deviceInfo().screenHeight;
				this._deviceHeightInPx = kony.os.deviceInfo().deviceHeight;
				this._deviceOS = kony.os.deviceInfo().name;
              	this.view.doLayout = this.setFrameValues;
              	this.seed = Math.random();
              	this._frameHeight = "0";
              	this._isLastRow = false;
				konymp.logger.info("Exiting constructor of component", konymp.logger.FUNCTION_EXIT);
			}
          	catch(e){
            	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
          	}
        },
      	
      	/**
		 * @function setFrameValues
		 * @scope private
		 * @description this function is invoked to get the top and height of component using frame values.
		*/
      	setFrameValues : function(){
          	try{
          		if(this.view.height !== "90%" && this._frameHeight.toString() === "0"){
        			this._frameTop = parseFloat(this.view.frame.y);
            		this._frameHeight = parseFloat(this.view.frame.height);
            	}
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
            }
        },
      
      	/**
		 * @initGettersSetters Logic for getters/setters of custom properties
		*/
		initGettersSetters: function() {
			defineSetter(this, "calendarStartDate", function(val) {
            	konymp.logger.trace("----------------------------- Setting calendarStartDate", konymp.logger.FUNCTION_ENTRY);
              	try{
                	var regexDate = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
              		if(regexDate.test(val)){
                      	this._calendarStartMonth =  Number(val.split("/")[0]) - 1;
                		this._calendarStartDay = Number(val.split("/")[1]);
                	  	this._calendarStartYear = Number(val.split("/")[2]);
                      	if(this._calendarEndMonth !== undefined){
                          	if((this._calendarEndYear < this._calendarStartYear) || ((this._calendarEndYear === this._calendarStartYear) && (this._calendarStartMonth > this._calendarEndMonth)) ||
                    		(this._calendarEndYear === this._calendarStartYear) && (this._calendarStartMonth === this._calendarEndMonth) && (this._calendarStartDay > this._calendarEndDay)){
                              	throw {
                              		type : "Explicit",
                              		message:"Calendar Start Date should not be greater than End Date"
                            	};
                			}
                        }
                	}
                  	else{
                      	throw {
                          	type : "Explicit", 
                          	message : "Invalid Calendar Start Date Entered"
                        };
                    }
                }
				catch(e){
                  	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
                  	if(e.type === "Explicit"){
                  		throw e;
                    }
                }
                konymp.logger.trace("----------------------------- End calendarStartDate", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "calendarStartDate", function() {
               	konymp.logger.trace("----------------------------- Getting calendarStartDate", konymp.logger.FUNCTION_ENTRY);
               	return (this._calendarStartMonth+"/"+this._calendarStartDay+"/"+this._calendarStartYear);
            });
            defineSetter(this, "calendarEndDate", function(val) {
            	konymp.logger.trace("----------------------------- Setting calendarEndDate", konymp.logger.FUNCTION_ENTRY);
              	try{
                	var regexDate = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
              		if(regexDate.test(val)){
                	  	this._calendarEndMonth =  Number(val.split("/")[0]) - 1;
                		this._calendarEndDay = Number(val.split("/")[1]);
                	  	this._calendarEndYear = Number(val.split("/")[2]);
                      	if((this._calendarEndYear < this._calendarStartYear) || ((this._calendarEndYear === this._calendarStartYear) && (this._calendarStartMonth > this._calendarEndMonth)) ||
                    		(this._calendarEndYear === this._calendarStartYear) && (this._calendarStartMonth === this._calendarEndMonth) && (this._calendarStartDay > this._calendarEndDay)){
                			throw {
                              	type : "Explicit",
                              	message:"Calendar Start Date should not be greater than End Date"
                            };
                		}
                	}
                  else{
                      	throw {
                          	type : "Explicit",
                          	message : "Invalid Calendar End Date Entered"
                        };
                    }
                }
				catch(e){
                  	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
                  	if(e.type === "Explicit"){
                      	throw e;
                    }
                }
                konymp.logger.trace("----------------------------- End calendarEndDate", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "calendarEndDate", function() {
               	konymp.logger.trace("----------------------------- Getting calendarStartDate", konymp.logger.FUNCTION_ENTRY);
               	return (this._calendarEndMonth+"/"+this._calendarEndDay+"/"+this._calendarEndYear);
            });
		},
		
      	/**
		 * @function onClickFlex
		 * @scope private
		 * @description this function is invoked on click of a calendar date cell.
		*/
		onClickFlex : function (){
			try{
				konymp.logger.info("Entered onClickFlex function of component", konymp.logger.FUNCTION_ENTRY);
				var clickedId = Number(arguments[0].id.replace("flx", ""));
				var selectedSection = arguments[1].sectionIndex;
				this.onClickFunction(clickedId, selectedSection);
				konymp.logger.info("Exiting onClickFlex function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
      
      	/**
		 * @function onClickFunction
		 * @scope private
         * @param clickedId {string}
         * @param selectedSection {string}
		 * @description this function is invoked on click of a calendar date.
		*/
		onClickFunction : function(clickedId, selectedSection){
			try{
				konymp.logger.info("Entered onClickFunction function of component", konymp.logger.FUNCTION_ENTRY);
				konymp.logger.info("Parameters clickedId is: "+clickedId+" selectedSection is: "+selectedSection);
              	kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {  
					shouldShowLabelInBottom: "true", separatorHeight: 200, 
					progressIndicatorType : constants.PROGRESS_INDICATOR_TYPE_SMALL, 
					progressIndicatorColor : "Gray"}
				);
              	this.unHighlightToday();
              	if(this._isCheckInClick){
					this._isCheckInClick = false;
					if(this._checkInDate.id !== undefined){
						if(this._checkOutDate.id !== undefined){
							if(selectedSection <= this._checkOutDate.selectedSection){
								if((clickedId > this._checkOutDate.id) && (this._checkOutDate.selectedSection === selectedSection)){
									this.removeSelectedRange();
									this._checkOutDate = {};
									this.setSelectedLabelCheckOut(false, true);
								}
								else{
									this.removeImagesOutOfRange(selectedSection, clickedId);
								}
							}
							else if (selectedSection > this._checkOutDate.selectedSection){
								this.removeSelectedRange();
								this._checkOutDate = {};
								this.setSelectedLabelCheckOut(false, true);
							}
						}
						else{
							this.removeCheckInImage();
						}
					}
                  	this.view.imgDateSelected.left = "75%";
                  	this.view.imgDateSelected.parent.forceLayout();
					this._checkInDate.selectedSection = selectedSection;
					this._checkInDate.id = clickedId;
					this.setCheckInImage();
					this.setSelectedRange();
					this.setSelectedLabelCheckIn(true, false);
					this.view.forceLayout();
				}
				else{
					if(this._checkOutDate.id !== undefined){
						if(selectedSection < this._checkInDate.selectedSection){
							this.removeRange(clickedId, selectedSection);
						}
						else if((clickedId < this._checkInDate.id) && (selectedSection === this._checkInDate.selectedSection)){
							this.removeRange(clickedId, selectedSection);
						}
						else{
							if((clickedId < this._checkOutDate.id) && (selectedSection === this._checkOutDate.selectedSection)){
								this.removeImagesOutOfRangeForCheckOut(selectedSection, clickedId);
							}
							else if(selectedSection < this._checkOutDate.selectedSection){
								this.removeImagesOutOfRangeForCheckOut(selectedSection, clickedId);
							}
							this._checkOutDate.id = clickedId;
							this._checkOutDate.selectedSection = selectedSection;
							this.setSelectedLabelCheckOut(true,false);
						}
					}
					else{
						if(selectedSection < this._checkInDate.selectedSection){
							this.removeCheckInImage();
							this._checkInDate.selectedSection = selectedSection;
							this._checkInDate.id = clickedId;
							this.setCheckInImage();
						}
						else if(clickedId < this._checkInDate.id && selectedSection === this._checkInDate.selectedSection){
							this.removeCheckInImage();
							this._checkInDate.selectedSection = selectedSection;
							this._checkInDate.id = clickedId;
							this.setCheckInImage();
						}
						else{
							this._checkOutDate.id = clickedId;
							this._checkOutDate.selectedSection = selectedSection;
							this.setSelectedLabelCheckOut(true, false);
						}
					}
					this.setSelectedRange();
				}
				this.setDateToHeader();
              	kony.application.dismissLoadingScreen();
				konymp.logger.info("Exiting onClickFunction function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
      
		/**
		 * @function removeRange
		 * @scope private
         * @param clickedId {string}
         * @param selectedSection {string}
		 * @description this function is invoked on change of selected from date.
		*/
      	removeRange :  function(clickedId,selectedSection){
			try{
				konymp.logger.info("Entered removeRange function of component", konymp.logger.FUNCTION_ENTRY);     
				konymp.logger.info("Parameters clickedId is: "+clickedId+" selectedSection is: "+selectedSection);
				this.removeSelectedRange();
				this._checkOutDate = {};
				this.setSelectedLabelCheckOut(false,true);
				this._checkInDate.id = clickedId;
				this._checkInDate.selectedSection = selectedSection;
				this.setCheckInImage();
				konymp.logger.info("Exiting removeRange function of component", konymp.logger.FUNCTION_EXIT); 
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}	
      	},
      
      	/**
		 * @function setSelectedLabelCheckIn
		 * @scope private
         * @param dateVisible {boolean}
         * @param labelVisible {boolean}
		 * @description this function is invoked to set visibilities of from date label and from date values.
		*/
      	setSelectedLabelCheckIn : function(dateVisible,labelVisible){
			try{
				konymp.logger.info("Entered setSelectedLabelCheckIn function of component", konymp.logger.FUNCTION_ENTRY);
				konymp.logger.info("Parameters dateVisible is: "+dateVisible+" labelVisible is: "+labelVisible);
				this.view.lblCheckInDate.isVisible = dateVisible;
				this.view.lblCheckInDay.isVisible = dateVisible;
				this.view.lblCheckInMonth.isVisible = dateVisible;
				this.view.lblCheckInSelectDate.isVisible = labelVisible;
				konymp.logger.info("Exiting setSelectedLabelCheckIn function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function setSelectedLabelCheckOut
		 * @scope private
         * @param dateVisible {boolean}
         * @param labelVisible {boolean}
		 * @description this function is invoked to set visibilities of to date label and to date values.
		*/
      	setSelectedLabelCheckOut : function(dateVisible,labelVisible){
			try{
				konymp.logger.info("Entered setSelectedLabelCheckOut function of component", konymp.logger.FUNCTION_ENTRY);
				konymp.logger.info("Parameters dateVisible is: "+dateVisible+" labelVisible is: "+labelVisible);
				this.view.lblCheckOutDate.isVisible = dateVisible;
				this.view.lblCheckOutDay.isVisible = dateVisible;
				this.view.lblCheckOutMonth.isVisible = dateVisible;
				this.view.lblCheckOutSelectDate.isVisible = labelVisible;
				konymp.logger.info("Exiting setSelectedLabelCheckOut function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
       	/**
		 * @function removeCheckInImage
		 * @scope private
		 * @description this function is invoked to remove the from date image.
		*/
      	removeCheckInImage : function(){
			try{
				konymp.logger.info("Entered removeCheckInImage function of component", konymp.logger.FUNCTION_ENTRY);
				var prevData = this.segmentData[this._checkInDate.selectedSection][1][0];
				prevData["img"+this._checkInDate.id] = {"isVisible" : false};
				prevData["lbl"+this._checkInDate.id].skin = "konympdprsknLbl2C3E50px34";
				this.view.segDate.setDataAt(prevData, 0, this._checkInDate.selectedSection);
              	this.view.forceLayout();
				konymp.logger.info("Exiting removeCheckInImage function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function setCheckInImage
		 * @scope private
		 * @description this function is invoked to set the from date image.
		*/
      	setCheckInImage : function(){
			try{
				konymp.logger.info("Entered setCheckInImage function of component", konymp.logger.FUNCTION_ENTRY);
				var data = this.segmentData[this._checkInDate.selectedSection][1][0];
				data["img"+this._checkInDate.id] = {"isVisible": true, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
				data["lbl"+this._checkInDate.id].skin = "konympdprsknLblFFFFFFpx34";
				this.view.segDate.setDataAt(data, 0, this._checkInDate.selectedSection);
				this.view.forceLayout();
				konymp.logger.info("Exiting setCheckInImage function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	}, 
      
      	/**
		 * @function removeImagesOutOfRangeForCheckOut
		 * @scope private
         * @param sectionIndex {string}
         * @param clickedId {string}
		 * @description this function is invoked to remove the images out of range on checkout click.
		*/
      	removeImagesOutOfRangeForCheckOut : function(sectionIndex,clickedId){
			try{
				konymp.logger.info("Entered removeImagesOutOfRangeForCheckOut function of component", konymp.logger.FUNCTION_ENTRY);
				konymp.logger.info("Parameters sectionIndex is: "+sectionIndex+" clickedId is: "+clickedId);
				for(i = sectionIndex; i <= this._checkOutDate.selectedSection; i++){
					if(i === sectionIndex){
						start = clickedId;
					}
					else{
						start = 1;
					}
					var month = this.segmentData[i][1][0];
					for(j = start; j <= 42; j++){
						month["img"+j] = {"isVisible": false};
						if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                           	month["lbl"+j].skin = "konympdprsknLbl2C3E50px34";
                       	}
                        else{
                           	month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                        }
					}
					this.view.segDate.setDataAt(month, 0, i);
					this.view.forceLayout();
				}
				konymp.logger.info("Exiting removeImagesOutOfRangeForCheckOut function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
		
		/**
		 * @function removeImagesOutOfRange
		 * @scope private
         * @param sectionIndex {string}
         * @param clickedId {string}
		 * @description this function is invoked to remove the images out of range.
		*/
      	removeImagesOutOfRange :function (sectionIndex,clickedId){
			try{
				konymp.logger.info("Entered removeImagesOutOfRange function of component", konymp.logger.FUNCTION_ENTRY);
				konymp.logger.info("Parameters sectionIndex is: "+sectionIndex+" clickedId is: "+clickedId);
				for(var i = this._checkInDate.selectedSection; i <= sectionIndex; i++){
					if(i === sectionIndex){
						end = clickedId;
					}
					else{
						end = 42;
					}
					var month=this.segmentData[i][1][0];
					for(var j = 1; j < end; j++){
						month["img"+j] = {"isVisible": false};
						if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                           	month["lbl"+j].skin = "konympdprsknLbl2C3E50px34";
                        }
                        else{
                           	month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                        }
					}
					this.view.segDate.setDataAt(month, 0, i);
					this.view.forceLayout();
				}
				konymp.logger.info("Exiting removeImagesOutOfRange function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
		},
		
		/**
		 * @function removeSelectedRange
		 * @scope private
		 * @description this function is invoked to remove the current range selected.
		*/
      	removeSelectedRange : function(){
			try{
				konymp.logger.info("Entered removeSelectedRange function of component", konymp.logger.FUNCTION_ENTRY);
				if((this._checkInDate.id !== undefined) && (this._checkOutDate.id!==undefined)){
					for(var i = this._checkInDate.selectedSection; i <= this._checkOutDate.selectedSection; i++){
						var month=this.segmentData[i][1][0];
						for(var j = 1; j <= 42; j++){
							month["img"+j] = {"isVisible": false};
                          	if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                              	month["lbl"+j].skin = "konympdprsknLbl2C3E50px34";
                            }
                          	else{
                              	month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                            }
						}
						this.view.segDate.setDataAt(month, 0, i);
						this.view.forceLayout();
					}
				}
				else if (this._checkInDate.id !== undefined){
					this.removeCheckInImage();
                  	this.view.forceLayout();
				}
				konymp.logger.info("Exiting removeSelectedRange function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
		},
		
      	/**
		 * @function setSelectedRange
		 * @scope private
		 * @description this function is invoked to set the current range selected.
		*/
      	setSelectedRange:function(){
			try{
				konymp.logger.info("Entered setSelectedRange function of component", konymp.logger.FUNCTION_ENTRY);
              	var end, start;
				if((this._checkInDate.id !== undefined) && (this._checkOutDate.id!==undefined)){
					for(var i = this._checkInDate.selectedSection; i <= this._checkOutDate.selectedSection; i++){
						if(i === this._checkInDate.selectedSection){
							end = (i===this._checkOutDate.selectedSection)?this._checkOutDate.id:42;
							start = this._checkInDate.id+1;
						}
						else if(i === this._checkOutDate.selectedSection){
							start = 1;
							end = this._checkOutDate.id;
						}
						else{
							start = 1;
							end = 42;
						}
						var month = this.segmentData[i][1][0];
						if(i === this._checkInDate.selectedSection){
							var checkInDay = this.calendarData[this._checkInDate.selectedSection].calendarDATA[start - 2].LABEL.Date.split(" ")[0];
							if(checkInDay === "Sat"){
								month["img"+(start-1)] = {"isVisible": true, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
								month["lbl"+(start-1)].skin = "konympdprsknLblFFFFFFpx34";
							}
							else{
								if(this.calendarData[this._checkInDate.selectedSection].calendarDATA[start - 1].LABEL.isMothDay){
									month["img"+(start-1)] = {"isVisible": true, "src": "konymp_dpr_date_circle_right.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
									month["lbl"+(start-1)].skin = "konympdprsknLblFFFFFFpx34";
								}
								else{
									month["img"+(start-1)] = {"isVisible": true, "src":"konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
									month["lbl"+(start-1)].skin= "konympdprsknLblFFFFFFpx34";
								}
							}
						}
						for(var j = start; j <= end; j++){
							if(this.calendarData[i].calendarDATA[j-1].LABEL.isMothDay){
								if(j%7 === 1){
									if(this.calendarData[i].calendarDATA[j].LABEL.isMothDay === false){
										month["img"+j] = {"isVisible": true, "src": "konymp_dpr_circle_light.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                              				month["lbl"+j].skin = "konympdprsknLblFFFFFFpx34";
                            			}
                          				else{
                              				month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                           				}
									}
									else{
										month["img"+j] = {"isVisible": true, "src": "konymp_dpr_left_semicircle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                              				month["lbl"+j].skin = "konympdprsknLblFFFFFFpx34";
                            			}
                          				else{
                              				month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                           				}
									}
								}
								else if(j%7 === 0){
									if(this.calendarData[i].calendarDATA[j - 1].LABEL.Day === "1"){
										month["img"+j]= {"isVisible": true, "src": "konymp_dpr_circle_light.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                              				month["lbl"+j].skin = "konympdprsknLblFFFFFFpx34";
                            			}
                          				else{
                              				month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                           				}
									}
									else{
										month["img"+j]={"isVisible":true, "src":"konymp_dpr_right_semicircle.png", "imageScaleMode":constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                              				month["lbl"+j].skin = "konympdprsknLblFFFFFFpx34";
                            			}
                          				else{
                              				month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                           				}
									}
								}
								else{
									if(this.calendarData[i].calendarDATA[j - 1].LABEL.Day === "1"){
										month["img"+j] = {"isVisible": true, "src": "konymp_dpr_left_semicircle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                              				month["lbl"+j].skin = "konympdprsknLblFFFFFFpx34";
                            			}
                          				else{
                              				month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                           				}
									}
									else if(this.calendarData[i].calendarDATA[j].LABEL.isMothDay === false){
										month["img"+j] = {"isVisible": true, "src": "konymp_dpr_right_semicircle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                              				month["lbl"+j].skin = "konympdprsknLblFFFFFFpx34";
                            			}
                          				else{
                              				month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                           				}
									}
									else{
										month["img"+j] = {"isVisible": true, "src": "konymp_dpr_square.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										if(this.calendarData[i].calendarDATA[j-1].LABEL.isEnabled){
                              				month["lbl"+j].skin = "konympdprsknLblFFFFFFpx34";
                            			}
                          				else{
                              				month["lbl"+j].skin = "konympdprsknLblBDC3C7Medium34";
                           				}
									}
								}
							}
						}
						if(i === this._checkOutDate.selectedSection){
							var checkOutDay = this.calendarData[this._checkOutDate.selectedSection].calendarDATA[end - 1].LABEL.Date.split(" ")[0];
							if(end !== this._checkInDate.id){
								if(checkOutDay === "Sun"){
									month["img"+(end)] = {"isVisible": true, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
									month["lbl"+(end)].skin = "konympdprsknLblFFFFFFpx34";
								}
								else{
									if(this.calendarData[this._checkOutDate.selectedSection].calendarDATA[end - 1].LABEL.Day === "1"){
										month["img"+(end)] = {"isVisible": true, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										month["lbl"+(end)].skin = "konympdprsknLblFFFFFFpx34";
									}
									else{
										month["img"+(end)] = {"isVisible": true, "src": "konymp_dpr_date_circle_left.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										month["lbl"+(end)].skin = "konympdprsknLblFFFFFFpx34";
									}
								}
							}
							else{
								if(this._checkInDate.selectedSection === this._checkOutDate.selectedSection){
									month["img"+(end)] = {"isVisible": true, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
									month["lbl"+(end)].skin = "konympdprsknLblFFFFFFpx34";
								}
								else{
									if(checkOutDay === "Sun"){
										month["img"+(end)] = {"isVisible": true, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
										month["lbl"+(end)].skin = "konympdprsknLblFFFFFFpx34";
									}
									else{
										if(this.calendarData[this._checkOutDate.selectedSection].calendarDATA[end - 1].LABEL.Day === "1"){
											month["img"+(end)] = {"isVisible": true, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
											month["lbl"+(end)].skin = "konympdprsknLblFFFFFFpx34";
										}
										else{
											month["img"+(end)] = {"isVisible": true, "src": "konymp_dpr_date_circle_left.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
											month["lbl"+(end)].skin = "konympdprsknLblFFFFFFpx34";
										}
									}
								}
							}
						}
						this.view.segDate.setDataAt(month,0,i);
						this.view.flxCalendar.forceLayout();
					}
				}
				konymp.logger.info("Exiting setSelectedRange function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
      
      	/**
		 * @function setDateToHeader
		 * @scope private
		 * @description this function is invoked to set the date values selected to header.
		*/
      	setDateToHeader : function(){
			try{
				konymp.logger.info("Entered setDateToHeader function of component", konymp.logger.FUNCTION_ENTRY);
				var date;
              	if(this._checkInDate.id !== undefined){
					date = this.getDateFunction("_checkInDate");
					this.view.lblCheckInDate.text = date.split(" ")[0];
					this.view.lblCheckInMonth.text = date.split(" ")[1] + " " + date.split(" ")[2];
					this.view.lblCheckInDay.text = date.split(" ")[3];
					this.setSelectedLabelCheckIn(true,false);
					this.view.forceLayout();
				}
				else{
					this.setSelectedLabelCheckIn(false,true);
				}
				if(this._checkOutDate.id !== undefined){
					date = this.getDateFunction("_checkOutDate");
					this.view.lblCheckOutDate.text = date.split(" ")[0];
					this.view.lblCheckOutMonth.text = date.split(" ")[1] + " " + date.split(" ")[2];
					this.view.lblCheckOutDay.text = date.split(" ")[3];
					this.setSelectedLabelCheckOut(true,false);
					this.view.forceLayout();
				}
				else{
					this.setSelectedLabelCheckOut(false,true);
				}
				konymp.logger.info("Exiting setDateToHeader function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}	
		},
      
      	/**
		 * @function getDateFunction
		 * @scope private
         * @param id {string}
		 * @description this function is invoked to get date selected.
		*/
      	getDateFunction : function(id){
			try{
				konymp.logger.info("Entered getDateFunction function of component", konymp.logger.FUNCTION_ENTRY);
				konymp.logger.info("Parameter id is: "+id);
				var monthYear = this.segmentData[this[id].selectedSection][0].lblMonthYear;
				var month = monthYear.split(" ")[0].substr(0,3);
				var year = monthYear.split(" ")[2];
				var date = this.calendarData[this[id].selectedSection].calendarDATA[this[id].id-1].LABEL.Day;
				var day = konymp.calendar.retriveDayName((this[id].id-1)%7);
				konymp.logger.info("Exiting getDateFunction function of component", konymp.logger.FUNCTION_EXIT);
              	return date+" "+month+" "+year+" "+day;
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
		
      	/**
		 * @function todayClick
		 * @scope private
		 * @description this function is invoked on click of today.
		*/
      	todayClick : function(){
			try{
				konymp.logger.info("Entered todayClick function of component", konymp.logger.FUNCTION_ENTRY);
				this.getTodayIndexAndID();
              	var id = this.todayID;
              	var index = this.todayIndex;
              	if(this.calendarData[index].calendarDATA[id - 1].LABEL.isEnabled){
        			this.onClickFunction(id, index);
                }
          		this.view.segDate.selectedRowIndex = [index, 0];
              	if(index === (this._numberOfMonths - 1)){
                	this._isLastRow = true;
               	}
                else{
                   	this._isLastRow = false;
                }
              	this.view.forceLayout();
          		if(this._deviceOS === "android"){
          			this.timerID = "com.konymp.daterangepicker.myTimer"+this.random();                   	
                  	kony.timer.schedule(this.timerID, this.setOffset, 0.5, false);
            	}
				konymp.logger.info("Exiting todayClick function of component", konymp.logger.FUNCTION_EXIT);
        	}
        	catch(e){
        		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function resetClick
		 * @scope private
		 * @description this function is invoked on click of reset.
		*/
      	resetClick : function(){
			try{
				konymp.logger.info("Entered resetClick function of component", konymp.logger.FUNCTION_ENTRY);
              	this.view.btnReset.isVisible = false;
				this.view.btnToday.zIndex = 4;
				this.view.forceLayout();
				this.animateSelect(20);
				this.checkInClick();
				konymp.logger.info("Exiting resetClick function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function animateSelect
		 * @scope private
         * @param ani {number}
		 * @description this function is invoked to animate tooltip.
		*/
      	animateSelect : function(ani){
			try{			
				konymp.logger.info("Entered animateSelect function of component", konymp.logger.FUNCTION_ENTRY);
              	this.view.imgDateSelected.animate(
					kony.ui.createAnimation({
						"100": {
							"left": ani+"%",
							"stepConfig": {
								"timingFunction": kony.anim.EASE
							}
						}
					}), {
						"delay": 0.5,
						"iterationCount": 1,
						"fillMode": kony.anim.FILL_MODE_FORWARDS,
						"duration": 0.25
					}, { }
				);
              	this.view.flxDate.forceLayout();
				konymp.logger.info("Exiting animateSelect function of component", konymp.logger.FUNCTION_EXIT);
			}
			catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function checkInClick
		 * @scope private
		 * @description this function is invoked on check in flex click.
		*/
      	checkInClick : function(){
        	try{
				konymp.logger.info("Entered checkInClick function of component", konymp.logger.FUNCTION_ENTRY);
              	kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {  
					shouldShowLabelInBottom: "true", separatorHeight: 200, 
					progressIndicatorType : constants.PROGRESS_INDICATOR_TYPE_SMALL, 
					progressIndicatorColor : "Gray"}
				);
              	this.view.imgDateSelected.isVisible = false;
         		this.view.imgDateSelected.parent.forceLayout();
              	this.renderCalendar();
              	this.anim();
        		if(this._centerYSet === ""){
                  	this._centerYSet = ((this._frameTop + (this._frameHeight/2))/this._screenHeight) * 100;
                }
        		this.setSelectedRange();
        		this._isCheckInClick = true;
        		if(this._checkInDate.id !== undefined){
            		this.view.segDate.selectedRowIndex = [this._checkInDate.selectedSection,0];
                  	if(this._checkInDate.selectedSection === (this._numberOfMonths - 1)){
                      	this._isLastRow = true;
                    }
                  	else{
                      	this._isLastRow = false;
                    }
                  	this.view.flxCalendar.forceLayout();
        		}
       			else{
          			var presentMonth = currDate.getMonth();
					var presentYear = currDate.getFullYear();
          			if(this._showToday === true){
        				var date = currDate.toDateString().split(' ');
						var yearDiff = presentYear - (this._calendarStartYear + 1);
        				var defaultMonths = 11 - this._calendarStartMonth;		
						var index = (yearDiff * 12) + presentMonth + defaultMonths + 1;
              			this.view.segDate.selectedRowIndex = [index, 0];
                      	if(index === (this._numberOfMonths - 1)){
                      		this._isLastRow = true;
                    	}
                  		else{
                      		this._isLastRow = false;
                    	}
            		}		
          			else{
              			if(this._calendarStartYear > presentYear){
                  			this.view.segDate.selectedRowIndex = [0, 0];
                          	this._isLastRow = false;
                		}
              			else if(this._calendarEndYear < presentYear){
                  			this.view.segDate.selectedRowIndex = [this._numberOfMonths - 1, 0];
                          	this._isLastRow = true;
                		}
              			else{
                  			if(this._calendarStartMonth > presentMonth){
                      			this.view.segDate.selectedRowIndex = [0, 0];
                              	this._isLastRow = false;
                    		}
                  			else if(this._calendarEndMonth < presentMonth){
                      			this.view.segDate.selectedRowIndex = [this._numberOfMonths - 1, 0];
                              	this._isLastRow = true;
                    		}
                		}
            		}
        		}
        		if(this._deviceOS === "android"){
                  	this.timerID = "com.konymp.daterangepicker.myTimer"+this.random(); 
                  	kony.timer.schedule(this.timerID, this.setOffset, 0.5, false);
        		}
              	this.view.imgDateSelected.left = "20%";
              	this.view.imgDateSelected.isVisible = true;
              	this.view.imgDateSelected.parent.forceLayout();
              	this.view.flxCalendar.isVisible = true;
        		this.view.forceLayout();
              	kony.application.dismissLoadingScreen();
				konymp.logger.info("Exiting checkInClick function of component", konymp.logger.FUNCTION_EXIT);
        	}
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function random
		 * @scope private
		 * @description this function is invoked to generate a random number to avoid timer issues.
		*/
      	random : function() {
          	try{
              	konymp.logger.info("Entered random function of component", konymp.logger.FUNCTION_ENTRY);
    			var x = Math.sin(this.seed++) * 10000;
              	konymp.logger.info("Exiting random function of component", konymp.logger.FUNCTION_EXIT);
    			return x - Math.floor(x);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
		},
      
      	/**
		 * @function setOffset
		 * @scope private
		 * @description this function is invoked to set the offset to calendar segment in android.
		*/
      	setOffset: function(){
          	try{
        		konymp.logger.info("Entered setOffset function of component", konymp.logger.FUNCTION_ENTRY);
              	var setOffsetInDp = this.view.segDate.contentOffsetMeasured.y - 70;
              	if(!this._isLastRow){
              		this.view.segDate.contentOffset = {"x":0, "y": setOffsetInDp}; 
                }
           		kony.timer.cancel(this.timerID);
              	konymp.logger.info("Exiting setOffset function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
            
      	/**
		 * @function anim
		 * @scope private
		 * @description this function is invoked to set the visibility of calendar to on.
		*/
      	anim: function(){
			try{
				konymp.logger.info("Entered anim function of component", konymp.logger.FUNCTION_ENTRY);
              	this.view.btnToday.centerY = "2.5%";
              	if(this._showToday === true){
					this.view.btnToday.zIndex = 5;
				}
				else{
					this.view.btnToday.zIndex = 1;
				}
              	this.view.forceLayout();
              	this.view.height = "90%";
              	this.view.flxCalendar.top = "14%";
              	this.view.centerY = "55%";
              	this.view.forceLayout();
              	this.view.flxHeader.isVisible = true;
              	this.view.flxDate.top = "5%";
              	this.view.flxDate.height = "9.44%";
				konymp.logger.info("Exiting anim function of component", konymp.logger.FUNCTION_EXIT);
			}
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function reverseAnim
		 * @scope private
		 * @description this function is invoked to set the visibility of calendar to off.
		*/
      	reverseAnim: function(){
			try{
				konymp.logger.info("Entered reverseAnim function of component", konymp.logger.FUNCTION_ENTRY);
				this.view.flxCalendar.isVisible = false;
              	this.view.flxHeader.isVisible = false;
              	this.view.btnToday.centerY = "-100%";
              	this.view.flxDate.top = "0%";
              	this.view.flxCalendar.top = "7%";
              	this.view.forceLayout();
				konymp.logger.info("Exiting reverseAnim function of component", konymp.logger.FUNCTION_EXIT);
			}
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function checkOutClick
		 * @scope private
		 * @description this function is invoked on click of check out flex.
		*/
      	checkOutClick : function(){
        	try{
				konymp.logger.info("Entered checkOutClick function of component", konymp.logger.FUNCTION_ENTRY);
        		kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {  
					shouldShowLabelInBottom: "true", separatorHeight: 200, 
					progressIndicatorType : constants.PROGRESS_INDICATOR_TYPE_SMALL, 
					progressIndicatorColor : "Gray"}
				);
              	if(this._checkInDate.id === undefined){
	        		this.checkInClick();
        		}
        		else{
                  	this.view.imgDateSelected.isVisible = false;
        			this.view.imgDateSelected.parent.forceLayout();
       	  			this.renderCalendar();
                  	this.anim();
                  	if(this._centerYSet === ""){
        				this._centerYSet = ((this._frameTop + (this._frameHeight/2))/this._screenHeight) * 100;
            		}
					this.setSelectedRange();
                  	this.view.btnToday.centerY = "2.5%";
          			this._isCheckInClick=false;
          			if(this._checkOutDate.id !== undefined){
              			this.view.segDate.selectedRowIndex = [this._checkOutDate.selectedSection,0];
                      	if(this._checkOutDate.selectedSection === (this._numberOfMonths - 1)){
                      		this._isLastRow = true;
                    	}
                  		else{
                      		this._isLastRow = false;
                    	}
                      	this.view.flxCalendar.forceLayout();
            		}
          			else{
              			var presentMonth = currDate.getMonth();
						var presentYear = currDate.getFullYear();
              			if(this._showToday === true){
        					var date = currDate.toDateString().split(' ');
							var yearDiff = presentYear - (this._calendarStartYear + 1);
        					var defaultMonths = 11 - this._calendarStartMonth;
							var index = (yearDiff * 12) + presentMonth + defaultMonths + 1;
              				this.view.segDate.selectedRowIndex = [index, 0];
                          	if(index === (this._numberOfMonths - 1)){
                      			this._isLastRow = true;
                    		}
                  			else{
                      			this._isLastRow = false;
                    		}                          	
            			}
              			else{
              				if(this._calendarStartYear > presentYear){
                  				this.view.segDate.selectedRowIndex = [0, 0];
                              	this._isLastRow = false;
                			}
              				else if(this._calendarEndYear < presentYear){
                	  			this.view.segDate.selectedRowIndex = [this._numberOfMonths - 1, 0];
                              	this._isLastRow = true;
               	 			}
              				else{
                  				if(this._calendarStartMonth > presentMonth){
                    	  			this.view.segDate.selectedRowIndex = [0, 0];
                                  	this._isLastRow = false;
                    			}
                  				else if(this._calendarEndMonth < presentMonth){
                    	  			this.view.segDate.selectedRowIndex = [this._numberOfMonths - 1, 0];
                                  	this._isLastRow = true;
                    			}
                			}
            			}		
            		}
        		}
        		if(this._deviceOS === "android"){
        			this.timerID = "com.konymp.daterangepicker.myTimer"+this.random(); 
                  	kony.timer.schedule(this.timerID, this.setOffset, 0.5, false);
        		}
                this.view.imgDateSelected.left = "75%";
              	this.view.imgDateSelected.parent.forceLayout();
              	this.view.imgDateSelected.isVisible = true;
              	this.view.flxCalendar.isVisible = true;
              	this.view.forceLayout();
              	kony.application.dismissLoadingScreen();
              	konymp.logger.info("Exiting checkOutClick function of component", konymp.logger.FUNCTION_EXIT);
      		}
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function doneClick
		 * @scope private
		 * @description this function is invoked on click of done button.
		*/
      	doneClick : function(){
			try{
				konymp.logger.info("Entered doneClick function of component", konymp.logger.FUNCTION_ENTRY);
				kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {  
					shouldShowLabelInBottom: "true", separatorHeight: 200, 
					progressIndicatorType : constants.PROGRESS_INDICATOR_TYPE_SMALL, 
					progressIndicatorColor : "Gray"}
				);
				this.reverseAnim();
				this.view.height="9.44%";
				this.view.flxDate.height="100%";
              	this.view.imgDateSelected.isVisible = false;
				this.view.centerY = this._centerYSet + "%";
				if(this._checkInDate.id !== undefined){
					this._prevCheckInId = this._checkInDate.id;
					this._prevCheckInSection = this._checkInDate.selectedSection;
				}
				if(this._checkOutDate.id !== undefined){
					this._prevCheckOutId = this._checkOutDate.id;
					this._prevCheckOutSection = this._checkOutDate.selectedSection;
				}
				this.view.forceLayout();
				kony.application.dismissLoadingScreen();
				if(this.onDateSelectionDone !== undefined && this.onDateSelectionDone !== null){
					this.onDateSelectionDone();
				}
				konymp.logger.info("Exiting doneClick function of component", konymp.logger.FUNCTION_EXIT);
			}
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
      	},
      
      	/**
		 * @function cancelClick
		 * @scope private
		 * @description this function is invoked on click of cancel button.
		*/
      	cancelClick: function(){
			try{
				konymp.logger.info("Entered cancelClick function of component", konymp.logger.FUNCTION_ENTRY);
				kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {  
					shouldShowLabelInBottom: "true", separatorHeight: 200, 
					progressIndicatorType : constants.PROGRESS_INDICATOR_TYPE_SMALL, 
					progressIndicatorColor : "Gray"}
				);
              	this.removeSelectedRange();
				if(this._prevCheckInId === ""){
					this.setSelectedLabelCheckIn(false,true);
					this._checkInDate = {};
                  	this.highlightToday();
				}
				else{
					this._checkInDate.id = this._prevCheckInId;
					this._checkInDate.selectedSection = this._prevCheckInSection;
                  	this.onClickFunction(this._checkInDate.id, this._checkInDate.selectedSection);
					this.setDateToHeader();
				}
				if(this._prevCheckOutId  === ""){
					this.setSelectedLabelCheckOut(false,true);
					this._checkOutDate = {};
				}
				else{
					this._checkOutDate.id = this._prevCheckOutId;
					this._checkOutDate.selectedSection = this._prevCheckOutSection;
					this.setDateToHeader();
				}
              	this.reverseAnim();
              	this.view.height="9.44%";
				this.view.flxDate.height="100%";
              	this.view.imgDateSelected.isVisible = false;
				this.view.centerY = this._centerYSet + "%";
				this._centerYSet = "";
				this.view.forceLayout();
				kony.application.dismissLoadingScreen();
				konymp.logger.info("Exiting cancelClick function of component", konymp.logger.FUNCTION_EXIT);
			}
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	if(e.type === "Explicit"){
					throw e;
				}
            }
	  	},
      
      	/**
		 * @function getSelectedFromDate
		 * @scope private
		 * @description this function is invoked to return selected from date.
		*/
      	getSelectedFromDate : function(){
        	try{
				konymp.logger.info("Entered getSelectedFromDate function of component", konymp.logger.FUNCTION_ENTRY);
        		var date = this.view.lblCheckInDate.text;
              	if(date !== ""){
					var monthNum = this.retriveMonthNumber(this.view.lblCheckInMonth.text.split(" ")[0]);
        			var monthName = konymp.calendar.retriveMonthName(monthNum); 
					var year = this.view.lblCheckInMonth.text.split(" ")[1];
        			var dateString= (monthNum+1)+"/"+date+"/"+year;
					var startDate={"day": date, "month":monthName, "year":year, "dateString":dateString};
					konymp.logger.info("Exiting getSelectedFromDate function of component", konymp.logger.FUNCTION_EXIT);
                  	return startDate;
          		}
              	else{
                  	throw {
                      	type : "Explicit",
                      	message : "Start Date Not Selected"
                    };
                }
            }
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	if(e.type === "Explicit"){
        			throw e;
                }
            }
      	},
      
      	/**
		 * @function getSelectedToDate
		 * @scope private
		 * @description this function is invoked to return selected to date.
		*/
      	getSelectedToDate : function(){
			try{
				konymp.logger.info("Entered getSelectedToDate function of component", konymp.logger.FUNCTION_ENTRY);
				var date = this.view.lblCheckOutDate.text;
              	if(date !== ""){
					var monthNum = this.retriveMonthNumber(this.view.lblCheckOutMonth.text.split(" ")[0]);
					var	monthName = konymp.calendar.retriveMonthName(monthNum); 
					var year = this.view.lblCheckOutMonth.text.split(" ")[1];		
					var dateString= (monthNum+1)+"/"+date+"/"+year;
					var endDate={"day": date, "month":monthName, "year":year, "dateString":dateString};
					konymp.logger.info("Exiting getSelectedToDate function of component", konymp.logger.FUNCTION_EXIT);
                  	return endDate;
                }
              	else{
                  	throw {
                      	type : "Explicit",
                      	message : "End Date Not Selected"
                    };
                }
			}
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        		if(e.type === "Explicit"){
              		throw e;
                }
            }
		},
      
      	/**
		 * @function retriveMonthNumber
		 * @scope private
         * @param month_name {string}
		 * @description this function is invoked to return month number based on name.
		*/
      	retriveMonthNumber : function(month_name){
			try{
				konymp.logger.info("Entered retriveMonthNumber function of component", konymp.logger.FUNCTION_ENTRY);
				konymp.logger.info("Parameter month_name is: "+month_name);
				if(month_name.length >3){
					month_name=month_name.substr(0,3);
				}
				switch (month_name) {
					case "Jan":
						return 0;
					case "Feb":
						return 1;
					case "Mar":
						return 2;
					case "Apr":
						return 3;
					case "May":
						return 4;
					case "Jun":
						return 5;
					case "Jul":
						return 6;
					case "Aug":
						return 7;
					case "Sep":
						return 8;
					case "Oct":
						return 9;
					case "Nov":
						return 10;
					case "Dec":
						return 11;
					default:
						throw {
							type: "Explicit",
                        	message : "Wrong parameter passing in the function retrive month Number"
                        };
				}
				konymp.logger.info("Exiting retriveMonthNumber function of component", konymp.logger.FUNCTION_EXIT);
			}
        	catch(e){
          		konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
		},
      
      	/**
		 * @function getNumberOfMonths
		 * @scope private
		 * @description this function is invoked to return number of calendar months to be generated.
		*/
      	getNumberOfMonths : function(){
          	try{
				konymp.logger.info("Entered getNumberOfMonths function of component", konymp.logger.FUNCTION_ENTRY);
          		var numberOfMonths = (Number(this._calendarEndYear) - Number(this._calendarStartYear)) * 12;
          		numberOfMonths = (numberOfMonths - this._calendarStartMonth) + (this._calendarEndMonth + 1);
				konymp.logger.info("Exiting getNumberOfMonths function of component", konymp.logger.FUNCTION_EXIT);
              	return numberOfMonths;
          	}
          	catch(e){
            	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
		
		/**
		 * @function isTodayVisible
		 * @scope private
		 * @description this function is invoked to find whether today button should be visible or not.
		*/
      	isTodayVisible : function(){
			try{
				konymp.logger.info("Entered isTodayVisible function of component", konymp.logger.FUNCTION_ENTRY);
				if(this.isTodayEnabled === true){
					var curYear = currDate.getFullYear();
					var curMonth = currDate.getMonth();
					if((this._calendarStartYear < curYear) && (this._calendarEndYear > curYear)){
						this._showToday = true;
					}	
					else if((this._calendarStartYear === curYear) && (this._calendarEndYear === curYear)){
						if((this._calendarStartMonth <= curMonth) && (this._calendarEndMonth >= curMonth)){
							this._showToday = true;
						}
						else{
							this._showToday = false;
						}
					}
					else if(this._calendarStartYear === curYear){
						if(this._calendarStartMonth <= curMonth){
						this._showToday = true;
						}
						else{
							this._showToday = false;
						}
					}
					else if(this._calendarEndYear === curYear){
						if(this._calendarEndMonth >= curMonth){
							this._showToday = true;
						}
						else{
							this._showToday = false;
						}
					}
					else{
						this._showToday = false;
					}
				}
				else{
					this._showToday = false;
				}
				konymp.logger.info("Exiting isTodayVisible function of component", konymp.logger.FUNCTION_EXIT);
			}
          	catch(e){
            	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
		},
        
      	/**
		 * @function renderCalendar
		 * @scope private
		 * @description this function is invoked to find whether new calendar needs to be rendered or not.
		*/
      	renderCalendar :  function(){
			try{
				konymp.logger.info("Entered renderCalendar function of component", konymp.logger.FUNCTION_ENTRY);
				this.createNewCalendar = false;
				this._currentKey = this._calendarStartDay+"/"+this._calendarStartMonth+"/"+this._calendarStartYear+
									"-"+this._calendarEndDay+"/"+this._calendarEndMonth+"/"+this._calendarEndYear;
				if(this._prevKey === ""){
					this._prevKey = this._currentKey;
					this.createNewCalendar = true;
				}
				else{
					if(this._prevKey === this._currentKey){
						this.createNewCalendar = false;
					}
					else{
						this.createNewCalendar = true;
						this._prevKey = this._currentKey;
					}
				}
				if(this.createNewCalendar === true){
                  	if(this._calendarStartMonth === undefined){
                      	this.calendarStartDate = "";
                    }
                  	else if(this._calendarEndMonth === undefined){
                      	this.calendarStartDate = "";
                    }
                  	else{
                      	this.isTodayVisible();
						this.setDataToCalendar();
                    }
				}
				konymp.logger.info("Exiting renderCalendar function of component", konymp.logger.FUNCTION_EXIT);
			}
          	catch(e){
            	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
      
      	/**
		 * @function setDataToCalendar
		 * @scope private
		 * @description this function is invoked to generate new calendar and set the data.
		*/
      	setDataToCalendar : function(){
			try{
				konymp.logger.info("Entered setDataToCalendar function of component", konymp.logger.FUNCTION_ENTRY);
				kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {  
					shouldShowLabelInBottom: "true", separatorHeight: 200, 
					progressIndicatorType : constants.PROGRESS_INDICATOR_TYPE_SMALL, 
					progressIndicatorColor : "Gray"}
				);
				this._checkInDate = {};
				this._checkOutDate = {};
              	this._prevCheckInId = "";
				this._prevCheckInSection = "";
				this._prevCheckOutId = "";
				this._prevCheckOutSection = "";
				this.setDateToHeader();
              	this.view.imgDateSelected.left = "75%";
              	this.view.imgDateSelected.parent.forceLayout();
				this._numberOfMonths = this.getNumberOfMonths();
				konymp.calendar = (new CalendarWidgetModule(this._calendarStartMonth, this._calendarStartYear, "", this._numberOfMonths)) || function() {};
				this.calendarData = konymp.calendar.getcalendar();
				var len = this.calendarData.length;
              	var k;
				var segData = [];
              	for(var i = 0; i < len; i++){
					var head={"lblSunday":"S","lblMonday":"M","lblTuesday":"T","lblWednesday":"W","lblThursday":"T","lblFriday":"F","lblSaturday":"S"};
					head.lblMonthYear = konymp.calendar.retriveMonthName(this.calendarData[i].MONTH)+"  "+this.calendarData[i].YEAR.toFixed();
					var monthData = this.calendarData[i].calendarDATA;
					var rows = [];
					var month = {};
					for(var j = 0; j < 42; j++){
                      	var weekday = monthData[j].LABEL.Date.split(" ")[0];
                      	if(this["_enable"+this.getFullDay[weekday]+"s"]){
                          	this.calendarData[i].calendarDATA[j].LABEL.isEnabled = true;
                        }
                      	else{
                          	this.calendarData[i].calendarDATA[j].LABEL.isEnabled = false;
                        }
                      	if(this.calendarData[i].calendarDATA[j].LABEL.isEnabled){
                          	month["lbl"+(j+1)] = monthData[j].LABEL.isMothDay ? {"text": monthData[j].LABEL.Day, "skin": "konympdprsknLbl2C3E50px34"}:"";
                          	month["flx"+(j+1)] = monthData[j].LABEL.isMothDay ? {"onClick": this.onClickFlex, "width": "12.25%", "height": "21.68%"}:"";
                        }
                      	else{
                          	month["lbl"+(j+1)] = monthData[j].LABEL.isMothDay ? {"text": monthData[j].LABEL.Day, "skin": "konympdprsknLblBDC3C7Medium34"}:"";
                          	month["flx"+(j+1)] = monthData[j].LABEL.isMothDay ? {"width": "12.25%", "height": "21.68%"}:"";
                        }
						month["img"+(j+1)] = monthData[j].LABEL.isMothDay ?{"isVisible": false, "src": "imagedrag.png"}:"";
                      	if(i === 0){
                          	for(k = 0; k < 42; k++){
                           	if(this.calendarData[i].calendarDATA[k].LABEL.isMothDay){
                                  	if(this.calendarData[i].calendarDATA[k].LABEL.Day < this._calendarStartDay){
                                      	this.calendarData[i].calendarDATA[k].LABEL.isEnabled = false;
                                      	month["lbl"+(k+1)] = monthData[k].LABEL.isMothDay ? {"text": monthData[k].LABEL.Day, "skin": "konympdprsknLblBDC3C7Medium34"}:"";
                          				month["flx"+(k+1)] = monthData[k].LABEL.isMothDay ? {"width": "12.25%", "height": "21.68%"}:"";
                                    }
                                  	else{
                                      	break;
                                    }
                                }
                            }
                        }
                      	if(i === len-1){
                          	for(k = 41; k >= 0; k--){
                              	if(this.calendarData[i].calendarDATA[k].LABEL.isMothDay){
                                  	if(this.calendarData[i].calendarDATA[k].LABEL.Day > this._calendarEndDay){
                                      	this.calendarData[i].calendarDATA[k].LABEL.isEnabled = false;
                                      	month["lbl"+(k+1)] = monthData[k].LABEL.isMothDay ? {"text": monthData[k].LABEL.Day, "skin": "konympdprsknLblBDC3C7Medium34"}:"";
                          				month["flx"+(k+1)] = monthData[k].LABEL.isMothDay ? {"width": "12.25%", "height": "21.68%"}:"";
                                    }
                                  	else{
                                      	break;
                                    }
                                }
                            }
                        }
					}	
					rows.push(month);
					var sec = [head,rows];
					segData.push(sec);
				}
				this.view.segDate.setData(segData);
				this.view.forceLayout();
				this.segmentData = this.view.segDate.data;
              	this.highlightToday();
              	if(this._disabledDates.length !== 0){
					this.disableDates();
                }
              	if(this._defaultFromDate !== ""){
                  	this.setDefaultFromDate(this._defaultFromDate);
                  	if(this._defaultToDate !== ""){
                  		this.setDefaultToDate(this._defaultToDate);
                	}
                }
				kony.application.dismissLoadingScreen();
				konymp.logger.info("Exiting setDataToCalendar function of component", konymp.logger.FUNCTION_EXIT);
			}
          	catch(e){
            	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
      
      	/**
		 * @function getTodayIndexAndID
		 * @scope private
		 * @description this function is invoked to get the index and id of current date.
		*/
      	getTodayIndexAndID : function(){
          	try{
          		konymp.logger.info("Entered getTodayIndexAndID function of component", konymp.logger.FUNCTION_ENTRY);
          		var date = new Date();
				var presentMonth = date.getMonth();
				var presentYear = date.getFullYear();
        		date = new Date().toDateString().split(' ');
				var yearDiff = presentYear - (this._calendarStartYear + 1);
        		var defaultMonths = 11 - this._calendarStartMonth;
				this.todayIndex = (yearDiff * 12) + presentMonth + defaultMonths + 1;
        		var monthYear = this.segmentData[this.todayIndex][0].lblMonthYear;
        		var nonDays = this.returnNonDays(this.todayIndex);
        		this.todayID = nonDays + Number(date[2]);
              	konymp.logger.info("Exiting getTodayIndexAndID function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
      
      	/**
		 * @function highlightToday
		 * @scope private
		 * @description this function is invoked to enable today button.
		*/
      	highlightToday : function(){
          	try{
              	konymp.logger.info("Entered highlightToday function of component", konymp.logger.FUNCTION_ENTRY);
              	if(this._showToday === true){
            	  	this.getTodayIndexAndID();
            	  	var id = this.todayID;
            	  	var index = this.todayIndex;
            	  	var currMonthData = this.segmentData[index][1][0];
            	   	currMonthData["img"+id] = {"isVisible": true, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
            	  	if(this.calendarData[index].calendarDATA[id-1].LABEL.isEnabled){
            	      	currMonthData["lbl"+id].skin = "konympdprsknLblFFFFFFpx34";
                      	this.view.btnToday.skin = "konympdprsknBtn51525FRegular28";
                      	this.view.btnToday.focusSkin = "konympdprsknBtn51525FRegular28";
            	    }
            	  	else{
            	      	currMonthData["lbl"+id].skin = "konympdprsknLblBDC3C7Medium34";
                      	this.view.btnToday.skin = "konympdprsknBtnBDC3C7Regular28";
                      	this.view.btnToday.focusSkin = "konympdprsknBtnBDC3C7Regular28";
            	    }
        			this.view.segDate.setDataAt(currMonthData,0,index);
					this.view.forceLayout();
            	}
              	konymp.logger.info("Exiting highlightToday function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
      
      	/**
		 * @function unHighlightToday
		 * @scope private
		 * @description this function is invoked to disable today button.
		*/
      	unHighlightToday : function(){
			try{
              	konymp.logger.info("Entered unHighlightToday function of component", konymp.logger.FUNCTION_ENTRY);
            	if(this._showToday === true){
              		this.getTodayIndexAndID();
              		var id = this.todayID;
              		var index = this.todayIndex;
              		var currMonthData = this.segmentData[index][1][0];
               		currMonthData["img"+id] = {"isVisible": false, "src": "konymp_dpr_circle.png", "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO};
              		if(this.calendarData[index].calendarDATA[id-1].LABEL.isEnabled){
                	  	currMonthData["lbl"+id].skin = "konympdprsknLbl2C3E50px34";
                	}
              		else{
                  		currMonthData["lbl"+id].skin = "konympdprsknLblBDC3C7Medium34";
                	}
        			this.view.segDate.setDataAt(currMonthData,0,index);
					this.view.forceLayout();
                }
              	konymp.logger.info("Exiting unHighlightToday function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
             	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
    	},
      
      	/**
		 * @function setDefaultFromDate
		 * @scope private
         * @param fromDateString {string}
		 * @description this function is invoked to set default from date to calendar.
		*/
      	setDefaultFromDate : function(fromDateString){
          	try{
              	konymp.logger.info("Entered setDefaultFromDate function of component", konymp.logger.FUNCTION_ENTRY);
              	konymp.logger.info("Parameter fromDateString is: "+fromDateString);
          		var regexDate = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
          		if(regexDate.test(fromDateString)){
                  	if(this.segmentData === undefined){
                  		this.renderCalendar();
                    }
                  	this._defaultFromDate = fromDateString;
                    this._checkInDefaultSet = true;
            	  	var defaultFromMonth = Number(fromDateString.split("/")[0]) - 1;
            	  	var defaultFromDate = Number(fromDateString.split("/")[1]);
            	  	var defaultFromYear = Number(fromDateString.split("/")[2]);
            	  	var yearDiff = defaultFromYear - (this._calendarStartYear + 1);
                  	var segmentLength = this.segmentData.length;
        			var defaultMonths = 11 - this._calendarStartMonth;
                  	var defaultFromMonthIndex = (yearDiff * 12) + defaultFromMonth + defaultMonths + 1;
                  	if(defaultFromMonthIndex < 0 || defaultFromMonthIndex > (segmentLength-1)){
                      	throw {
                          	type : "Explicit",
                          	message : "Default From Date entered is not present in Calendar range"
                        };
                    }
                  	var monthYear = this.segmentData[defaultFromMonthIndex][0].lblMonthYear;
                  	var nonDays = this.returnNonDays(defaultFromMonthIndex);
        			var defaultFromDateID = nonDays + Number(defaultFromDate);
					if(! this.calendarData[defaultFromMonthIndex].calendarDATA[defaultFromDateID-1].LABEL.isMothDay){
                      	throw {
                          	type : "Explicit",
                          	message : "Invalid Default From Date entered"
                        };
                    }
                  	if(this.calendarData[defaultFromMonthIndex].calendarDATA[defaultFromDateID - 1].LABEL.isEnabled){
              			this._isCheckInClick = true;
              			this.onClickFunction(defaultFromDateID, defaultFromMonthIndex);
                      	this.doneClick();
                	}
                  	else{
                      	this._checkInDate={};
                      	this.setDateToHeader();
                    }
            	}
              	else{
                  	throw {
                      	type : "Explicit",
                     	message : "Invalid Default From Date format entered"
                    };
                }
              	konymp.logger.info("Exiting setDefaultFromDate function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	if(e.type === "Explicit"){
              		throw e;
                }
            }
        },
      
      	/**
		 * @function setDefaultToDate
		 * @scope private
         * @param toDateString {string}
		 * @description this function is invoked to set default to date to calendar.
		*/
      	setDefaultToDate : function(toDateString){
          	try{
              	konymp.logger.info("Entered setDefaultToDate function of component", konymp.logger.FUNCTION_ENTRY);
              	konymp.logger.info("Parameter toDateString is: "+toDateString);
        		if(this._checkInDefaultSet){
          			var regexDate = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
          			if(regexDate.test(toDateString)){
                      	this._defaultToDate = toDateString;
              			var defaultToMonth = Number(toDateString.split("/")[0]) - 1;
              			var defaultToDate = Number(toDateString.split("/")[1]);
              			var defaultToYear = Number(toDateString.split("/")[2]);
              			var yearDiff = defaultToYear - (this._calendarStartYear + 1);
        				var defaultMonths = 11 - this._calendarStartMonth;
						var defaultToMonthIndex = (yearDiff * 12) + defaultToMonth + defaultMonths + 1;
                      	var segmentLength = this.segmentData.length;
                      	if(defaultToMonthIndex < 0 || defaultToMonthIndex > (segmentLength-1)){
                      		throw {
                              	type : "Explicit",
                        	  	message : "Default To Date entered is not present in Calendar range"
                        	};
                        }                   
        				var	monthYear = this.segmentData[defaultToMonthIndex][0].lblMonthYear;
        				var setDefaultToDate = false;
                      	var nonDays = this.returnNonDays(defaultToMonthIndex);
        				var defaultToDateID = nonDays + Number(defaultToDate);
                      	if(! this.calendarData[defaultToMonthIndex].calendarDATA[defaultToDateID-1].LABEL.isMothDay){
                      		throw {
                              	type : "Explicit",
                          		message : "Invalid Default To Date entered"
                        	};
                    	}
                      	if(defaultToMonthIndex > this._checkInDate.selectedSection){
                          	setDefaultToDate = true;
                        }
                      	else if(defaultToMonthIndex === this._checkInDate.selectedSection){
                          	if(defaultToDateID >= this._checkInDate.id){
                              	setDefaultToDate = true;
                            }
                        }
                      	else{
							setDefaultToDate = false;                              
                          	throw {
                            	type : "Explicit",
                        	  	message : "Default From Date entered is greater than Default To Date entered"
                        	};
                        }
                  		if(this._checkInDate.id !== undefined && setDefaultToDate){
            	  			if(this.calendarData[defaultToMonthIndex].calendarDATA[defaultToDateID - 1].LABEL.isEnabled){
              					this._isCheckInClick = false;
              					this.onClickFunction(defaultToDateID, defaultToMonthIndex);
                              	this.doneClick();
                			}
                          	else{
                      			this._checkOutDate={};
                      			this.setDateToHeader();
                    		}
                		}
                      	else{
                          	this._checkOutDate={};
                      		this.setDateToHeader();
                        }
                    }
                  	else{
                      	throw {
                          	type : "Explicit",
                          	message : "Invalid Default To Date format entered"	
                        };
                    }
            	}
              	else{
                  	throw {
                          	type : "Explicit",
                          	message : "Do not set Default To Date before setting the Default From Date"	
                        };
                }
              	konymp.logger.info("Exiting setDefaultToDate function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	if(e.type === "Explicit"){
              		throw e;
                }
            }
        },
      
      	/**
		 * @function disableDate
		 * @scope private
         * @param dateToDisable {string}
		 * @description this function is invoked to disable a date.
		*/
      	disableDate : function(dateToDisable){
          	try{
              	konymp.logger.info("Entered disableDate function of component", konymp.logger.FUNCTION_ENTRY);
          		konymp.logger.info("Parameter dateToDisable is: "+dateToDisable);
              	var month = {};
          		if(this.segmentData === undefined){
              		this.renderCalendar();
           		}
          		var regexDate = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
           		if(regexDate.test(dateToDisable)){
            	    var disableDateMonth = Number(dateToDisable.split("/")[0]) - 1;
              		var disableDate = Number(dateToDisable.split("/")[1]);
                	var disableDateYear = Number(dateToDisable.split("/")[2]);
              		var yearDiff = disableDateYear - (this._calendarStartYear + 1);
        			var defaultMonths = 11 - this._calendarStartMonth;
					var disableDateIndex = (yearDiff * 12) + disableDateMonth + defaultMonths + 1;
                  	var segmentLength = this.segmentData.length;
                  	if(disableDateIndex < 0 || disableDateIndex > (segmentLength-1)){
                      	throw {
                          	type : "Explicit",
                          	message : "The date entered to disable is not in the Calendar range"
                        };
                    }
                  	var monthData = this.calendarData[disableDateIndex].calendarDATA;
                  	month = this.segmentData[disableDateIndex][1][0];
        			var	monthYear = this.segmentData[disableDateIndex][0].lblMonthYear;
        			var nonDays = this.returnNonDays(disableDateIndex);
        			var disableDateID = nonDays + Number(disableDate);
                	if(! this.calendarData[disableDateIndex].calendarDATA[disableDateID-1].LABEL.isMothDay){
                      	throw {
                          	type : "Explicit",
                          	message : "Invalid Date entered to disable"
                        };
                    }
                  	this._disabledDates.push(dateToDisable);
                  	this.calendarData[disableDateIndex].calendarDATA[disableDateID - 1].LABEL.isEnabled = false;
                  	month["lbl"+(disableDateID)] = monthData[disableDateID-1].LABEL.isMothDay ? {"text": monthData[disableDateID-1].LABEL.Day, "skin": "konympdprsknLblBDC3C7Medium34"}:"";
                	month["flx"+(disableDateID)] = monthData[disableDateID-1].LABEL.isMothDay ? {"width": "12.25%", "height": "21.68%"}:"";
                	this.getTodayIndexAndID();
                	if(this.todayID === disableDateID && this.todayIndex === disableDateIndex){
                	   	this.view.btnToday.skin = "konympdprsknBtnBDC3C7Regular28";
                   		this.view.btnToday.focusSkin = "konympdprsknBtnBDC3C7Regular28";
            		}
              		this.view.segDate.setDataAt(month,0,disableDateIndex);
                  	this.segmentData = this.view.segDate.data;
            		this.view.forceLayout();
                }
              	else{
                  	throw {
                      	type : "Explicit",
                      	message : "Invalid Date format entered to disable"
                    };
                }
              	konymp.logger.info("Exiting disableDate function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	if(e.type === "Explicit"){
                  throw e;
                }
            }
        },
      
      	/**
		 * @function disableDays
		 * @scope private
         * @param dayToDisable {string}
		 * @description this function is invoked to disable a particular weekday throughout the calendar.
		*/
      	disableDays : function(dayToDisable){
          	try{
              	konymp.logger.info("Entered disableDays function of component", konymp.logger.FUNCTION_ENTRY);
          		konymp.logger.info("Parameter dayToDisable is: "+dayToDisable);
              	if(this.segmentData === undefined){
            		this.renderCalendar();
            	}
          		this["_enable"+this.getFullDay[dayToDisable]+"s"] = false;
          		var len = this.segmentData.length;
          		var dataToSet = [];
          		for(var i = 0; i < len; i++){
            	  	var monthData = this.calendarData[i].calendarDATA;
                  	var month = {};
            	  	for(var j = 0; j < 42; j++){
            	    	var weekday = monthData[j].LABEL.Date.split(" ")[0];
            	        if(! this["_enable"+this.getFullDay[weekday]+"s"]){
            	           	this.calendarData[i].calendarDATA[j].LABEL.isEnabled = false;
            	        }
            	        if(this.calendarData[i].calendarDATA[j].LABEL.isEnabled){
                	       	month["lbl"+(j+1)] = monthData[j].LABEL.isMothDay ? {"text": monthData[j].LABEL.Day, "skin": "konympdprsknLbl2C3E50px34"}:"";
                    	   	month["flx"+(j+1)] = monthData[j].LABEL.isMothDay ? {"onClick": this.onClickFlex, "width": "12.25%", "height": "21.68%"}:"";
                    	}
                    	else{
                      		month["lbl"+(j+1)] = monthData[j].LABEL.isMothDay ? {"text": monthData[j].LABEL.Day, "skin": "konympdprsknLblBDC3C7Medium34"}:"";
                       		month["flx"+(j+1)] = monthData[j].LABEL.isMothDay ? {"width": "12.25%", "height": "21.68%"}:"";
                    	}
                	}
              		this.view.segDate.setDataAt(month, 0 , i);
              		this.view.forceLayout();
            	}
          		this.segmentData = this.view.segDate.data;
              	if(this._disabledDates.length !== 0){
					this.disableDates();
                }
              	if(this._defaultFromDate !== ""){
                  	this.setDefaultFromDate(this._defaultFromDate);
                  	if(this._defaultToDate !== ""){
                  		this.setDefaultToDate(this._defaultToDate);
                	}
                }
              	else{
                  	this.highlightToday();
                }
              	konymp.logger.info("Exiting disableDays function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
				konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        },
      
      	/**
		 * @function disableDates
		 * @scope private
		 * @description this function is invoked to disable dates even if new calendar is generated.
		*/
      	disableDates : function(){
          	try{
              	konymp.logger.info("Entered disableDates function of component", konymp.logger.FUNCTION_ENTRY);
          		for(var i = 0; i < this._disabledDates.length; i++){
            	  	var month = {};
            	  	var disableDateMonth = Number(this._disabledDates[i].split("/")[0]) - 1;
            	  	var disableDate = Number(this._disabledDates[i].split("/")[1]);
            	    var disableDateYear = Number(this._disabledDates[i].split("/")[2]);
            	  	var yearDiff = disableDateYear - (this._calendarStartYear + 1);
        			var defaultMonths = 11 - this._calendarStartMonth;
					var disableDateIndex = (yearDiff * 12) + disableDateMonth + defaultMonths + 1;
                  	var segmentLength = this.segmentData.length;
                  	if(disableDateIndex < 0 || disableDateIndex > (segmentLength-1)){
                      	throw {
                          	type : "Explicit",
                          	message : "The date entered to disable is not in the Calendar range"
                        };
                    }
            	    var monthData = this.calendarData[disableDateIndex].calendarDATA;
            	    month = this.segmentData[disableDateIndex][1][0];
        			var	monthYear = this.segmentData[disableDateIndex][0].lblMonthYear;
        			var nonDays = this.returnNonDays(disableDateIndex);
        			var disableDateID = nonDays + Number(disableDate);
                  	if(! this.calendarData[disableDateIndex].calendarDATA[disableDateID-1].LABEL.isMothDay){
                      	throw {
                          	type : "Explicit",
                          	message : "Invalid Date entered to disable"
                        };
                    }
        	        this.calendarData[disableDateIndex].calendarDATA[disableDateID - 1].LABEL.isEnabled = false;
        	        month["lbl"+(disableDateID)] = monthData[disableDateID-1].LABEL.isMothDay ? {"text": monthData[disableDateID-1].LABEL.Day, "skin": "konympdprsknLblBDC3C7Medium34"}:"";
        	        month["flx"+(disableDateID)] = monthData[disableDateID-1].LABEL.isMothDay ? {"width": "12.25%", "height": "21.68%"}:"";
        	        this.getTodayIndexAndID();
        	        if(this.todayID === disableDateID && this.todayIndex === disableDateIndex){
        	           	this.view.btnToday.skin = "konympdprsknBtnBDC3C7Regular28";
        	       		this.view.btnToday.focusSkin = "konympdprsknBtnBDC3C7Regular28";
            		}
              		this.view.segDate.setDataAt(month,0,disableDateIndex);
                	this.segmentData = this.view.segDate.data;
            		this.view.forceLayout();
            	}
              	konymp.logger.info("Exiting disableDates function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	if(e.type === "Explicit"){
                  	throw e;
                }
            }
        },
      
      	/**
		 * @function returnNonDays
		 * @scope private
         * @param index{number}
		 * @description this function returns number of days of previous month that fall in this calendar index.
		*/
      	returnNonDays : function(index){
          	try{
              	konymp.logger.info("Entered returnNonDays function of component", konymp.logger.FUNCTION_ENTRY);
          		var nonDays = 0;
          		for(i = 0; i < 42; i++){
        			if(!this.calendarData[index].calendarDATA[i].LABEL.isMothDay){
           				nonDays++;
         			}
         			else{
            			break;
          			}
        		}
              	konymp.logger.info("Exiting returnNonDays function of component", konymp.logger.FUNCTION_EXIT);
          		return nonDays;
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
				if(e.type === "Explicit"){
					throw e;
				}
			}
        }
	  	
	};
});