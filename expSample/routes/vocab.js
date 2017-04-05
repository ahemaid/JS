var express = require('express')
var router = express.Router();
var rdfstore = require('rdfstore'),
fs = require('fs-extra');

///* Query result of Concept details. */

router.get("/", function(req, res){


	console.log(req.url);
	var str = req.url;
	var domain = [];
	var range = [];
	str = str.substring(5);
	str = '<' + str + '>'
	console.log(str);

	rdfstore.create(function(err, store) {
		var rdf = fs.readFileSync(
				'./routes/SingleVoc.ttl'
		).toString();
//		res.send(rdf);
		store.load('text/turtle', rdf, function(s, d) {
			titleNew = 'saecond';
			var query =
				`PREFIX owl: <http://www.w3.org/2002/07/owl#>
				PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       
				SELECT DISTINCT ?p ?o  WHERE {
				${str} ?p ?o  . 

				}` ;
			store.execute(query, function(success, results) {
				//console.log(results);
				titleNew = 'MobiVoc';
				console.log(results.length);
				console.log("after");

				console.log(str);
				var concept =str.substring(str.lastIndexOf("/")+1,str.lastIndexOf(">"));

				var result = '<p class="h1">'+concept+'<br/><br/></p><p style="font-size:20px"> Defintions:</p>';
				result +=
					" <div><table id='tableLiterals' class='definition-table' ";

				// changes here
				result +="<thead><tr>  <th>Property</th> <th>Value</th>  </tr> </thead><tbody>";
				//result +="<tr> <td> head is here </td> </tr>";

				// TODO store owlTpes in a vector to call them 

				// +++ results of DatatypeProperty
				for (var i = 0; i < results.length; i++) {
					result += "<tr>";
					
					var value = results[i].o.value;
					var  property = results[i].p.value;
					property = property.split("#").pop();
					if (property.includes("/"))
				    	 property = property.split("/").pop();

					if (property =="type")
						continue;
					else if (property =="domain")
					{domain.push(value);
					console.log(value);
					continue;}
					else  if (property =="range")
					{range.push(value);
					console.log(value);
					continue;}
					else 
					{
						//					if (object != "DatatypeProperty" | "Property" | "Class" | "ObjectProperty") {
//						object = "Individual";
//						}

						//var concept = uri.split("/").pop();
						//concept = concept.replace('#','');

						// result += "<td ><a href=\"test?id="+uri+"\" target=\"_top\"'>" +concept + "</a></td>";
						result += "<td class='td-style-left'>" + property+ "</td>";


						result += "<td class='td-style-right'>  " + value+ " 	 </td>";

						result += "</tr>";


					}




				}

//				/				result += "<p style=\"font-size:30px\"> Properties:</p><br/><br/>";



				result += "</tbody></table></div><p style=\"font-size:20px\"><br />Properties</p>"+
				"<div><table id=\"tableProperties\" class=\"definition-table\"><thead><tr>  <th>Values expexted to be one of these types </th>   </tr>"+
				"<tr><th>Property</th><th>Expected Type</th><th>Description</th>"+               
				"</tr></thead><tbody>";

				var domainTirm =[];
				for (var i in domain ){
					
					domainTirm[i]	=domain[i].split("/").pop();

					//result += '<tr><td>'+ rangeTirm +'</td></tr>';
					result += "<td ><a href=\"vocab?id="+domain[i]+"\" target=\"_top\"'>" +domainTirm[i] + "</a></td>";

				}
				
				//result +='<tr><td>'+ domain +'</td></tr>';
				result +="</tbody></table></div> ";
				
				
//				result += "</tbody></table></div><p><br /><br />Properties</p>"+
//				"<div><table id=\"tableProperties\" class=\"definition-table\"><thead><tr>  <th>Values expexted to be one of these types </th>   </tr>"+
//				"<tr><th>Property</th><th>Expected Type</th><th>Description</th>"+               
//				"</tr></thead><tbody>";
//					result +='<tr><td><p id=\"demo\"></p></td></tr>';
//					console.log(domain);
//					result +='<script>document.getElementById(\"demo\").innerHTML = '+domain+';</script>';
//				result +='</tbody></table></div>';
				result += '<div><table id="tableLiterals" class="definition-table"  ><thead><tr>  <th>Used on these types</th></tr></thead><tbody>';

				var rangeTirm =[];
				for (var i in range ){
					
					rangeTirm[i]	=range[i].split("/").pop();

					//result += '<tr><td>'+ rangeTirm +'</td></tr>';
					result += "<td ><a href=\"vocab?id="+range[i]+"\" target=\"_top\"'>" +rangeTirm[i] + "</a></td>";

				}
				result += '</tbody></table></div>';

				//result += "</table><table><tr><td>Nafees</td></tr></table>";


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
