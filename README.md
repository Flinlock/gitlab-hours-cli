# GITLAB-TIME-CLI

This is a node utility for tracking time spent on Gitlab projects on a per user basis, filtered by a date range.
It queries the Gitlab API to retrieve all projects for a user.
This information is then used to build and execute a [gitlab-time-tracker](https://www.npmjs.com/package/gitlab-time-tracker) command.

## Requirements
1. Node.js version >= 6
2. npm or yarn

## Installation

**npm:**  
npm install  

**yarn:**  
yarn install

**Get a Gitlab API token** 
If you don't already have one, grab your private token from Gitlab. 
This must be a private token with admin access. You may not use a personal access token since only the private token lets you make api request as another user.  

When install is complete the config file will open, add these lines and save it:   

```yaml
url: https://git.raddws.com/api/v4/  
token: #Put your token here#  
closed: true  
_checkToken: true  
```

## Installation Notes
This repository contains a config-template.yml file that you can use as a reference.

## Usage
Open a terminal and CD to the root directory of this project (where query.js is located).  
Run ``USER=username PRIVATE_TOKEN=token FROM='START_DATE' TO='END_DATE' node .``  

The start and end dates (FROM and TO) must use this syntax: YYYY-MM-DD  

That's it! Be patient, the application takes 5-15 seconds to run and then the time tracking data will be output in the terminal.

## Usage Notes
* This tool pulls tracking date up to, but NOT including the end date. So, if you want tracking data through 2017-10-22, your TO variable must be 2017-10-23.
* If the user has not entered any time spent information any projects in the date range, no results will be returned.