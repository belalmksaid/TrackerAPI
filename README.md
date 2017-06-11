TrackrBot
=========

Webserver

	-POST - createTrack
	
			-receives
			
				-URL
				
				-selector
				
				-currentValue
				
				-user (optional)
				
			-creates Tracker Object and unique ID
			
			-sends back unique ID
			
	-GET - getData
	
			-receives
			
				-uniqueID
				
			-sends back value
			

Scraper

	-query the db
	
	-get new value for each tracker object
	
	-update db
	

Chrome Extension

	-Determine selector
	
	-send data to webserver
	
	-query webserver for data frequently	
