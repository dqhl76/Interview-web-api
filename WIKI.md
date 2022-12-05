## POST /register

### Request
```
POST {{url}}/register
Content-Type: application/json

{
  "email": "user2@qq.com",
  "password": "123456"
} 
```

### Result
#### success

```

{
  "success": true,
  "data": {
    "email": "user3@qq.com",
    "password": "$2a$10$DTZpgRD5uwVxFEyP522sQuM9H4ZGMC6vaHTa2.qqXtoGgs0jyAvnC",
    "_id": "638d89ea8c58aabeaba4625c",
    "__v": 0
  }
}
```
#### wrong
```
(422 code)
{
  "success": false,
  "message": "Invalid email"
}

(422 code)
{
  "success": false,
  "data": "User already exists"
}

```

## POST /login

### Request
```
POST {{url}}/login
Content-Type: application/json

{
  "email": "user1@qq.com",
  "password": "123456"
}
```

### Result
#### success

```
{
  "success": true,
  "data": {
    "_id": "638d84623b0ea1d970ac37d0",
    "email": "user1@qq.com",
    "password": "$2a$10$Y128gayisZfKYSOgYNrd2..i8ZwaCVXVTNouxNEedGovIVKEmZSA2",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGQ4NDYyM2IwZWExZDk3MGFjMzdkMCIsImlhdCI6MTY3MDIyMDUxMH0.dfpRHOWAR6QftRNBRCsOe-E44zyOAKFjzQQKQJFwz5g"
}
```
#### wrong
```
{
  "success": false,
  "message": "Wrong email or password"
}
```

## POST /create_room

### Request
```
POST {{url}}/create_room
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "start": "2021-10-01T00:00:00.000Z",
  "duration": 10,
  "interviewed": "user2@qq.com"
}
```

### Result
#### success
```
{
  "success": true,
  "data": {
    "start": "2021-10-02T00:00:00.000Z",
    "duration": 30,
    "created_id": "638d84623b0ea1d970ac37d0",
    "interviewed_id": "638d84673b0ea1d970ac37d3",
    "room_id": "527186",
    "_id": "638d8b3ef776d1fa5fa7d74a",
    "__v": 0
  }
}
```

#### wrong
```
{
  "success": false,
  "message": "Wrong Token"
}
```

## GET /get_rooms

### Request

```
GET {{url}}/get_rooms
Content-Type: application/json
Authorization: Bearer {{token}}

```

### Result

```
{
  "success": true,
  "data": [
    {
      "start": "2021-10-01T00:00:00.000Z",
      "duration": 10,
      "room_id": "328109",
      "created_id": "638d84623b0ea1d970ac37d0",
      "interviewed_id": "638d84673b0ea1d970ac37d3",
      "created_email": "user1@qq.com",
      "interviewed_email": "user2@qq.com"
    },
    {
      "start": "2021-10-01T00:00:00.000Z",
      "duration": 10,
      "room_id": "875232",
      "created_id": "638d84623b0ea1d970ac37d0",
      "interviewed_id": "638d84673b0ea1d970ac37d3",
      "created_email": "user1@qq.com",
      "interviewed_email": "user2@qq.com"
    },
    {
      "start": "2021-10-02T00:00:00.000Z",
      "duration": 30,
      "room_id": "527186",
      "created_id": "638d84623b0ea1d970ac37d0",
      "interviewed_id": "638d84673b0ea1d970ac37d3",
      "created_email": "user1@qq.com",
      "interviewed_email": "user2@qq.com"
    }
  ],
  "len": 3
}
```