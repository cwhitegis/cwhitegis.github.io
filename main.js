require(["esri/Map",
         "esri/layers/FeatureLayer",
         "esri/PopupTemplate",
         "esri/config",
         "esri/widgets/Search",
         "esri/views/SceneView"
        ], (Map,FeatureLayer,PopupTemplate,esriConfig,Search,SceneView) => {

 const footRenderer = {
  type: 'simple',
  symbol:{
    type: "polygon-3d", 
    symbolLayers:[{
      type: "extrude",
      material:{
        color:"blue"
          },
        edges:{
          type:'solid',
          color: [50, 50, 50, .7],
          size: 1
          },
          size: 10
        }]
     }
 };

 const parcelRenderer = {
   type: 'simple',
      symbol:{
        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
        color: [ 51,51, 204, 0.9 ],
        style: "none",
        outline: {  // autocasts as new SimpleLineSymbol()
          color: "black",
          width: 1
      }
     }
 }

 const footprintLayer = new FeatureLayer({
  url:"https://services.arcgis.com/tNJpAOha4mODLkXz/arcgis/rest/services/Structures_Facilities/FeatureServer/0",
  renderer:footRenderer
 });
  
 const parcelLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/tNJpAOha4mODLkXz/arcgis/rest/services/Cadastral_2020/FeatureServer/1',
    renderer: parcelRenderer
  });
  
 var map = new Map({
   basemap: "topo",
   ground: "world-elevation",
   layers: [parcelLayer, footprintLayer]
 });
  
 var searchWidget = new Search({
   view: view
 });
  
 var view = new SceneView({
   container: "viewDiv",
   map: map,
   center: [-50,30]
 });
  
  view.when(function(){
    view.goTo({
      center: [-157.8581,21.3099],
      zoom: 15,
      heading: 0,
      tilt: 45
    })
  }).catch(function(err){
           console.error("Scene View Rejected", err)
           });
});