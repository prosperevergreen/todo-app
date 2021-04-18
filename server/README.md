# Server

The server runs on **http://localhost:5000** and provides the api endpoint for a todo app though its **api/** endpoints.

# User Endpoint

The server provides an endpoint to **LOGIN** user and **REGISTER** new user. This two end points provide means of generating **TOKEN** required to access other resources provided by the server.
By default, the server creates [default users](./database/defaultData.js).

## CREATE OR REGISTER USER ENDPOINT

To register a new user, the client should make a `POST` request to http://localhost:5000/api/auth with the authorization header containing the email and password of the user in the format `Basic email:password`

### EXAMPLE REQUEST

METHOD: `POST`  
ENDPOINT: `http://localhost:5000/api/auth`  
REQUEST-HEADER: `"Authorization" : "Basic email:password"`  
**Note:** `"email:password"` must be encoded to **base-64** (e.g using btoa() as in JavaScript)

### EXAMPLE RESPONSE

```json
{
    "user": {
        "_id": "6078d1a072e3d9032896343a",
        "email": "user@email.com",
        "createdOn": "2021-04-15T23:52:00.891Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYxODUzMDcyMH0.oolsilUBXSpMAQLAu-t0fK-ahhWWN-d3LID7-yJHljA"
}
```

## LOGIN USER ENDPOINT

To login an existing user, the client should make a `GET` request to http://localhost:5000/api/auth with the authorization header containing the email and password of the user in the format `Basic email:password`

### EXAMPLE REQUEST

METHOD: `GET`  
ENDPOINT: `http://localhost:5000/api/auth`  
REQUEST-HEADER: `"Authorization" : "Basic email:password"`  
**Note:** `"email:password"` must be encoded to **base-64** (e.g using `btoa()` as in JavaScript)

### EXAMPLE RESPONSE

```json
{
    "user": {
        "_id": "6078d1a072e3d9032896343a",
        "email": "user@email.come",
        "createdOn": "2021-04-15T23:52:00.891Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYxODUzMDg5MX0.SCE2g3M7UXbHo3V--GIqQP0C6YQlQuXZnhSdzNMhxaM"
}
```

## GET ALL USERS (Only for admin or root user)

To **get** an array of all the users, the client should make a `GET` request to http://localhost:5000/api/user/ with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `GET`  
ENDPOINT: `http://localhost:5000/api/user`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

### EXAMPLE RESPONSE

```json
[
    {
        "_id": "6078f418582ec803162d61f7",
        "email": "test@email.com",
        "createdOn": "2021-04-16T02:19:04.649Z",
        "__v": 0
    },
    {
        "_id": "6078f418582ec803162d61f8",
        "email": "john@email.com",
        "createdOn": "2021-04-16T02:19:04.718Z",
        "__v": 0
    },
    {
        "_id": "6079587cd95aa313e5e0eba4",
        "email": "root@email.com",
        "createdOn": "2021-04-16T09:27:25.008Z",
        "__v": 0
    }
]
```

## RESET USERS (Only for admin or root user)

For easier testing, this endpoint was made to create delete and users and create a certain number of user with defined details. To reset the user collection, the client should make a `DELETE` request to http://localhost:5000/api/user with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `DELETE`  
ENDPOINT: `http://localhost:5000/api/user`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

### EXAMPLE RESPONSE

```javascript
[
	{
		_id: "6078f418582ec803162d61f7",
		email: "test@email.com",
		createdOn: "2021-04-16T02:19:04.649Z",
		__v: 0,
	},
	{
		_id: "6078f418582ec803162d61f8",
		email: "john@email.com",
		createdOn: "2021-04-16T02:19:04.718Z",
		__v: 0,
	},
	{
		_id: "6079587cd95aa313e5e0eba4",
		email: "root@email.com",
		createdOn: "2021-04-16T09:27:25.008Z",
		__v: 0,
	},
];
```

**Note:** These are the **only** registered users. There details could be used to login in order to get a **new token**.

## DELETE USER (Only for admin or root user)

To **delete** a user, the client should make a `DELETE` request to http://localhost:5000/api/user/:userId with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `DELETE`  
ENDPOINT: `http://localhost:5000/api/user/6079587cd95aa313e5e0eba4`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

### EXAMPLE RESPONSE

```json
{
    "_id": "6079587cd95aa313e5e0eba4",
    "email": "root@email.com",
    "createdOn": "2021-04-16T09:27:25.008Z",
    "__v": 0
}
```

# Category Endpoints

## ADD NEW CATEGORY ITEM

To add a new category of todos, the client should make a `POST` request to http://localhost:5000/api/category with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `POST`  
ENDPOINT: `http://localhost:5000/api/category`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
REQUEST-BODY:

```javascript
{
	"name": "education"
}
```

### EXAMPLE RESPONSE

```json
{
    "_id": "6078dc349fc739052344f8c6",
    "userId": "6078d1a072e3d9032896343a",
    "name": "education",
    "createdOn": "2021-04-16T00:37:08.741Z"
}
```

