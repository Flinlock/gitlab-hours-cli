/*
* Gitlab time tracking CLI utility
* Built by Tyson Roehrkasse
* A simple method for using the gitlab-time-tracker utility found at: https://www.npmjs.com/package/gitlab-time-tracker
* /

/*
* Takes in variables from the environment to use in the HTTP request.
* URL points to the RADDWS Gitlab
*/
const user = process.env.USER;
const token = process.env.PRIVATE_TOKEN;
const startDate = process.env.FROM;
const endDate = process.env.TO;
const url = 'https://git.raddws.com/api/v4/projects/?owned=false&membership=true&simple=true&private_token=' + token + '&sudo=' + user;

// This will be used to execute the GTT command in the terminal
const exec = require('child_process').exec;

// This will contain the gtt command that will be run in the terminal later
var gttQuery = "node_modules/.bin/gtt report ";

// Create HTTP object for running queries via HTTPS
const http = require('https');

/**
 * This gets called when we get a response back from the HTTP request
 */
callback = function(response) {
  var projectList = ''; // This will contain a string of all projects the user is associated with

  response.on('data', function (chunk) {
    result = JSON.parse(chunk); // Parse the results of the request into an object
  });

  // Now we build and run the GTT command in the current terminal window
  response.on('end', function () {
  	for (var key in result){
  		projectList = projectList + "\"" + result[key].path_with_namespace + "\" "; // Create string containing all projects
    }
    gttQuery = gttQuery + projectList + " --user=" + user + " --from=" + startDate + " --to=" + endDate; // Build the GTT command
    // Run the GTT command
    exec(gttQuery,function (err,stdout,stderr) {
    if (err) {
        console.log("\n"+stderr); // Just in case something goes haywire
    } else {
        console.log(stdout); // Prints the results of the command in the current terminal window
    }
});
  });
}

// Makes the HTTP request. If data is good the report will print after 5-10 seconds
http.request(url, callback).end();
