Max we can add three cards in advocacy section
POST
/homepage/advocacy
Create a new advocacy card (Max 3)


Parameters
Try it out
No parameters

Request body

multipart/form-data
image *
string($binary)
Image for the advocacy card

label *
string
Label for the card (e.g. Infrakatha)

title *
string
Description/Title text for the card

ctaText *
string
Text for the call to action button

ctaLink *
string
URL for the call to action button

active
boolean
Whether the card is active

Responses
Code	Description	Links
201	
Created successfully

No links


GET
/homepage/advocacy
Get all advocacy cards

Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
 'http://localhost:4000/homepage/advocacy' \
 -H 'accept: _/_'
Request URL
http://localhost:4000/homepage/advocacy
Server response
Code Details
200
Response body
Download
[
{
"id": "6992e740ae2e7a64e9f02450",
"image": "/assets/images\\advocacy.png",
"label": " InfraPandit Awards",
"title": "A national effort at recognising outstanding doctoral research on infrastructure, fostering youth participation in India's infra evolution.",
"ctaText": "Know more",
"ctaLink": "https://theinfravisionfoundation.org/infrapandit-awards",
"active": true,
"createdAt": "2026-02-16T09:45:36.409Z",
"updatedAt": "2026-02-16T09:45:36.409Z"
},
{
"id": "6992ecbb8bb774eb0920412f",
"image": "/assets/images\\advocacy.png",
"label": " InfraPandit Awards",
"title": "A national effort at recognising outstanding doctoral research on infrastructure, fostering youth participation in India's infra evolution.",
"ctaText": "Know more",
"ctaLink": "https://theinfravisionfoundation.org/infrapandit-awards",
"active": true,
"createdAt": "2026-02-16T10:08:59.757Z",
"updatedAt": "2026-02-16T10:08:59.757Z"
},
{
"id": "6992ecbe8bb774eb09204130",
"image": "/assets/images\\advocacy.png",
"label": " InfraPandit Awards",
"title": "A national effort at recognising outstanding doctoral research on infrastructure, fostering youth participation in India's infra evolution.",
"ctaText": "Know more",
"ctaLink": "https://theinfravisionfoundation.org/infrapandit-awards",
"active": true,
"createdAt": "2026-02-16T10:09:02.902Z",
"updatedAt": "2026-02-16T10:09:02.902Z"
}
]
Response headers
access-control-allow-credentials: true
access-control-allow-origin: http://localhost:3000
content-length: 1306
content-type: application/json; charset=utf-8
date: Tue,17 Feb 2026 09:30:08 GMT
etag: W/"51a-0ga75nK4tlFK+omy5ce5MgkHG7Y"
vary: Origin
x-powered-by: Express
Responses
Code Description Links
200
Returns all advocacy cards

No links






PATCH
/homepage/advocacy/{id}
Update an advocacy card


Parameters
Try it out
Name	Description
id *
string
(path)
id
Request body

multipart/form-data
image
string($binary)
New image for the advocacy card (optional)

label
string
Label for the card

title
string
Description/Title text for the card

ctaText
string
Text for the call to action button

ctaLink
string
URL for the call to action button

active
boolean
Whether the card is active

Responses
Code	Description	Links
200	
Updated successfully

No links

DELETE
/homepage/advocacy/{id}
Delete an advocacy card


Parameters
Try it out
Name	Description
id *
string
(path)
id
Responses
Code	Description	Links
200	
Deleted successfully

No links
