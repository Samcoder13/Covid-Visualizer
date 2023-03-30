
function makeMap(us) { //setup.js
    var val = document.getElementById("myRange").value;
    document.getElementById("week").innerHTML = weeks[val-1];
  
    var num_error_counties = 0;
  
    svg.append("g")
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
      .style("opacity", .95)
      .attr("fill", function(d) { 
        if (move_dict.get(d.id)) {
          return quantize(move_dict.get(d.id)[val-1])
        } else {
          num_error_counties += 1;
          return;
        }; })
        .attr("d", path)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .on("click", function(d) {handleClick(d.id)});
  
    window.onclick = function(event) {
      if (event.target.id === "maps")
        unhighlight();
    };
  
    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, 
          function(a, b) { return a !== b; }))
        .attr("class", "states")
        .attr("d", path);
  
    if (selected_fips != null)
      highlight_single(selected_fips);
  }
  
  
  
  
  function addDropdown(fips) {//query.js
    console.log("in dropdown", fips)
    $( ".dropbtn" ).show();
    $( ".dropdown" ).show();
    s = "";
    var valid = new Array(); 

    //or isse ham counties by number string bana lete hain
    for (i = 0; i < fips.length; i++) {
      if (cases_dict.get(fips[i])) {
        s += "<a href='#' id='county" + i + "'></a>"; //string for each county with id 
        valid.push(i);
      }
    }
    // console.log(valid);
    
    console.log(valid.length + "valid fipses");
    document.getElementsByClassName("dropdown-content")[0].innerHTML = s;
    var curr_fips, curr_state;
    
    for (i = 0; i < valid.length; i++) {
      curr_fips = fips[valid[i]];
      curr_state = states_dict.get(curr_fips);
      //for showing the dropdown uski corresponding "#county0#county1#county4"
      $("#county" + valid[i]).html(curr_state);
    }
  
    $(document).ready(function() {
      $("a").click(function(event) {
        $( ".dropdown" ).hide();
        targ = event.target.id;
        //taking target id
        console.log(fips[targ.slice(6)]);
        //then highlighted it
        fips_q = fips[targ.slice(6)];
        highlight_single(fips_q); //query.js
        displayBar(fips_q);  //bar.js
      })
    })
  }
