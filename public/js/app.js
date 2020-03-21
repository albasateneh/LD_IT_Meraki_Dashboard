$(document).ready(function() {
  $("#button").on("click", function() {
  
    $.get("/api/data", function(data) {



  data.forEach(function(res, index) {
     var listItem = $("<li id = 'list-item' class='list-group-item mt-4'>");
 

  var button = $("<a class= 'btn btn-primary btn-lg clickMe' role='button' id = " + index + ">" )
     listItem.append(
      $("<h3>").text(res[2].name),
      $("<hr>"),

      $("<h5>").text(res[0].interface, ",", "Status: " + res[0].status, ",", "Public IP: " +  res[0].publicIp),
      $("<li>").text("Status: " + res[0].status),
      $("<li>").text("Public IP: " +  res[0].publicIp),
      $("<li>").text("Using Static: " + res[0].usingStaticIp),
      $("<hr>"),
      $("<h5>").text(res[1].interface, ",", "Status: " + res[0].status, ",", "Public IP: " +  res[0].publicIp),
      $("<li>").text("Status: " + res[1].status),
      $("<li>").text("Public IP: " +  res[1].publicIp),
      $("<li>").text("Using Static: " + res[1].usingStaticIp),
      $("<hr>"),
      
     
      
      

     );
     listItem.append(button)
        $("#body").append(listItem)

   
    })
    
  
    $(".clickMe").on("click", function() {
      var id = this.id
      data.forEach(function(res, index) {
        var num = index.toString()
       if(num === id) {
         res[3].forEach(function(res) {
           if (res.status === "Offline") {
             console.log(res.description + " " + "IP: " + res.ip + " " + "is Offline!!!")
             console.log("Last Seen " + res.lastSeen)
             console.log("-----------------------------------------")
             console.log("-----------------------------------------")
             console.log("-----------------------------------------")

           }
         })
       }
      })
    })
 
  })

 
      
     
   })


  })
