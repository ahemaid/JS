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

//				var newResults = $.grep(results, function(n){ // just use arr
//				if (n.s.value !=""||n.s.value !="node"||n.s.value !="way")  
//				return n;
//				});


//				var newResults = results.filter (function(item){
//				// Write the filter criteria on item
//				// if true, then it won't be removed
//				if (item.s.value !=""||!(item.s.value.includes("node"))||!(item.s.value.includes("way")))
//				return results;
//				// if false, it will be copied to the newresults
//				});
//
//				results = results.filter(function(item){
//					if (item.s.value !=""||!(item.s.value.includes("node"))||!(item.s.value.includes("way")))
//						return item.s.value !== "node";
//				});
//
//				results = results.filter(function(item){
//					return item.s.value  !== "way";
//				});

				var result =
					" <table id='tableResult' class='table table-striped table-bordered' cellspacing='0'  border='5' width='100%'>";

				result +="<thead><tr>  <th>Concept</th>  <th>Type</th>  <th>URI</th> </tr> </thead><tbody>";
				var uri, concept;
				for (var i = 0; i < results.length; i++) {

					 uri = results[i].s.value;
					 concept = uri.split("/").pop();

					if (concept==""||concept.includes("node")||concept.includes("way"))
						continue;
					else
						{
						concept = uri.split("/").pop();
						concept = concept.replace('#','');
						result += "<tr>";

//						if (concept.includes("node"))
//						continue;
						var object = results[i].o.value;
						object = object.split("#").pop();
						// check type of the object 
//						if (object !=Property || object !=ObjectProperty|| object !=DatatypeProperty|| object !=Property)

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


//						// check if concept is a blacknode or rempty string 
//						if (concept.includes("node")||concept.includes("way")||concept=="")
//						{
//						continue;
//						}

						result += "<td ><a href=\"vocab?id="+uri+"\" target=\"_top\"'>" +concept + "</a></td>";
						result += "<td>  " + object+ " 	 </td>";

						result += "<td>" + uri+ "</td>";
						result += "</tr>";
						
						
						
						}


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
