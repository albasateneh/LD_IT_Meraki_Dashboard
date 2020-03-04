$(document).ready(function() {
  $("#button").on("click", function() {
   $.get("/api/data", function(data) {
  data.forEach(function(res) {
    var devices = res
   console.log(devices[3])
     var listItem = $("<li class='list-group-item mt-4'>");

     listItem.append(
      $("<h3>").text(res[2].name),
      $("<hr>"),

      $("<li>").text("Interface: " + res[0].interface, ",", "Status: " + res[0].status, ",", "Public IP: " +  res[0].publicIp),
      $("<li>").text("Status: " + res[0].status),
      $("<li>").text("Public IP: " +  res[0].publicIp),
      $("<li>").text("Using Static: " + res[0].usingStaticIp),
      $("<hr>"),
      $("<li>").text("Interface: " + res[1].interface, ",", "Status: " + res[0].status, ",", "Public IP: " +  res[0].publicIp),
      $("<li>").text("Status: " + res[1].status),
      $("<li>").text("Public IP: " +  res[1].publicIp),
      $("<li>").text("Using Static: " + res[1].usingStaticIp),
      $("<hr>"),
      $("<li>").text("Device name: " + devices[3][0].description),
      $("<li>").text("IP " + devices[3][0].ip),
      $("<li>").text("Status " + devices[3][0].status)
      
      

     );
        $("#body").append(listItem)

   
    })
  })

 
      
     
   })
  })
