let jsonmaps = [{
  jsonmap: 'Total_Incidents',
  jsonFile: './total_incidents_2018.geojson',
  layer: ''
}, {
  jsonmap: 'Home_Invasions',
  jsonFile: './home_invasions_2018.geojson',
  layer: ''
}, {
  jsonmap: 'Defensive_Use',
  jsonFile: './defensive_use_2018.geojson',
  layer: ''
}, {
  jsonmap: 'Unintentional',
  jsonFile: './unintentional_2018.geojson',
  layer: ''
}];

let map = L.map('mapid').setView([39.809, -98.564], 4);
let mapTiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlZHkiLCJhIjoiY2ppYjVpMHZoMGN4eTNwb2JoYWc3dThybCJ9.qxJkmKDDlBrAXYlpvIjfwg',{
          maxZoom: 18,
              attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.streets'
                    }).addTo(map);

function populateJsonmapDropdown(){
    $('#selectJsonmap').empty();
    $('#selectJsonmap').append($('<option></option>').val('Map subcategory').html('Map subcategory'));
    $.each(jsonmaps, function(i, p) {
      $('#selectJsonmap').append($('<option></option>').val(p.jsonmap).html(p.jsonmap));
    });
}

function resetMap() {
  map.eachLayer(function (layer){
    map.removeLayer(layer);
  });
  map.addLayer(mapTiles);
}

$("#selectJsonmap").change(function() {
      resetMap()
      var selectedParkZone = $("#selectJsonmap").val();
      for (var zone in jsonmaps){
        if(jsonmaps[zone].jsonmap === selectedParkZone){
          var jsonURL = jsonmaps[zone].jsonFile;
            $.getJSON(jsonURL, function(data) {
            function onEachFeature(feature, layer) {
            layer.bindPopup("Location: " + feature.properties.add_str + "<br>" +
                "Group: " + feature.properties.group);
                      }
        var geojson = L.geoJson(data, {
          onEachFeature: onEachFeature
        });
            geojson.addTo(map)
            })
        }
      }
});

$(document).ready(function() {
    populateJsonmapDropdown();
});
