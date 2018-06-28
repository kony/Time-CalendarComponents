define(function () {

	var konyLoggerModule = require('com/konymp/timeline/konyLogger');
	var konytl = konytl || {};
	konytl.logger = new konyLoggerModule("Timeline") || function () {};

	return {
		constructor: function (baseConfig, layoutConfig, pspConfig) {
			this.currentRowIndex = 0;
			this._masterData = "";
			this._eventTitle = "";
			this.prevTime = "";
			this.prevDate = "";
		},
		initGettersSetters: function () {
			defineSetter(this, "masterdata", function (x) {
				this._masterData = x.data;
				this.setTimeLineList(this._masterData);
				konytl.logger.trace("_masterData is" + JSON.stringify(this._masterData));
			});
		},
		/**
		 * @function setData
		 * @param {JSON} dataToComp - Dynamic data required for the timeline
		 * @description - This function setTitle and timeline data
		 */
		setData: function (dataToComp) {
			var tempData = JSON.stringify(dataToComp);
			var data = JSON.parse(tempData);
			if (data.title === undefined && data.title === null) {
				konytl.logger.trace("Inside setData TimeLineController Title Not Set" + JSON.stringify(data));
				data.title = "";
			}
			konytl.logger.trace("Inside setData TimeLineController Calling SetTitle" + JSON.stringify(data));
			this.setTitle(data.title); //set title of the event

			if (data.timeLineList === undefined && data.timeLineList === null) {
				konytl.logger.trace("Inside setData TimeLineController timeLineList Not Set");
				return;
			}
			konytl.logger.trace("Inside setData TimeLineController Calling setTimeLineList");
			this.setTimeLineList(data.timeLineList); // set the time line
		},

		/**
		 * @function setData
		 * @param {String} title - title of the event
		 * @description - This function sets the title of the event
		 */
		setTitle: function (title) {
			konytl.logger.trace("Inside setTitle TimeLineController");
			this.view.lblTitle.text = title;
			konytl.logger.trace("End setTitle TimeLineController");
		},

		/**
		 * @function setTimeLineList
		 * @param {Array of JSON} timeLineList - array of timeline data
		 * @description - This function process the data and set the timeline data
		 */
		setTimeLineList(timeLineList) {
			konytl.logger.trace("Inside setTimeLineList TimeLineController" + JSON.stringify(timeLineList));
			var formattedDate;
			if (timeLineList.length === 0) {
				alert("There is no data to set to timeLine");
				return;
			}
			if (timeLineList[0].date !== undefined && timeLineList[0].date !== null && timeLineList[0].date !== "") {
				this.prevDate = this.getMonth(this.getFormattedDate(timeLineList[0].date));
				this.prevTime = this.getDay(this.getFormattedDate(timeLineList[0].date));
			} else {
				konytl.logger.trace("Something Went wrong with the data, Please check the date format and proceed");
				return;
			}

			for (var i = 0; i < timeLineList.length; i++) {
				timeLineList[i].defautValue = "default";
				if (timeLineList[i].date !== undefined && timeLineList[i].date !== null && timeLineList[i].date !== "") {
					formattedDate = this.getFormattedDate(timeLineList[i].date);
					if (this.getMonth(formattedDate) == this.prevDate && i !== 0) {
						timeLineList[i].formattedMonth = "";
						timeLineList = this.getTime(timeLineList, formattedDate, i);
					} else {
						timeLineList = this.getTime(timeLineList, formattedDate, i);
						this.prevDate = this.getMonth(formattedDate);
						timeLineList[i].formattedMonth = this.getMonth(formattedDate)
					}

				} else {
					timeLineList[i].fomattedday = "";
					timeLineList[i].formattedMonth = "";
				}
				if (timeLineList[i].name === undefined || timeLineList[i].name === null) {
					timeLineList[i].name = "";
				}
				if (timeLineList[i].desc === undefined || timeLineList[i].desc === null) {
					timeLineList[i].desc = {
						"isVisible": false
					};
				} else {
					if (timeLineList[i].desc.length > 121)
						timeLineList[i].desc = ((timeLineList[i].desc).slice(0, 120)) + "...";
					timeLineList[i].desc = {
						"isVisible": true,
						"text": timeLineList[i].desc
					};
				}
				if (timeLineList[i].sub1 === undefined || timeLineList[i].sub1 === null) {
					timeLineList[i].flxSub1 = {
						"isVisible": false
					};
				} else {
					timeLineList[i].flxSub1 = {
						"isVisible": true
					};
					timeLineList[i].sub1 = {
						"text": timeLineList[i].sub1
					};
					if (timeLineList[i].sub1icon !== undefined && timeLineList[i].sub1icon !== null && timeLineList[i].sub1icon !== "")
						timeLineList[i].imgSub1 = {
							"src": timeLineList[i].sub1icon,
							"isVisible": true
						};
					else
						timeLineList[i].imgSub1 = {
							"isVisible": false
						};
				}
				if (timeLineList[i].sub2 === undefined || timeLineList[i].sub2 === null) {
					timeLineList[i].flxSub2 = {
						"isVisible": false
					};
				} else {
					timeLineList[i].flxSub2 = {
						"isVisible": true
					};
					timeLineList[i].sub2 = {
						"text": timeLineList[i].sub2
					};
					if (timeLineList[i].sub2icon !== undefined && timeLineList[i].sub2icon !== null && timeLineList[i].sub2icon !== "")
						timeLineList[i].imgSub2 = {
							"src": timeLineList[i].sub2icon,
							"isVisible": true
						};
					else
						timeLineList[i].imgSub2 = {
							"isVisible": false
						};
				}

				if (timeLineList[i].thums !== undefined && timeLineList[i].thums !== null && timeLineList[i].thums.length > 0) {
					for (var j = 0; j < timeLineList[i].thums.length; j++) {
						var imageSource;
						if (timeLineList[i].thums[j] !== undefined && timeLineList[i].thums[j] !== null && timeLineList[i].thums[j] !== "") {
							for (var key in timeLineList[i].thums[j]) {
								imageSource = key;
							}
							switch (imageSource) {
							case "base64":
								if (j < 2) {
									timeLineList[i]["thumb" + (j + 1)] = {
										"base64": timeLineList[i].thums[j].base64
									};
									timeLineList[i]["flex" + (j + 1)] = {
										"isVisible": true
									};
								} else {
									timeLineList[i]["ExtraImageCountlbl"] = {
										"isVisible": true,
										"text": "+" + ((timeLineList[i].thums.length) - j)
									};
									break;
								}
								break;
							case "rawbytes":
								if (j < 2) {
									timeLineList[i]["thumb" + (j + 1)] = {
										"rawBytes": timeLineList[i].thums[j].rawbytes
									};
									timeLineList[i]["flex" + (j + 1)] = {
										"isVisible": true
									};
								} else {
									timeLineList[i]["ExtraImageCountlbl"] = {
										"isVisible": true,
										"text": "+" + ((timeLineList[i].thums.length) - j)
									};
									break;
								}
								break;
							default:
								if (j < 2) {
									timeLineList[i]["thumb" + (j + 1)] = {
										"src": timeLineList[i].thums[j].src
									};
									timeLineList[i]["flex" + (j + 1)] = {
										"isVisible": true
									};
								} else {
									timeLineList[i]["ExtraImageCountlbl"] = {
										"isVisible": true,
										"text": "+" + ((timeLineList[i].thums.length) - j)
									};
									break;
								}

							}

						}
					}
					konytl.logger.trace("Inside setTimeLineList TimeLineController Thumb Images are" + JSON.stringify(timeLineList));
				} else {
					timeLineList[i].isThumbsImagePresent = {
						"isVisible": false
					}
					konytl.logger.trace("Inside setTimeLineList TimeLineController thumnail image not set");
				}
			}
			this.setDataToSegment(timeLineList);
			konytl.logger.trace("End setTimeLineList TimeLineController");
		},
		/**
		 * @function getTime
		 * @param {Array of JSON} timeLineList - array of timeline data
		 * @param {String} formattedDate - date
		 * @param {Integer} i - current Iteration
		 * @description - This function process the data if there is any overriding events
		 */
		getTime: function (timeLineList, formattedDate, i) {
			if (this.getDay(formattedDate) == this.prevTime && i !== 0) {
				if (this.getMonth(formattedDate) == this.prevDate) {
					timeLineList[i].flexRoundCorner = {
						"isVisible": false
					};
					timeLineList[i].lblhorStr = {
						"isVisible": true,
						"text": "dummy"
					};

				} else {
					timeLineList[i].fomattedday = this.getDay(formattedDate);
					this.prevTime = timeLineList[i].fomattedday;
				}
			} else {
				timeLineList[i].fomattedday = this.getDay(formattedDate);
				this.prevTime = timeLineList[i].fomattedday;
			}
			return timeLineList;

		},

		/**
		 * @function setDataToSegment
		 * @param {Array of JSON} timeLineList - array of timeline data
		 * @description - This function set the data to segment
		 */
		setDataToSegment: function (data) {
			konytl.logger.trace("Start setDataToSegment TimeLineController");
			this.view.segTimeLine.removeAll();
			this.view.segTimeLine.widgetDataMap = {
				"lblVerticalstrip": "defautValue",
				"lblNum": "fomattedday",
				"lblStriphor": "defautValue",
				"lblDate": "formattedMonth",
				"lblName": "name",
				"lblDesc": "desc",
				"imgthumb1": "thumb1",
				"imgthumb2": "thumb2",
				"flexImage1": "flex1",
				"flexImage2": "flex2",
				"lblRem": "ExtraImageCountlbl",
				"flexRoundCorner": "flexRoundCorner",
				"lblhorStr": "lblhorStr",
				"flexMainThumbs": "isThumbsImagePresent",
				"lblSub1": "sub1",
				"lblSub2": "sub2",
				"imgSub1": "imgSub1",
				"imgSub2": "imgSub2",
				"flxSub1": "flxSub1",
				"flxSub2": "flxSub2"
			};
			this.view.segTimeLine.setData(data);
			konytl.logger.trace("End setDataToSegment TimeLineController");
		},
		/**
		 * @function getFormattedDate
		 * @param {String} date - unformatted date - YYYY-MM-DDTHH:MM
		 * @description - This function format the date to DD MMMTHH:MM
		 * return {string} - return formatted date of format - DD MMMTHH:MM
		 */
		getFormattedDate: function (unFormattedDate) {
			var months = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
			var dateArray = unFormattedDate.split("-");
			var formattedDate = (dateArray[2]).split("T")[0] + " " + months[Number(dateArray[1]) * 1];
			var time = unFormattedDate.split("T")[1];
			formattedDate = formattedDate + "T" + time;
			return formattedDate;
		},

		/**
		 * @function getDay
		 * @param {String} formattedDate - formatted date - DD MMMTHH:MM
		 * @description - This function return formattedTime
		 * return {string} - return formattedTime of format HH:MM
		 */
		getDay: function (formattedDate) {
			return formattedDate.split("T")[1];
		},

		/**
		 * @function getFormattedDate
		 * @param {String} formattedDate - formatted date - DD MMMTHH:MM
		 * @description - This function return formattedDate
		 * return {string} - return formatted date of format DD MMM
		 */
		getMonth: function (formattedDate) {
			return formattedDate.split("T")[0];
		},

		/**
		 * @function onClickOfDown
		 * @description - This function move to the lase event in the event list
		 */
		onClickOfDown: function () {
			this.view.btnDown.skin = "btndownactive";
			this.view.btnUp.skin = "btnupinactive";
			var lastRow = (this.view.segTimeLine.data.length) - 1;
			this.view.segTimeLine.selectedRowIndex = [0, lastRow];
		},

		/**
		 * @function onClickOfDown
		 * @description - This function move to the first event in the event list
		 */
		onClickOfUp: function () {
			this.view.btnDown.skin = "btndowninactive";
			this.view.btnUp.skin = "btnupactive";
			this.view.segTimeLine.selectedRowIndex = [0, 0];
		},

		/**
		 * @function onClickOfTimeline
		 * @description - This function will get the selected event gallery images and load it in
		a scroll view
		 */
		onClickOfTimeline: function () {
			var data = this.view.segTimeLine.selectedRowItems;
			var finalImageArray = [];
			if (data[0].largeImage !== undefined && data[0].largeImage !== null && data[0].largeImage !== "" && data[0].largeImage.length > 0) {
				for (var i = 0; i < data[0].largeImage.length; i++) {
					var imageSource = "";
					var imageData = {};
					for (var key in data[0].largeImage[i]) {
						imageSource = key;
					}
					switch (imageSource) {
					case "base64":
						imageData.imageSource = {
							"base64": data[0].largeImage[i].base64
						};
						finalImageArray.push(imageData);
						break;
					case "rawbytes":
						imageData.imageSource = {
							"rawBytes": data[0].largeImage[i].rawbytes
						};
						finalImageArray.push(imageData);
						break;
					default:
						imageData.imageSource = {
							"src": data[0].largeImage[i].src
						};
						finalImageArray.push(imageData);
					}

				}

				konytl.logger.trace("The Large Images are" + JSON.stringify(finalImageArray));
				this.view.segImageSet.widgetDataMap = {
					"imageStatus": "imageSource"
				};
				konytl.logger.trace("The Large Images afetr widget data map" + JSON.stringify(finalImageArray));
				try {
					this.view.segImageSet.setData(finalImageArray);
					konytl.logger.trace("The Large Images after set data" + JSON.stringify(data));
					this.view.lblNameDetail.text = data[0].name;
					this.view.txtComments.text = data[0].desc.text;
					this.view.FlexMainImageSet.isVisible = true;
				} catch (err) {
					alert("error" + err);
				}

			}
		},

		/**
		 * @function onClickChange
		 * @description - This function will change the selected row in a scroll view
		 */
		onClickChange: function () {
			if (this.currentRowIndex < (this.view.segImageSet.data.length) - 1) {
				this.currentRowIndex++;
				this.view.segImageSet.selectedRowIndex = [0, this.currentRowIndex];

			} else {
				this.currentRowIndex = 0;
				this.view.FlexMainImageSet.isVisible = false;
			}
		},
		/**
		 * @function onDeviceClickFormForm
		 * @description - This function will reset the timeline details to previos state
		 */
		onDeviceClickFormForm: function () {
			this.view.FlexMainImageSet.isVisible = false;
			this.currentRowIndex = 0;
		}
	};
});