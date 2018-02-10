import * as http from "http";
import * as fs from "fs";
// querystring is used to parse url parameters to an object
// also a core module
import * as qs from "querystring";
import express from "express";
import bodyParser from "body-parser";
import { Contact, ContactList } from"./ContactList.js";


let contacts = new ContactList("./src/contacts.json");
const port = 8080;

const app = express();
app.listen(port, () => {
	console.log(`Server started at port ${ port }`);
});

app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});

app.use("/public", express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



app.get("/", (req, res) => {
	// console.log("get 1");
	res.send("This is the webserver index.");
});

app.post("/contact", (req, res) => {
	// console.log("post 2");
	const obj = req.body;
	console.log(`Incoming user: ${ JSON.stringify(obj) }`);

	let contact;
	try{
		contact = new Contact(obj);
	}
	catch(err){
		return res.status(401).send(err);
	}

	return contacts.load()
	.then(() => {
		contacts.addContact(contact);
		contacts.save();
	})
	.then(() => {
		res.write(`Successfully saved contact: ${ contact.name }`);
		res.end();
	})
	.catch((err) => {
		res.status(500).send(err);
	})
});
app.get('/contacts', (req, res)=>{
	return contacts.load()
	.then(()=>{
		res.json(contacts.list)
	})
	.catch((err)=>{
		res
		.status(500)
		.send(err)
	})
})
app.get('/contacts/:id', (req, res) => {
	const id = req.params.id;
	return contacts.load()
	.then(() =>{
		res.json(contacts.list[id - 1]);
	})
	.catch(res.err);
});

app.get('/contact/:id/birthday', (req, res)=>{
		const id = req.params.id;
	return contacts.load()
	.then(()=>{
		let contact = new Contact(contacts.list[id-1])
		res.send(contact.birthday());
		let contacts1 = new ContactList("./src/contacts1.json");
		return contacts1.load()
		.then(()=>{
			contact.birthday()
			contacts1.addContact(contact)
			contacts1.save()
		})
		
	})
	.catch((err)=>{
		res
		.status(500)
		.send(err)
	})})
app.get('/contact/:id/cars' , (req , res) => {
	const id = req.params.id;
	return contacts.load()
	.then(()=>{
			res.json(contacts.list[id-1].cars);
	})
	.catch((err)=>{res.send(err)})
})


app.delete('/delete/:id', (req, res)=>{
	const id = req.params.id;
	return contacts.load()
	.then(() =>{
		return res.send(contacts.list.pop(id))
	})
	.catch((err)=>{
		res.send(err)
	})
})

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

import {Car}from './car.js'

let newCar = new Car({
	color : 'red',
	manufacturer: 'Ford',
	model : 'focus'

})

app.get('/car', (req, res)=>{
	res
	.status(200)
	.send(JSON.stringify(newCar))
})





