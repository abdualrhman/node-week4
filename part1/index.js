const http = require("http");

// The state
let state = 10; 

http.createServer((request, response) => {
	console.log(request.method, request.url);
	//response.write("Connected made ");

	console.log(state);
	

	if(request.url === '/') {
		response.write(`This is the webserver index with state on ${state}`);
		return response.end();
	} 

	// /state 
	// response: the current state in a html format 
	// when the server starts, this should return "10"
	//http://localhost:8080/state 
	else if(request.url === '/state') {
		//Really no need to JSON.stringify since it only wants a string to write but let's just go with that.
		//Since in the future we will be making JSON API.
		response.write(JSON.stringify(state));
		return response.end();
	} 

	// /add
	// Response: "ok" in html format
	// This should add 1 to the current state
	//http://localhost:8080/add
	else if(request.url === '/add') {
		state += 1;
		response.write(`ok`);
		return response.end();
	} 

	// /remove
	// Response: "ok" in html format
	// This should subtract 1 ƒrom the current state
	//http://localhost:8080/remove
	else if(request.url === '/remove') {
		state -= 1;
		response.write(`ok`);
		return response.end();
	}

	// /reset
	// Response: "ok" in html format
	// This should set the state back to 10
	//http://localhost:8080/reset
	else if(request.url === '/reset') {
		state = 10;
		response.write(`ok`);
		return response.end();
	} 

	// Any other URL
	// Response: return error code 404: Not found with a friendly message
	// and do not change the state variable
	//http://localhost:8080/subtract
	else {
		response.statusCode = 404;
		response.write("Command not found.");
		//return response.end();

	}

	response.end();

})
.listen(8080);