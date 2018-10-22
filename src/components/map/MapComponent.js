import React from 'react'
import {YMaps, Map, GeoObject, Polyline, } from 'react-yandex-maps';

const mapState = {
  center: [55.751574, 37.573856],
  zoom: 9,
  controls: ['zoomControl', 'fullscreenControl']
};

class MapComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  addPoint(point) {

  }


  deletePoint() {

  }
  geocode(ymaps) {
    ymaps.geocode('Мытищи')
      .then(result => console.log( result.geoObjects.get(0).geometry.getCoordinates()))
  }

  render() {
    const {points} = this.props;
    return (
      <YMaps
        onLoad={(ymaps) => console.log('ymaps',ymaps)}
        onError={(error) => console.log('err', error)}
        query={{
          ns: 'use-load-option',
          apikey : '465cb9d2-22be-4ff8-b1ac-0425e3abde87',
          lang : 'ru_RU',
           load:
           'package.full',
         }}
      >
        <div>
          <Map state={mapState}
               onLoad={(ymaps) => this.geocode(ymaps)}
               onError={(error) => console.log('err', error)}
               instanceRef={(ref) => this.map = ref}>
            {
              points.map((item,index) => {
                return <GeoObject
                  key={'point ' + index}
                  geometry={{
                    type: 'Point',
                    coordinates: item.coordinates,
                  }}
                  options={{
                    draggable: true,
                  }}
                  properties= {{
                    balloonContentHeader: index,
                  }}
                  onDragend={this.props.dragPoint(index)}
                />
              })
            }

            <Polyline
              geometry={points.map((item)=>{
                return item.coordinates;
              })}
              options={{
                balloonCloseButton: false,
                strokeColor: '#000',
                strokeWidth: 4,
                strokeOpacity: 0.9,
                draggable: true
              }}
            />

          </Map>
        </div>
      </YMaps>
    )
  }
};

export default MapComponent