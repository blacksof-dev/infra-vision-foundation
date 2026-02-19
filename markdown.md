GET
/knowledge/research-papers
Get all research papers

Retrieves a list of all research papers. This endpoint is public.

Parameters
Cancel
Name Description
page
number
(query)
Page number (starts from 1)

1
limit
number
(query)
Number of items per page

1
activeOnly
boolean
(query)
If true, returns only active research papers

true
sectorId
string
(query)
Filter research papers by sector ID

6989a8152f071952d791fa18
Execute
Clear
Responses
Curl

curl -X 'GET' \
 'http://64.227.188.3:4000/knowledge/research-papers?page=1&limit=1&activeOnly=true&sectorId=6989a8152f071952d791fa18' \
 -H 'accept: _/_'
Request URL
http://64.227.188.3:4000/knowledge/research-papers?page=1&limit=1&activeOnly=true&sectorId=6989a8152f071952d791fa18
Server response
Code Details
200
Response body
Download
{
"researchPapers": [
{
"id": "6989aa202f071952d791fa1e",
"image": "/assets/images/research-paper-img-ways-to-enhance-warehouse-base-1770629664552-xj6tit43.jpg",
"title": "Ways to enhance warehouse-based sales and lending for agriculture commodities",
"link": "/assets/pdf/research-paper-pdf-ways-to-enhance-warehouse-base-1770629664552-d2zpfl93.pdf",
"date": "2026-02-09T00:00:00.000Z",
"active": true,
"createdAt": "2026-02-09T09:34:24.557Z",
"updatedAt": "2026-02-09T09:41:12.448Z",
"sectorIds": [
"6989a8152f071952d791fa18"
]
}
],
"pagination": {
"totalCount": 3,
"page": 1,
"limit": 1,
"totalPages": 3
},
"lastUpdated": "2026-02-18T10:31:03.009Z"
}
