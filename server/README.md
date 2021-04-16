# Server

The server runs on **http://localhost:5000** and provides the api endpoint for a todo app though its **api/** endpoints.

# Entry Endpoints

The server provides an endpoint to **LOGIN** user and **REGISTER** new user. This two end points provide means of generating **TOKEN** required to access other resources provided by the server.

## REGISTER ENDPOINT

To register a new user, the client should make a `POST` request to http://localhost:5000/api/auth with the authorisation header containing the username and password of the user in the format `Basic username:password`

### EXAMPLE REQUEST

METHOD: `POST`
ENDPOINT: `http://localhost:5000/api/auth`
REQUEST-HEADER: `"Authorisation" : "Basic username:password"`

**Note:** `"username:password"` must be encoded to **base-64** (e.g using btoa() as in JavaScript)

### EXAMPLE RESPONSE

```javascript
{
    "user": {
        "_id": "6078d1a072e3d9032896343a",
        "username": "username",
        "date": "2021-04-15T23:52:00.891Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYxODUzMDcyMH0.oolsilUBXSpMAQLAu-t0fK-ahhWWN-d3LID7-yJHljA"
}
```

## REGISTER ENDPOINT

To login an existing user, the client should make a `GET` request to http://localhost:5000/api/auth with the authorisation header containing the username and password of the user in the format `Basic username:password`

### EXAMPLE REQUEST

METHOD: `GET`
ENDPOINT: `http://localhost:5000/api/auth`
REQUEST-HEADER: `"Authorisation" : "Basic username:password"`

**Note:** `"username:password"` must be encoded to **base-64** (e.g using btoa() as in JavaScript)

### EXAMPLE RESPONSE

```javascript
{
    "user": {
        "_id": "6078d1a072e3d9032896343a",
        "username": "username",
        "date": "2021-04-15T23:52:00.891Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYxODUzMDg5MX0.SCE2g3M7UXbHo3V--GIqQP0C6YQlQuXZnhSdzNMhxaM"
}
```

# Category Endpoints

## ADD NEW CATEGORY

To add a new category of todos, the client should make a `POST` request to http://localhost:5000/api/category with the authorisation header containing the token generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `POST`
ENDPOINT: `http://localhost:5000/api/category`
REQUEST-HEADER: `"Authorisation" : "Bearer token"`
REQUEST-BODY:

```javascript
{
	"userId": "6078d1a072e3d9032896343a"
	"name": "education"
}
```

### EXAMPLE RESPONSE

```javascript
{
    "_id": "6078dc349fc739052344f8c6",
    "userId": "6078d1a072e3d9032896343a",
    "name": "education",
    "date": "2021-04-16T00:37:08.741Z"
}
```

## GET ALL CATEGORIES FOR A USER

To get an array of all the categories for a user, the client should make a `GET` request to http://localhost:5000/api/category/:userId with the authorisation header containing the token generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `GET`
ENDPOINT: `http://localhost:5000/api/category/6078d1a072e3d9032896343a`
REQUEST-HEADER: `"Authorisation" : "Bearer token"`

### EXAMPLE RESPONSE

```javascript
[
	{
		_id: "6078dc349fc739052344f8c6",
		userId: "6078d1a072e3d9032896343a",
		name: "education",
		date: "2021-04-16T00:37:08.741Z",
	},
	{
		_id: "6078dc349fc739052344f8c6",
		userId: "6078d1a072e3d9032896343a",
		name: "music",
		date: "2021-04-16T00:42:18.741Z",
	}
];
```

# Todo Endpoint

# User EndPoint
