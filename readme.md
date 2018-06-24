# jsonapi-admin

[LIVE DEMO](http://www.blackbirdbits.com)

(beta) reactjs+redux frontend for [jsonapi](http://jsonapi.org)

## installation

```
git clone https://github.com/thomaxxl/jsonapi-admin
cd jsonapi-admin
npm install
npm start
```

## Configuration

Interface configuration is declared in [src/Config.js](src/Config.js)  

```javascript
const BaseUrl = 'http://thomaxxl.pythonanywhere.com'
```

and [src/Config.json](src/Config.json)

```javascript
{
  "Users": {
    "column": [
      {
        "text": "Name",
        "dataField": "name",
        "type": "text"
      },
      {
        "text": "Email",
        "dataField" : "email"
      },
      {
        "text": "Books",
        "dataField": "books",
        "type": "text",
        "formatter" : "toManyFormatter",
        "relationship" : "books",
        "editorRenderer" : "ToManyRelationshipEditor"
      }
    ],
    "actions": [
      "CreateAction",
      "EditAction",
      "DeleteAction",
      "CustomAction"
    ],
    "path": "/cases",
    "API": "Users",
    "API_TYPE": "User",
    "menu": "Users",
    "Title": "Users",
    "request_args" : { "include" : "books" }
  },
  "Books": {
    "column": [
      {
        "text": "Name",
        "dataField": "name",
        "type": "text",
        "placeholder": "Type name.",
        "sort": true,
        "formatter" : "imageNameFormatter"
      },
      {
        "text": "User",
        "dataField": "user_id",
        "type": "text",
        "formatter" : "toOneFormatter",
        "relationship" : "user",
        "editorRenderer" : "toOneEditor"
      }
    ],
    "actions": [
      "CreateAction",
      "EditAction",
      "DeleteAction",
      "InfoAction"
    ],
    "path": "/books",
    "API": "Books",
    "API_TYPE": "Book",
    "menu": "Books",
    "Title": "Books",
    "request_args" : { "include" : "user" }
  }
}
```
