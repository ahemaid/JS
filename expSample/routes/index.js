var express = require('express');
var router = express.Router();
var rdfstore = require('rdfstore'),
fs = require('fs-extra');

/* GET home page. */

router.get('/', function(req, res) {

	console.log(req);
	console.log('test -');
	var titleNew = 'first';
	rdfstore.create(function(err, store) {
		var rdf = fs.readFileSync(
				'./routes/SingleVoc.ttl'
		).toString();
		titleNew = 'second';
		store.load('text/turtle', rdf, function(s, d) {
			titleNew = 'saecond';
			var query =
				`PREFIX owl: <http://www.w3.org/2002/07/owl#>
				PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       
				SELECT DISTINCT ?s ?o  WHERE {
				?s a ?o.

				} ORDER BY  ?s`;

			store.execute(query, function(success, results) {
				console.log(results);
				titleNew = 'MobiVoc';
				console.log(results.length);
				
				fs.writeFile("/tmp/test", "Hey there!", function(results) {
				    if(results) {
				        return console.log(results);
				    }
				    console.log("The file was saved!");
				}); 

//				var data = [];
//				var len = results.length;
//				for (var i = 0; i < len; i++) {
//					data.push({
//						key: results[i].label,
//						sortable: true,
//						resizeable: true
//					});
//				}


				var result =
					" <table id='tableResult' class='table table-striped table-bordered' cellspacing='0'  border='5' width='100%'>";

				result +="<thead><tr>  <th>Concept</th>  <th>Type</th>  <th>URI</th> </tr> </thead><tbody>";

				for (var i = 0; i < results.length; i++) {
					result += "<tr>";

					var uri = results[i].s.value;
					var concept = uri.split("/").pop();
					concept = concept.replace('#','');
//					if (concept.includes("node"))
//						continue;
					var object = results[i].o.value;
					object = object.split("#").pop();
                    // check type of the object 
//					if (object !=Property || object !=ObjectProperty|| object !=DatatypeProperty|| object !=Property)

					switch(object) {
				    case "Property":
				        break;
				    case "ObjectProperty":
				    	object = "Object Property ";
				    	break;
				    case "DatatypeProperty":
				    	object = "Datatype Property ";
				    	break;
				    case "Class":
				    	break;
				    default:
				    	var string = object.split("/").pop();
				    	object = "Individual:{";
				        object += string;
				    	object += "}";
				}
					

//					// check if concept is a blacknode or rempty string 
//					if (concept.includes("node")||concept.includes("way")||concept=="")
//					{
//					continue;
//					}

					result += "<td ><a href=\"vocab?id="+uri+"\" target=\"_top\"'>" +concept + "</a></td>";
					result += "<td>  " + object+ " 	 </td>";

					result += "<td>" + uri+ "</td>";
					result += "</tr>";

				}
				result += "</tbody></table>";

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
