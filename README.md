# HashStorage
a hash storage in typescript that behave like localstorage

## Installation
### via nodejs
```node
npm install --save hashstorage
```

## Types of store
* StorageHash   : as a JSON string
* Storage64     : json encoded64 string
* StorageParams : as a list of key=param 

## Imports
### Scripts
```javascript
<script src="node_modules/hashstorage/dist/bundles/hashstorage.umd.min.js"></script>
<script>
  var storage = new hashstorage.HashStorage(new hashStorage.StorageHash());
</script>
```
### Require
```javascript
var hashstorage = require("hashstorage");
var storage = new hashstorage.HashStorage(new hashStorage.StorageHash());
```
### Import
```javascript
import {HashStorage, StorageHash} from 'hashstorage';
var storage = new HashStorage(new StorageHash());
```

## Usage
```javascript
//set an item with a key, if the item already exist overwrite it
storage.setItem(key, value);

//get value of an item, if the item does not exist return null
var value = storage.getItem(key);

//remove an item with a key, if the item does not exist do nothing
storage.removeItem(key);

//clear the storage
storage.clear();

//listen to the event of the hash change
//if you listen to window.addEventListener("hashchange", function () { ... }); the value will not be yet parsed
storage.hashChanged.subscribe(function(){
  //do something here
});
```
