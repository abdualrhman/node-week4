"use strict";

var _http = require("http");

var http = _interopRequireWildcard(_http);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _querystring = require("querystring");

var qs = _interopRequireWildcard(_querystring);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ContactList = require("./ContactList.js");

var _car = require("./car.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// querystring is used to parse url parameters to an object
// also a core module
var contacts = new _ContactList.ContactList("./src/contacts.json");
var port = 8080;

var app = (0, _express2.default)();
app.listen(port, function () {
	console.log("Server started at port " + port);
});

app.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.use("/public", _express2.default.static('public'));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get("/", function (req, res) {
	// console.log("get 1");
	res.send("This is the webserver index.");
});

app.post("/contact", function (req, res) {
	// console.log("post 2");
	var obj = req.body;
	console.log("Incoming user: " + JSON.stringify(obj));

	var contact = void 0;
	try {
		contact = new _ContactList.Contact(obj);
	} catch (err) {
		return res.status(401).send(err);
	}

	return contacts.load().then(function () {
		contacts.addContact(contact);
		contacts.save();
	}).then(function () {
		res.write("Successfully saved contact: " + contact.name);
		res.end();
	}).catch(function (err) {
		res.status(500).send(err);
	});
});
app.get('/contacts', function (req, res) {
	return contacts.load().then(function () {
		res.json(contacts.list);
	}).catch(function (err) {
		res.status(500).send(err);
	});
});
app.get('/contacts/:id', function (req, res) {
	var id = req.params.id;
	return contacts.load().then(function () {
		res.json(contacts.list[id - 1]);
	}).catch(res.err);
});

app.get('/contact/:id/birthday', function (req, res) {
	var id = req.params.id;
	return contacts.load().then(function () {
		var contact = new _ContactList.Contact(contacts.list[id - 1]);
		res.send(contact.birthday());
		var contacts1 = new _ContactList.ContactList("./src/contacts1.json");
		return contacts1.load().then(function () {
			contact.birthday();
			contacts1.addContact(contact);
			contacts1.save();
		});
	}).catch(function (err) {
		res.status(500).send(err);
	});
});
app.get('/contact/:id/cars', function (req, res) {
	var id = req.params.id;
	return contacts.load().then(function () {
		res.json(contacts.list[id - 1].cars);
	}).catch(function (err) {
		res.send(err);
	});
});

app.delete('/delete/:id', function (req, res) {
	var id = req.params.id;
	return contacts.load().then(function () {
		return res.send(contacts.list.pop(id));
	}).catch(function (err) {
		res.send(err);
	});
});

// app.delete('/delete/:id', (req, res)=>{
// 	const id = req.params.id;
// 	return contacts.load()
// 	.then(() =>{
// 		res.json(contacts.list[id - 1]);
// 	})
// 	.then(()=>{
// 		return res.send(contacts.list.pop(id))
// 	})
// 	.catch(res.err)
// })

///////////////////

var newCar = new _car.Car({
	color: 'red',
	manufacturer: 'Ford',
	model: 'focus'

});

app.get('/car', function (req, res) {
	res.status(200).send(JSON.stringify(newCar));
});
//# sourceMappingURL=index.js.map