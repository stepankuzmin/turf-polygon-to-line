var normalize         = require('turf-normalize')
var linestring        = require('turf-linestring')
var featurecollection = require('turf-featurecollection')

function flatten(array) {
  return [].concat.apply([], array)
}

function polygonToLineString(coordinates, properties) {
  return coordinates.map(function(coordinates) {
    return linestring(coordinates, properties)
  })
}

function multiPolygonToLineString(coordinates, properties) {
  return flatten(coordinates.map(function(coordinates) {
    return polygonToLineString(coordinates, properties)
  }))
}

function toLineString(feature) {
  var geometry = feature.geometry,
      properties = feature.properties

  switch (geometry.type) {
    case 'Polygon':       return polygonToLineString(geometry.coordinates, properties)
    case 'MultiPolygon':  return multiPolygonToLineString(geometry.coordinates, properties)
    default:              return feature
  }
}

/**
 * Transforms Polygons and MultiPolygons to LineStrings.
 *
 * @module turf/polygonToLine
 * @category transformation
 * @param {Object} geojson any GeoJSON object
 * @returns {Object} FeatureCollection where
 * Polygons and MultiPolygons transformed to LineStrings.
 */
module.exports = function(geojson) {
  var features = normalize(geojson).features.map(toLineString)
  return featurecollection(flatten(features))
}