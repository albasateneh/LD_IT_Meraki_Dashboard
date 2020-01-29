# Development Phases

* Server
* Routing
* API
* AJAX (GET & POST Requests)
* UI/UX
* Deployment

--------------------------------------------------------------------------------------------

## Phase I 

* Create very basic front end for dashboard.

* Create basic server

* Create variable(s) (array of objects) for holding the data

* Static directory
    
    * app.use(express.static("public"));

* API connection 

--------------------------------------------------------------------------------------------

## Phase II

* What data do we need to pull initially? 

    * Store Name
    * Appliance
    * WAN 1/2 + public IP
    * Appliance Status
    * usingStaticIP: boolean

* Create logic to pull data from different API endpoints and organize per store

--------------------------------------------------------------------------------------------

## Phase III

* Create a set of routes that then display this data as JSON. Users should be given JSON if they visit the appropriate page(s);

* $.post data to Meraki Data on Click

* Check data shows as JSON on appropriate page

--------------------------------------------------------------------------------------------

## Phase IV

* post data to page

* Design UI/UX

--------------------------------------------------------------------------------------------

## Phase V

* Firewall settings



