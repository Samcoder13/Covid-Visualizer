function handleQuery() { //index.html
    var query = $("#queriedCounty").val();
    $("#barchart").empty();
    
  
    var states_with_county = [];
   
    Object.keys(names_and_county_dict)
    .forEach(function eachKey(key) { 
      if (names_and_county_dict[key] == query.toLowerCase()) {
        states_with_county.push(key)
      }
      //key is fips
    });
  
    //states_with_county is an array of
    //agar multiple counties with same name exist in different states toh hame drop down milega
    if (states_with_county.length > 1) {
      $( "#alertdiv" ).hide();
      $( "#barchartdiv" ).show();
      addDropdown(states_with_county); //map.js
      //adddropdown is a function which lies in map.js
    }
    else {
      $("button#dropdown.dropbtn").hide();
      //see line 133 names_dict[names of county]-->corrosponds to the fips
      var fips_q = names_dict[query.toLowerCase()];
      
      //  cases_dict.set( d.fips, d.cases);
      //cases mein set kara to ab fips hai hamare paas uske corrosponding cases utha li hai 


      if (cases_dict.get(fips_q)) {
        
        highlight_single(fips_q);
        //ye highlight hoga then alert wale ko to hide as found it
        //then display kardenge bar graph by calling displayBar(fips)
        $( "#alertdiv" ).hide();
        $( "#barchartdiv" ).show();
        displayBar(fips_q);
      }
      else if (typeof(fips_q) == "undefined") {
        console.log('fips undef')
        $( "#alertdiv" ).show();
        $( "#alertdiv" ).html("County does not exist");     
      }
    }
}
  
function handleStateQuery() {  //index.html
    selected_state = $("#queriedState").val();
    var query = $("#queriedState").val();
    console.log(state_names_dict[toTitleCase(query)]);
    if (state_names_dict[toTitleCase(query)]) {
      $("#alertdiv").hide();
      $("#barchart").empty();
      $("#barchartdiv").show();
  
      makeDonut(toTitleCase(query), 320, 320);
    }
    else {
      $( "#barchartdiv" ).hide( "slow" );
      $( "#alertdiv" ).show();
      $( "#alertdiv" ).html("State does not exist");
    }
  }
  
//legend highlight
function highlight_move(cpi) {  
    var val = document.getElementById("myRange").value;
      svg.selectAll(".counties path")
        .style("opacity", function(d) {
          return in_move_range(cpi, d.id, val) ? 1.2 : 0.3
        })
        //BORDER
        .style("stroke", function(d) {
          return in_move_range(cpi, d.id, val) ? "white" : "transparent"
        });
}
  
function unhighlight() {
    selected_fips = null;
    console.log("testing");
    var val = document.getElementById("myRange").value;
      svg.selectAll(".counties path")
        .transition()
        .duration(500)
        .style("opacity", 0.95)
        .style("stroke", "transparent")
}

//county click or donut click
function highlight_single(county) {
    console.log(county);
    //yahan par county=fips hai

    var val = document.getElementById("myRange").value;
    
      console.log("map");
      // scalable vector graphics iski madad se jo queried county hai vo highlight hojati hai with black border or baaki sab ki opacity kam hojati hai transparency badh jaati hai 
      svg.selectAll(".counties path")
        .transition()
        .duration(500)
        .style("opacity", function(d) {
          return (county == d.id) ? 1.2 : 0.3
        })
        .style("stroke", function(d) {
          return county == d.id ? "black" : "transparent" //county border color black hoyega
        });
    console.log("done");
  }