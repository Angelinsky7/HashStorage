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
<script src="node_modules/hashstorage/dist/bundles/hashstorage.min.umd.js"></script>
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
storage.setItem(key, value);
var value = storage.getItem(key);
storage.removeItem(key);
storage.clear();
storage.hashChanged.subscribe(function(){
  //do something here
});
```
