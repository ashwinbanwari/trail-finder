import React, { useEffect, useState } from 'react';
import {
  withStyles,
  CssBaseline,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Card,
  Slider
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

  const [coords, setCoords] = useState({latitude: 0, longitude: 0});
  const getLocation = () => {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(locationSuccess);
   }
  }

  const locationSuccess = (position) => {
      setCoords(position.coords);
      console.log(coords);

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
  console.log(trails[0]);
  return (
    <div className={classes.page}>
      <div className="filters">
        <Typography>Distance</Typography>
        <Typography>Gain</Typography>
        <Typography>Highest Altitude</Typography>
        <Typography>Report Count</Typography>
      </div>
      <div className="main">
      <form on style={{"maxWidth":"40vw","margin":"auto"}}>
        <FormGroup style={{"margin":"auto"}}>
          <FormControl>
            <TextField />
            <Button variant="contained" color="primary" onClick={getLocation}>Get Location</Button>
          </FormControl>
        </FormGroup>
      </form>
      <CssBaseline />
      <OrderDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        trail={dialogTrail}
      />
    <div style={{"display":"flex", "flexDirection":"column"}}>
      {trails
        .sort((a,b) => (
          ((a.LATITUDE- coords.latitude)**2 + (a.LONGITUDE - coords.longitude)**2) - ((b.LATITUDE- coords.latitude)**2 + (b.LONGITUDE - coords.longitude)**2)
        ))
        .filter((_, i) => i < 100)
        .map((trail) => (
          <Card key={trail.TITLE} style={{"margin": "1em auto","display":"flex", "flexDirection":"column","width":"45ch"}}>
            <Typography style={{ display: 'inline' }}>{trail.TITLE + ", " + ((trail.LATITUDE- coords.latitude)**2 + (trail.LONGITUDE - coords.longitude)**2) }</Typography>
            <Button
              style={{ display: 'inline' }}
              onClick={() => {
                setDialogTrail(trail);
                setDialogOpen(true);
              }}
            >
              Learn More
            </Button>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(withRouter(HomePage));
