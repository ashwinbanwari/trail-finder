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
  // Trail:  {DISTANCE, DIST_TYPE, GAIN, HIGHEST, LATITUDE, LONGITUDE, RATING, RATING_COUNT, REGION, REPORT_COUNT, REPORT_DATE, TITLE, URL}
  let [trails, setTrails] = useState([]);

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
      setTrails(trails);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.page}>
      <CssBaseline />
      {trails.map((trail) => 
        <Typography>{trail.TITLE}, {trail.RATING_COUNT + trail.REPORT_COUNT}</Typography>
      )}
    </div>
  );
};

export default withStyles(styles)(withRouter(HomePage));
