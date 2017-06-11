import urllib2
from lxml import etree
from pymongo import MongoClient

CLASS_SELECTORS = 3

client = MongoClient('localhost', 27017)
db = client.test

tracks = db.tracks

tracks = tracks.find()
tracks = list(tracks)

while True:
	for track in tracks:
		xpath_query = "/"
		selectors = track['selector']
		temp = len(selectors) - CLASS_SELECTORS

		for item in reversed(selectors):
			xpath_query += "/" + item['tag'].lower()
			if len(item['classes']) is not 0 and temp <= 0:
				xpath_query += '['
				for css_class in item['classes']:
					xpath_query += "contains(@class, '" + css_class + "') and "
				xpath_query = xpath_query[:-5]
				xpath_query += ']'
			temp = temp - 1;
		
		url = track['url']
		response = urllib2.urlopen(url)
		htmlparser = etree.HTMLParser()
		tree = etree.parse(response, htmlparser)
		score = tree.xpath(xpath_query)

		value = score[0].text
		db.tracks.update({'_id':track['_id']},{'$set':{'value': value}}); 
	print("finished updates")
