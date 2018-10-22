import React from 'react'
import MapComponent from './MapComponent'
import PointList from './PointList'
import Grid from '@material-ui/core/Grid';


class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [
        {name: 1, coordinates: [55.8, 37.5]},
        {name: 2, coordinates: [55.8, 37.4]},
        {name: 3, coordinates: [55.7, 37.5]},
      ],

    }

  }

  addPoint = (newPoint) => {
    this.setState({
      points: [...this.state.points, newPoint]
    })
  };
  deletePoint = (index) => {
    const {points} = this.state;
    this.setState({
      points: [
        ...points.slice(0, index),
        ...points.slice(index + 1),
      ]
    })
  };

  dragPoint = (index) => (event) => {
    const point = {
      name: '',
      coordinates: event.originalEvent.target.geometry._coordinates
    };
    const {points} = this.state;
    this.setState({
      points: [
        ...points.slice(0, index),
        point,
        ...points.slice(index + 1),
      ]
    })
  };
  handleClickEnter = (value) => {
    console.log('handle click enter');
    fetch("https://geocode-maps.yandex.ru/1.x/?apikey=465cb9d2-22be-4ff8-b1ac-0425e3abde87&format=json&geocode="
      + value)
      .then((response)=>{
        return response.json();
      })
      .then((response)=> {
        let geoObject = response.response.GeoObjectCollection.featureMember[0].GeoObject;
        let newPoint = {
          name : geoObject.name,
          coordinates : geoObject.Point.pos.split(" ").reverse(),
        };
        console.log('res', response);
        console.log('new point', newPoint);
        this.addPoint(newPoint);
      })
      .catch((error)=>{
        console.log('err',error);
      })
  };
  setYmaps = (ymaps) => {
    this.setState({ymaps})
  };

  render() {

    const {points} = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Grid container>
            <PointList
              handleClickEnter={this.handleClickEnter}
              points={points}
              addPoint={this.addPoint}
              deletePoint={this.deletePoint}
            />
          </Grid>
        </Grid>

        <Grid item xs={9}>
          <Grid container>
            <Grid item>
              <MapComponent
                setYmaps={this.setYmaps}
                points={points}
                dragPoint={this.dragPoint}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default MapContainer