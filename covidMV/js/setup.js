function num_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

//slider changes

function ready(error, us) {
    if (error) throw error;
    $( "#alertdiv" ).hide();


    var slider = document.querySelector('input[type="range"]');
   
    slider.addEventListener('change', function() {
    change_move(); //movement.js
    });

    makeMap(us); //map.js

    
}