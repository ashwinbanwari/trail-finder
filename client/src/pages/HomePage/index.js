import React, { useEffect, useState } from 'react';
import {
  withStyles,
  CssBaseline,
  Typography,
  // Card,
  // Grid,
} from '@material-ui/core';
// import SearchBar from 'material-ui-search-bar';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

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
    setState({coords: position.coords, trails:state.trails});

  }


  // Trail:  {DISTANCE, DIST_TYPE, GAIN, HIGHEST, LATITUDE, LONGITUDE, RATING, RATING_COUNT, REGION, REPORT_COUNT, REPORT_DATE, TITLE, URL}
  let [state, setState] = useState({trails: [], coords:{latitude: 0, longitude: 0}});
  state.trails.sort((a,b) =>
    ((a.LATITUDE - state.coords.latitude)**2 + (a.LONGITUDE - state.coords.longitude)**2) -
    ((b.LATITUDE - state.coords.longitude)**2 + (b.LONGITUDE - state.coords.longitude)**2)
  );
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await firebase
        .firestore()
        .collection('trails')
        .where('REPORT_COUNT', '<', 1000)
        .orderBy("REPORT_COUNT", "asc")
        .limit(40)
        .get();
      let trails = [];
      querySnapshot.docs.forEach((doc) => {
        trails.push(doc.data());
      });
      setState({coords:state.coords,trails:trails});
    };
    fetchData();
  }, [state.coords]);


  //console.log(trails[0]);
  return (
    <>
    <button onClick={getLocation}>Get My Location</button>

    <div style={{"display": "flex", "flexDirection":"column"}} className={classes.page}>
      <CssBaseline />

      {state.trails.map((trail) =>
        <Typography key={trail.TITLE}>{trail.TITLE}, {trail.RATING_COUNT + trail.REPORT_COUNT}</Typography>
      )}

  </div>
  </>
  );
};

export default withStyles(styles)(withRouter(HomePage));
