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
        "createdOn": "2021-04-15T23:52:00.891Z",
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
        "createdOn": "2021-04-15T23:52:00.891Z",
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
	"name": "education"
}
```

### EXAMPLE RESPONSE

```javascript
{
    "_id": "6078dc349fc739052344f8c6",
    "userId": "6078d1a072e3d9032896343a",
    "name": "education",
    "createdOn": "2021-04-16T00:37:08.741Z"
}
```

## GET ALL CATEGORIES FOR A USER

To get an array of all the categories for a user, the client should make a `GET` request to http://localhost:5000/api/category/:userId with the authorisation header containing the token generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `GET`  
ENDPOINT: `http://localhost:5000/api/category/`  
REQUEST-HEADER: `"Authorisation" : "Bearer token"`  

### EXAMPLE RESPONSE

```javascript
[
	{
		_id: "6078dc349fc739052344f8c6",
		userId: "6078d1a072e3d9032896343a",
		name: "education",
		createdOn: "2021-04-16T00:37:08.741Z",
	},
	{
		_id: "6078dc349fc739052344f8c6",
		userId: "6078d1a072e3d9032896343a",
		name: "music",
		createdOn: "2021-04-16T00:42:18.741Z",
	},
];
```

## MODIFY CATEGORY

To modify a category, the client should make a `PUT` request to http://localhost:5000/api/category/:categoryId with the authorisation header containing the token generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `PUT`  
ENDPOINT: `http://localhost:5000/api/category/6078dc349fc739052344f8c6`  
REQUEST-HEADER: `"Authorisation" : "Bearer token"`  

```javascript
{
	"name": "music"
}
```

### EXAMPLE RESPONSE

```javascript
{
    "_id": "6078dc349fc739052344f8c6",
    "userId": "6078d1a072e3d9032896343a",
    "name": "education",
    "createdOn": "2021-04-16T00:37:08.741Z"
}
```
**Note: Old value is returned**

## DELETE CATEGORY

To delete a category, the client should make a `DELETE` request to http://localhost:5000/api/category/:categoryId with the authorisation header containing the token generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `DELETE`  
ENDPOINT: `http://localhost:5000/api/category/6078dc349fc739052344f8c6`  
REQUEST-HEADER: `"Authorisation" : "Bearer token"`  

### EXAMPLE RESPONSE

```javascript
{
    "_id": "6078dc349fc739052344f8c6",
    "userId": "6078d1a072e3d9032896343a",
    "name": "music",
    "createdOn": "2021-04-16T00:37:08.741Z"
}
```

## RESET USERS

To reset the user collection, the client should make a `DELETE` request to http://localhost:5000/api/user with the authorisation header containing the token generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `DELETE`  
ENDPOINT: `http://localhost:5000/api/user`  
REQUEST-HEADER: `"Authorisation" : "Bearer token"`  

### EXAMPLE RESPONSE

```javascript
[
    {
        "_id": "6078f418582ec803162d61f7",
        "username": "test",
        "createdOn": "2021-04-16T02:19:04.649Z",
        "__v": 0
    },
    {
        "_id": "6078f418582ec803162d61f8",
        "username": "john",
        "createdOn": "2021-04-16T02:19:04.718Z",
        "__v": 0
    },
    {
        "_id": "6078f418582ec803162d61f9",
        "username": "Jane",
        "createdOn": "2021-04-16T02:19:04.786Z",
        "__v": 0
    }
]
```

Note: This are the username of the registered user. The current user would need to login with the provided details

# Todo Endpoint

# User EndPoint
