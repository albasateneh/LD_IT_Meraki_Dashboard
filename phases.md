# Development Phases

* Server
* Routing
* API
* Axios (GET & POST Requests)
* UI/UX Optional
* Automation
* Integrate with Azure
* Deployment

--------------------------------------------------------------------------------------------

## Phase I 

* [X] ~~*Create Folder Structure*~~ [2020-01-30]

* [X] ~~*Set up basic html routes*~~ [2020-01-30]

* [X] ~~*Create basic server*~~ [2020-01-30]

* [X] ~~*Create variable(s) (array of objects) for holding the data*~~ [2020-01-30]

* [X] ~~*Static directory*~~ [2020-01-30]
    
    * app.use(express.static("public"));

* [X] ~~*API connection*~~ [2020-01-30] 

* [X] ~~*.gitignore*~~ [2020-01-31]

* [X] ~~*Hide API Key*~~ [2020-01-31]

--------------------------------------------------------------------------------------------

## Phase II

* [X] ~~*What data do we need to pull initially?*~~ [2020-01-31] 

    * Store Name
    * WAN 1/2 + public IP
    * Appliance Status
    * usingStaticIP: boolean

* [X] ~~*Create logic to pull data from different API endpoints and organize per store*~~ [2020-02-20]
  
--------------------------------------------------------------------------------------------

## Phase III

* [X] ~~*Create a set of routes that then display this data as JSON. Users should be given JSON if they visit the appropriate page(s);*~~ [2020-02-20]

* [X] ~~*$.post data to Meraki Data*~~ [2020-02-20]

* [X] ~~*Check data shows as JSON on appropriate page*~~ [2020-02-20]

--------------------------------------------------------------------------------------------

## Phase IV *** Optional due to automation ***

* [X] ~~*Design UI/UX*~~ [2020-03-05]

* [X] ~~*post data to page*~~ [2020-03-05]
    * [ ] Offline devices by store by button click (changed to 1 button which displays all data)
    * [ ] Progress bar/notification of pending data
    * [X] ~~*Security appliance information*~~ [2020-03-05]
        * [X] ~~*WAN 1/ WAN 2 offline status*~~ [2020-03-05]

--------------------------------------------------------------------------------------------

## Phase V [Extra]

* [ ] Sort data in order by store
* [X] ~~*Re-pull data automatically every 15 minutes.*~~ [2020-03-05] 


--------------------------------------------------------------------------------------------

## Phase VI

* [ ] Automations





