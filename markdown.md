Highlights

GET
/highlights
Get highlights for homepage

Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
 'http://64.227.188.3:4000/highlights' \
 -H 'accept: _/_'
Request URL
http://64.227.188.3:4000/highlights
Server response
Code Details
200
Response body
Download
{
"outreachAndEngagement": {
"event": {
"id": "6970c5479284195df347fe12",
"date": "2026-10-02",
"dayTime": "Monday, 10:00 AM - 12:00 PM",
"meetingType": "Webinar",
"desc": "Short summary of the event",
"details": {
"images": [
{
"image": "url-to-image.jpg",
"description": "Image description or alt text"
}
],
"date": "2026-10-02",
"content": "Full details about the event (long description, agenda, etc.)"
},
"active": true,
"createdAt": "2026-01-21T12:23:35.149Z",
"updatedAt": "2026-01-22T04:13:54.481Z"
},
"type": "upcoming",
"lastUpdated": "2026-02-16T06:07:25.357Z"
},
"newsletters": [
{
"id": "697866fff6ce4868c7c4c3de",
"title": "Analysis and action",
"subtitle": "",
"version": "",
"publishedDate": "2024-04-11T00:00:00.000Z",
"coverImage": "/assets/images\\newsletter-cover-sfsfsdf-1769498367015-j3z959fo.png",
"fileUrl": "/assets/pdf\\newsletter-pdf-sfsfsdf-1769498367015-zj3kmntv.pdf"
},
{
"id": "696f0a5f9e35f91d058864b6",
"title": "Analysis and actionddf",
"subtitle": "",
"version": "Volume 23",
"publishedDate": "2023-04-12T00:00:00.000Z",
"coverImage": "/assets/images\\newsletter-cover-analysis-and-action-1769498426206-ojujwwav.jpg",
"fileUrl": "/assets/pdf\\newsletter-pdf-analysis-and-action-1768884831344-vudb1ijp.pdf"
}
],
"inTheNews": [
{
"id": "69787954f6ce4868c7c4c3e1",
"image": "/assets/images\\media-coverage-cover-we-are-building--1769503060605-k61yzw9r.jpg",
"title": "We are building ",
"date": "2025-03-04",
"author": "By Lawrence Cardoza",
"link": "http://example.com/link/to/document",
"pdfFile": null,
"imageFile": null,
"active": true,
"createdAt": "2026-01-27T08:37:40.608Z",
"updatedAt": "2026-01-27T08:38:02.973Z"
},
{
"id": "696f18759802194cf684cec7",
"image": "/assets/images\\media-coverage-cover-infrastructure-development-in--1768888437424-oxkky7xc.png",
"title": "Infrastructure Development in Rural Areas",
"date": "2023/07/15",
"author": "The Economic Times",
"link": "",
"pdfFile": "/assets/pdf\\media-coverage-pdf-infrastructure-development-in--1769503209237-5exzwdia.pdf",
"imageFile": null,
"active": true,
"createdAt": "2026-01-20T05:53:57.464Z",
"updatedAt": "2026-01-27T08:40:09.241Z"
}
]
}
Response headers
access-control-allow-credentials: true
connection: keep-alive
content-length: 2016
content-type: application/json; charset=utf-8
date: Mon,16 Feb 2026 06:07:25 GMT
etag: W/"7e0-ZP/NzVXzr5qJBgtHRSuVTTzBy3Q"
keep-alive: timeout=5
vary: Origin
x-powered-by: Express