## GET ALL CATEGORY ITEMS FOR A USER

To get an array of all the categories for a user, the client should make a `GET` request to http://localhost:5000/api/category with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `GET`  
ENDPOINT: `http://localhost:5000/api/category/`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

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

## MODIFY CATEGORY ITEM

To modify a category, the client should make a `PUT` request to http://localhost:5000/api/category/:categoryId with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `PUT`  
ENDPOINT: `http://localhost:5000/api/category/6078dc349fc739052344f8c6`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

```json
{
	"name": "music"
}
```

### EXAMPLE RESPONSE

```json
{
    "_id": "6078dc349fc739052344f8c6",
    "userId": "6078d1a072e3d9032896343a",
    "name": "music",
    "createdOn": "2021-04-16T00:37:08.741Z"
}
```
**Note: Newly modified item is returned**

## DELETE CATEGORY ITEM

To **delete** a category, the client should make a `DELETE` request to http://localhost:5000/api/category/:categoryId with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `DELETE`  
ENDPOINT: `http://localhost:5000/api/category/6078dc349fc739052344f8c6`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

### EXAMPLE RESPONSE

```json
{
    "_id": "6078dc349fc739052344f8c6",
    "userId": "6078d1a072e3d9032896343a",
    "name": "music",
    "createdOn": "2021-04-16T00:37:08.741Z"
}
```

# Todo Endpoint

## ADD NEW TODO ITEM

To create a new todo item, the client should make a `POST` request to http://localhost:5000/api/todo with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `POST`  
ENDPOINT: `http://localhost:5000/api/todo`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
REQUEST-BODY:

```json
{
	"name": "clean the room",
    "categoryId": "60794051aea3f400c0354ecd"
}
```

### EXAMPLE RESPONSE

```json
{
    "done": false,
    "_id": "60794ff40d70520fe434c212",
    "name": "clean the room",
    "categoryId": "60794051aea3f400c0354ecd",
    "createdOn": "2021-04-16T08:51:00.215Z"
}
```

## GET ALL TODO ITEMS FOR CATEGORIES

To get an array of all todo items of a categories, the client should make a `GET` request to http://localhost:5000/api/todo/:categoryId with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `GET`  
ENDPOINT: `http://localhost:5000/api/todo/60794051aea3f400c0354ecd`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

### EXAMPLE RESPONSE

```javascript
[
	{
		done: false,
		_id: "60794fb60d70520fe434c211",
		name: "cook food",
		categoryId: "60794051aea3f400c0354ecd",
		createdOn: "2021-04-16T08:49:58.892Z",
	},
	{
		done: false,
		_id: "60794ff40d70520fe434c212",
		name: "clean the room",
		categoryId: "60794051aea3f400c0354ecd",
		createdOn: "2021-04-16T08:51:00.215Z",
	},
];
```

## MODIFY TODO ITEM

To modify a todo item, the client should make a `PUT` request to http://localhost:5000/api/todo/:todoId with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `PUT`  
ENDPOINT: `http://localhost:5000/api/todo/60794ff40d70520fe434c212`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

```json
{
	"name": "clean my room",
	"done": true
}
```

### EXAMPLE RESPONSE

```json
    {
        "done": true,
        "_id": "60794ff40d70520fe434c212",
        "name": "clean my room",
        "categoryId": "60794051aea3f400c0354ecd",
        "createdOn": "2021-04-16T08:51:00.215Z"
    }
```

**Note: Newly modified item is returned**

## DELETE TODO ITEM

To **delete** a todo item, the client should make a `DELETE` request to http://localhost:5000/api/todo/:todoId with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `DELETE`  
ENDPOINT: `http://localhost:5000/api/todo/60794ff40d70520fe434c212`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

### EXAMPLE RESPONSE

```json
{
    "done": true,
    "_id": "60794ff40d70520fe434c212",
    "name": "clean my room",
    "categoryId": "60794051aea3f400c0354ecd",
    "createdOn": "2021-04-16T08:51:00.215Z"
}
```
## DELETE ALL TODO ITEMS FOR CATEGORIES

To **DELETE** all todo items of a categories, the client should make a `DELETE` request to http://localhost:5000/api/todo/many/:categoryId with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`.

### EXAMPLE REQUEST

METHOD: `DELETE`  
ENDPOINT: `http://localhost:5000/api/todo/many/60794051aea3f400c0354ecd`  
REQUEST-HEADER: `"Authorization" : "Bearer token"`

### EXAMPLE RESPONSE

```javascript
[
	{
		done: false,
		_id: "60794fb60d70520fe434c211",
		name: "cook food",
		categoryId: "60794051aea3f400c0354ecd",
		createdOn: "2021-04-16T08:49:58.892Z",
	},
	{
		done: false,
		_id: "60794ff40d70520fe434c212",
		name: "clean the room",
		categoryId: "60794051aea3f400c0354ecd",
		createdOn: "2021-04-16T08:51:00.215Z",
	},
];
```

