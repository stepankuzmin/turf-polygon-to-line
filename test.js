var test = require('tape');
var polygonToLine = require('./');

test('polygonToLine', function (t) {

  var polygon = {
    "type": "Polygon",
    "coordinates":  [[[175,70],[175,72],[-175,72],[-175,70],[175,70]]]
  };

  var multiPolygon = {
    "type": "MultiPolygon",
    "coordinates": [[[[175,70],[175,72],[-175,72],[-175,70],[175,70]]],[[[165,70],[165,72],[-165,72],[-165,70],[165,70]]]]
  };

  t.deepEqual(polygonToLine(polygon),
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry":
            {
              "type": "LineString",
              "coordinates": [[175,70],[175,72],[-175,72],[-175,70],[175,70]]
            }
        }
      ]
    }, 'Polygon to LineString');

  t.deepEqual(polygonToLine(multiPolygon),
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry":
            {
              "type": "LineString",
              "coordinates": [[175,70],[175,72],[-175,72],[-175,70],[175,70]]
            }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry":
            {
              "type": "LineString",
              "coordinates": [[165,70],[165,72],[-165,72],[-165,70],[165,70]]
            }
        }
      ]
    }, 'MultiPolygon to LineString');

  t.deepEqual(polygon, polygon, 'Polygon remained unchanged');
  t.deepEqual(multiPolygon, multiPolygon, 'MultiPolygon remained unchanged');

  t.end();
});