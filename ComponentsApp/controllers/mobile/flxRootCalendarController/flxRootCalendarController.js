define({ 
  //Type your controller code here 
  infoFlex:null,
  selectedItem:null,
  selectedRowIndex:null,
  lastSelectedItem:null,
  origninalLablelSkin:null,
  onItemClick:function(widget,context){
    var eventInfo=widget.info;
    if(eventInfo==null)return;
    var widgetId=widget.id;
    var lblId=widgetId.replace("flxItem","lblText");
    var selectedDate=widget[lblId].text;
    //alert(selectedDate);
    if(eventInfo.isEventAvailable===true){
      //Event is there for this date.
      var rowIndex=context.rowIndex;
      var sectionIndex=context.sectionIndex;
      var flexId=widget.id;
      if(this.lastSelectedItem!==null){
        if((this.lastSelectedItem.rowIndex==rowIndex)&&(this.lastSelectedItem.sectionIndex==sectionIndex)&&(this.lastSelectedItem.date==selectedDate)){
          this.hideEvent(this.lastSelectedItem);
          this.lastSelectedItem=null;
          return;
        }
        this.hideEvent(this.lastSelectedItem);
        this.lastSelectedItem=null;
      }
      
      this.showEvent(widget);
      this.lastSelectedItem={
        "rowIndex":rowIndex,
        "sectionIndex":sectionIndex,
        "widget":widget,
        "date":selectedDate
      }
    }else{
      //There is no event for this date.
      //Hide the displayed event if any.
      if(this.lastSelectedItem!==null){
        this.hideEvent(this.lastSelectedItem);
        this.lastSelectedItem=null;
      }

    }
  },
  showEvent:function(widget){
    var grandParent=widget.parent.parent;
    var id=widget.id;
    id=id.replace("flxItem","");
    this.origninalLablelSkin=widget["lblText"+id].skin;
    widget["lblText"+id].skin="sknLblSelected";
    grandParent["flxInfo"+id].setVisibility(true);//,this.showAnimationObject());
    grandParent.flxInfoRoot.setVisibility(true);
    this.view.forceLayout();
    grandParent.flxInfoRoot.animate(this.showAnimationObject(),{
      "duration": 0.2,
      "iterationCount": 1,
      "delay": 0,
      "fillMode": kony.anim.FORWARDS
    },{});
    grandParent["flxInfo"+id].animate(this.showAnimationObject(),{
      "duration": 0.2,
      "iterationCount": 1,
      "delay": 0,
      "fillMode": kony.anim.FORWARDS
    },{});
  },
  hideEvent:function(lastSelectedItem){
    var grandParent=lastSelectedItem.widget.parent.parent;
    var id=lastSelectedItem.widget.id;
    id=id.replace("flxItem","");
    lastSelectedItem.widget["lblText"+id].skin=this.origninalLablelSkin;
    grandParent["flxInfo"+id].setVisibility(false);//,this.hideAnimationObject());
    grandParent.flxInfoRoot.setVisibility(false);
    this.view.forceLayout();
    /*grandParent["flxInfo"+id].animate(this.hideAnimationObject(),{
      "duration": 0.2,
      "iterationCount": 1,
      "delay": 0,
      "fillMode": kony.anim.FORWARDS
    });//,this.hideAnimationObject());
    grandParent.flxInfoRoot.animate(this.hideAnimationObject(),{
      "duration": 0.3,
      "iterationCount": 1,
      "delay": 0,
      "fillMode": kony.anim.FORWARDS
    },{
      "animationStart":function(){
       // alert("animation start");
      },
      "animationEnd":function(){
        grandParent.flxInfoRoot.setVisibility(false);
        //this.view.forceLayout();
      }
    });*/
  },
  /*onItemClick3:function(widget,context){
    kony.print(widget);
    kony.print(context);
    var widgetId=widget.id;
    var lblId=widgetId.replace("flxItem","lblText");
    var selectedDate=widget[lblId].info;
    var segRowData=context.widgetInfo.selectedItems[0];
    var rowIndex=context.rowIndex;
    var sectionIndex=context.sectionIndex;
    var selectedRowData={
      "row_data":segRowData,
      "section_index":sectionIndex,
      "row_index":rowIndex,
      "date":selectedDate
    };
    this.executeOnParent("toggleEvent",selectedRowData);
  },
  onItemClick2:function(widget,context){
    var children=widget.widgets();
    var grandParent=widget.parent.parent;
    if(this.selectedItem===widget){
      //this.selectedItem.l
    }
    grandParent.flxInfo.lblDateInfo.text=children[0].info.toString();
    alert("date text: "+children[0].info.toString());
    this.toggleVisibility(grandParent.flxInfo,""+context.rowIndex);
  },*/
  /*toggleVisibility:function(flxInfo,rowIndex){
    
    if(flxInfo.isVisible===true){
      //info felx already opened
      flxInfo.setVisibility(false);
      this.infoFlex.setVisibility(false);
      this.infoFlex=null;
    }else{
      var size=Math.random()*100;
      flxInfo.height=size+"dp";
      flxInfo.setVisibility(true);
      if(this.infoFlex!==null){
        this.infoFlex.setVisibility(false);
      }
      this.infoFlex=flxInfo;
    }
    this.selectedRowIndex=rowIndex;
  },*/
  /*hideAnimationObject:function(){
    var transformProp1 = kony.ui.makeAffineTransform();
    transformProp1.scale(1, 0);
    var transformProp3 = kony.ui.makeAffineTransform();
    transformProp3.scale(1, 1);
    var animDefinitionOne = {
      0: {
        "anchorPoint": {
          "x": 0.5,
          "y": 0
        },
        "transform": transformProp3
      },
      100: {
        "anchorPoint": {
          "x": 0.5,
          "y": 0
        },
        "transform": transformProp1
      }
    };
    var animDefinition = kony.ui.createAnimation(animDefinitionOne);
    var animConfig = {
      "duration": 0.3,
      "iterationCount": 1,
      "delay": 0,
      "fillMode": kony.anim.FORWARDS
    };
    var finalAnimation = {
      definition: animDefinition,
      config: animConfig
    };
    return animDefinition;
  },*/
  showAnimationObject:function(){
    var transformProp1 = kony.ui.makeAffineTransform();
    transformProp1.scale(1, 0);
    var transformProp2 = kony.ui.makeAffineTransform();
    transformProp2.scale(1, 1);
    var animDefinitionOne = {
      0: {
        "anchorPoint": {
          "x": 0.5,
          "y": 0
        },
        "transform": transformProp1
      },
      100: {
        "anchorPoint": {
          "x": 0.5,
          "y": 0
        },
        "transform": transformProp2
      }
    };
    var animDefinition = kony.ui.createAnimation(animDefinitionOne);
    /*var animConfig = {
      "duration": 1,
      "iterationCount": 1,
      "delay": 0,
      "fillMode": kony.anim.FORWARDS
    };
    var finalAnimation = {
      definition: animDefinition,
      config: animConfig
    };*/
    return animDefinition;
  }
});