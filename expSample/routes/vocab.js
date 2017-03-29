var express = require('express')
var router = express.Router();
var rdfstore = require('rdfstore'),
  fs = require('fs-extra');

///* Query result of concept details. */

router.get("/", function(req, res){

   // res.send(req.url);


console.log(req.url);
var str = req.url;
str = str.substring(5);
str = '<' + str + '>'
console.log(str);

rdfstore.create(function(err, store) {
  var rdf = fs.readFileSync(
    './routes/SingleVoc.ttl'
  ).toString();

  store.load('text/turtle', rdf, function(s, d) {
    titleNew = 'saecond';
    var query =
      `PREFIX owl: <http://www.w3.org/2002/07/owl#>
       PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       
      SELECT DISTINCT ?p ?o  WHERE {
                 ${str} ?p ?o  . 
                 
                 }` ;
//
//    ?sClass a <http://www.w3.org/2002/07/owl#Class>.
//
//		  ?sObjectProperty a <http://www.w3.org/2002/07/owl#ObjectProperty>.

    store.execute(query, function(success, results) {
      //console.log(results);
      titleNew = 'MobiVoc';
      console.log(results.length);
      

    
        var result =
        " <table id='tableResult' class='table table-striped table-bordered' cellspacing='0'  border='5' width='100%'>";

      // changes here
        result +="<head><tr>  <th>Predicate</th> <th>Object</th>  </tr> </head>";
      //result +="<tr> <td> head is here </td> </tr>";
              
      // TODO store owlTpes in a vector to call them 
      
      // +++ results of DatatypeProperty
        for (var i = 0; i < results.length; i++) {
        result += "<tr>";

        var object = results[i].o.value;
        var  predicate = results[i].p.value;
//        object = object.split("#").pop();
//        
//        if (object != "DatatypeProperty" | "Property" | "Class" | "ObjectProperty") {
//      	  object = "Individual";
//      	}
        
        //var concept = uri.split("/").pop();
        //concept = concept.replace('#','');
//
       // result += "<td ><a href=\"test?id="+uri+"\" target=\"_top\"'>" +concept + "</a></td>";
        result += "<td>" + predicate+ "</td>";

        
        result += "<td>  " + object+ " 	 </td>";

        result += "</tr>";
        
        
        //result += "<tr><td><div id=\"divDetails\" colspan=\"100\"> hsdlfksd;klfjkldj f</div></td></tr>";
      
            
         
         
         
//      // Get the leaderName(s) of the 10 cities 
//         var query2 =
//      	   "PREFIX owl: <http://www.w3.org/2002/07/owl#>"+
//             "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"+       
//             "SELECT DISTINCT ?p   WHERE {"+
//             " ?uri ?p ?o."+
//             " }" ; 
//                 
//             store.execute(query2, function(success, results2) {
//             //console.log(results1);
//             titleNew = 'MobiVoc2';
//             console.log(results2.length);
//             for ( i = 0; i < results.length; i++) {
//             var object = results2[i].p.value;
//             result += "<tr><td><div  >"+object+" f</div></td></tr>";
//             }
//         });
//
       }
      result += "</table>";
      
      
      /////////////////////////////
 
      
      ///////////////////////////////
   
      //console.log(result);

/////////////////////////////
 
      
      ///////////////////////////////
   
      //console.log(result);

       
    titleNew = titleNew;
    res.render('index', {
      title: titleNew,
      resultTable: result
    });
    
    });
    
  //console.log(err);
  });

  });
  });

module.exports = router;
