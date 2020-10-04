import React, { useEffect, useState } from 'react';
import {
  withStyles,
  CssBaseline,
  Typography,
  Button,
  FormGroup,
  // FormControlLabel,
  FormControl,
  // Input,
  // InputLabel,
  TextField,
  Card,
  Slider,
  Grid,
} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import { withRouter } from 'react-router-dom';
import Data from '../../utils/data';
import Papa from 'papaparse';
import OrderDialog from '../../components/OrderDialog';

const styles = (theme) => {
  return {
    page: {
      textAlign: 'center',
    },
    bodyContainer:{
      [theme.breakpoints.down('lg')]: {flexDirection:'column'},
      [theme.breakpoints.up('lg')]: {flexDirection:'row'}
    },
    filters:{
      margin: 'auto',
      [theme.breakpoints.down('lg')]: {width:'90%'},
      [theme.breakpoints.up('lg')]: {width:'15vw'}
    },
  };
};

function distance(lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}

const HomePage = ({ classes }) => {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [searchText, setSearchText] = useState('');
  const [showLimit, setShowLimit] = useState(100);
  const [distanceRange, setDistanceRange] = useState([0,100]);
  const [gainRange, setGainRange] = useState([0,100]);
  const [altitudeRange, setAltitudeRange] = useState([0,10000]);
  const [reportRange, setReportRange] = useState([0,10000]);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess);
    }
  };

  const locationSuccess = (position) => {
    setCoords(position.coords);
    //console.log(coords);
  };


  const updateDistance = (event,newValue) =>
  {
    setDistanceRange(newValue);
    //console.log(newValue);
  }

  const updateGain = (event,newValue) =>
  {
    setGainRange(newValue);
    //console.log(newValue);
  }

  const updateAltitude = (event,newValue) =>
  {
    setAltitudeRange(newValue);
    //console.log(newValue);
  }

  const updateReport = (event,newValue) =>
  {
    setReportRange(newValue);
    //console.log(newValue);
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
      <div style={{ marginBottom: '3em' }}>
        <Typography variant="h2">Trailess</Typography>
        <Typography variant="h5">
          <i>Find less-used trails</i>
        </Typography>
      </div>
      <div className={classes.bodyContainer}>
      <div className={classes.filters}>
        <Typography id="range-slider" gutterBottom>Distance</Typography>
          <Slider
            value={distanceRange}
            onChange={updateDistance}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            />

        <Typography>Gain</Typography>
          <Slider
            value={gainRange}
            onChange={updateGain}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            />
        <Typography>Highest Altitude</Typography>
          <Slider
            value={altitudeRange}
            onChange={updateAltitude}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            />
        <Typography>Report Count</Typography>
          <Slider
            value={reportRange}
            onChange={updateReport}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            />
      </div>
      <div className="main">
        <form style={{ maxWidth: '40vw', margin: 'auto' }}>
          <SearchBar
            placeholder="Search By Trail Name"
            value={searchText}
            onChange={(val) => setSearchText(val)}
          />
          <FormGroup style={{ margin: 'auto' }}>
            <FormControl>
              <TextField />
              <Button variant="contained" color="primary" onClick={getLocation}>
                Find Trails Near Me
              </Button>
            </FormControl>
          </FormGroup>
        </form>
        <CssBaseline />
        <OrderDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          trail={dialogTrail}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '4em',
            maxWidth: 1300,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Grid container spacing={8}>
            {trails
              .sort(
                (a, b) =>
                  (a.LATITUDE - coords.latitude) ** 2 +
                  (a.LONGITUDE - coords.longitude) ** 2 -
                  ((a.LATITUDE - coords.latitude) ** 2 +
                    (b.LONGITUDE - coords.longitude) ** 2)
              )
              .filter((trail, i) => {
                let shouldKeep = true;
                if (searchText !== '') {
                  shouldKeep =
                    shouldKeep &&
                    trail.TITLE.includes(searchText.toLowerCase());
                }
                shouldKeep = shouldKeep && i < showLimit;
                return shouldKeep;
              })
              .map((trail) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    style={{
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      paddingTop: 22,
                      height: 125,
                      width: '40ch',
                    }}
                  >
                    <Typography key={trail.TITLE} style={{ display: 'inline' }}>
                      {trail.TITLE}
                    </Typography>
                    {coords.latitude !== 0 ? (
                      <Typography>
                        Distance:{' '}
                        {distance(
                          trail.LATITUDE,
                          trail.LONGITUDE,
                          coords.latitude,
                          coords.longitude
                        ).toFixed(2)}{' '}
                        Miles
                      </Typography>
                    ) : (
                      <div />
                    )}
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
                </Grid>
              ))}
          </Grid>
          {showLimit < trails?.length ? (
            <div
              style={{
                marginTop: '1.5em',
                marginBottom: '2em',
                textAlign: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Button onClick={() => setShowLimit(showLimit + 200)}>
                Show More
              </Button>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default withStyles(styles)(withRouter(HomePage));
