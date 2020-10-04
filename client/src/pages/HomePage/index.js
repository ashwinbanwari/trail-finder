import React, { useEffect, useState } from 'react';
import {
  withStyles,
  CssBaseline,
  Typography,
  Button,
  // Card,
  // Grid,
} from '@material-ui/core';
// import SearchBar from 'material-ui-search-bar';
import { withRouter } from 'react-router-dom';
import Data from '../../utils/data';
import Papa from 'papaparse';
import OrderDialog from '../../components/OrderDialog';

const styles = () => {
  return {
    page: {
      textAlign: 'center',
    },
  };
};

const HomePage = ({ classes }) => {
  const getLocation = () => {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(locationSuccess);
   }
  }

  const locationSuccess = (position) => {
  //  setState({coords: position.coords, trails:state.trails});

  }



  // Trail:  {DISTANCE, DIST_TYPE, GAIN, HIGHEST, LATITUDE, LONGITUDE, RATING, RATING_COUNT, REGION, REPORT_COUNT, REPORT_DATE, TITLE, URL}
  let [trails, setTrails] = useState([]);
  let [dialogOpen, setDialogOpen] = useState(false);
  let [dialogTrail, setDialogTrail] = useState(null);

  useEffect(() => {
    const trails = Data.trails;
    const data = Papa.parse(trails).data;
    let arr = [];
    // Parse CSV data
    for (var i = 1; i < data.length; i++) {
      var curr = {};
      for (var j = 0; j < data[0].length; j++) {
        if (
          typeof data[i][j] !== 'undefined' &&
          data[i][j] &&
          data[i][j] !== ''
        ) {
          if (
            data[0][j] === 'DIST_TYPE' ||
            data[0][j] === 'REGION' ||
            data[0][j] === 'REPORT_DATE' ||
            data[0][j] === 'TITLE' ||
            data[0][j] === 'URL'
          ) {
            curr[data[0][j]] = data[i][j].trim();
          } else {
            curr[data[0][j]] = parseInt(data[i][j]);
          }
        }
      }
      arr.push(curr);
    }
    setTrails(arr);
  }, []);

  return (
    <div className={classes.page}>
      <CssBaseline />
      <OrderDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        trail={dialogTrail}
      />
      {trails
        .filter((_, i) => i < 100)
        .map((trail) => (
          <div>
            <Typography style={{ display: 'inline' }}>{trail.TITLE}</Typography>
            <Button
              style={{ display: 'inline' }}
              onClick={() => {
                setDialogTrail(trail);
                setDialogOpen(true);
              }}
            >
              Learn More
            </Button>
          </div>
        ))}
    </div>
  );
};

export default withStyles(styles)(withRouter(HomePage));
