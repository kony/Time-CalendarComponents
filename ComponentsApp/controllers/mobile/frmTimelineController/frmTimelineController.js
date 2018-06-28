define({ 

 //Type your controller code here 
  onNavigate:function(){
    this.view.timeline.masterdata =
{
	data:
	[
	{
	"date": "2017-02-01T3:30PM ",
	"desc": "Brief discussion on Quaterly product performance",
	"name": "Welcome Note",
	"sub1": "Alex sion",
           
	
	}, 
      {
	"date": "2017-02-01T04:00PM ",
	"desc": "Brief discussion on Quaterly product performance",
	"name": "Quaterly Product Report",
	"sub1": "Ben Cortez",
	
	}, 
     
      {
	"date": "2017-02-01T04:30PM ",
	"desc": "Brief discussion on Quaterly sales highlights",
	"name": "Quaterly Sales Report",
	"sub1": "DanMarous",
	
	}, 
      {
	"date": "2017-02-01T05:00PM ",
	"desc": "An insight into next quater's theme",
	"name": "Next Quarter Summary",
	"sub1": "Alex Sion",
	
	}, 
      
	]
}
    this.view.timeline.eventTitle = "All Hands Meeting";
      
  }

 });