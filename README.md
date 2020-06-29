In order to get the REST API up and running, follow the following steps:

1. Clone the repository into your device.
2. Run "npm install" to install all the dependencies
3. Create a directory "Uploads" in the root directory of the project.
4. Run your local Mongo server by the command "mongod --dbpath= <path to the folder that stores the data>
5. Start the server by using the command "npm start". If you see the text, 
  "Server running
  Connected to Mongo Server",
  then your server is ready to take requests.
  The base url would be "http://localhost:3000/"
  
 If you don't you'll see the error in the logs. 

6.To add images, use the endpoint @POST "/api/image/add".
  This API takes the fields:
  { 
    "url":URL of the image (String),
    "name":name you want to refer to the image as (String)
  }
  This should add your new image in the database.
 
7. To view images, use the endpoint @GET "/api/image/fetch".
  Without any headers, this API will return all the images.
  
  If you want to find certain images by name,
  add the header "name": name of the image you want to find (String).
  This will return all the images having the name specified by you.
  
  The response of this API would be paginated and you will get a "currentPage" and a "totalPages" field in the response.
  If you want to view a particular page, add   "?page=x" (where x is the pagenumber you wish to see) to the url and you will be taken to the page. 
  The default limit of the pagination is 2. If you wish to change the limit, you can add "?limit=y" (y being the new limit), 
  then you'll see y objects per page.
  If you wish to change the limit to y and then view page x, use "?limit=y&page=x" at the end of your URL and the changes will be made
