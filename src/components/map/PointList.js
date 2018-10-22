import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField'
const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});


class PointList extends React.Component {
  state = {
    dense: false,
    secondary: true,
    input: ''
  };

  render() {
    const {classes, points} = this.props;
    const {dense, secondary} = this.state;

    return (
      <div className={classes.demo}>
        <TextField
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              this.props.handleClickEnter(ev.target.value);
              ev.preventDefault();
            }
          }}
        />

        <List dense={dense}>
          {points.map((item,index) => {
            return (
              <ListItem
                key={'pointList' + index}
              >

                <ListItemText
                  primary={(index+1) + '. ' + item.name}
                  secondary={secondary ?   item.coordinates  : null}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => this.props.deletePoint(index)}
                    aria-label="Delete">
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )

          })
          }
        </List>
      </div>
    );
  }
}

PointList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PointList);