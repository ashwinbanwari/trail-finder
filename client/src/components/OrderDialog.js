import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

// props: trail: {DISTANCE, DIST_TYPE, GAIN, HIGHEST, LATITUDE, LONGITUDE, RATING, RATING_COUNT, REGION, REPORT_COUNT, REPORT_DATE, TITLE, URL}
export default (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.trail?.TITLE}
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              padding: '2em',
            }}
          >
            {props.trail?.DISTANCE ? (
              <Typography>
                Distance: {props.trail?.DISTANCE}
                {' miles '}
                {props.trail?.DIST_TYPE
                  ? '(' + props.trail?.DIST_TYPE + ')'
                  : ''}
              </Typography>
            ) : (
              <div />
            )}
            {props.trail?.GAIN ? (
              <Typography>
                Gain: {props.trail?.GAIN}
                {' feet'}
              </Typography>
            ) : (
              <div />
            )}
            {props.trail?.HIGHEST ? (
              <Typography>
                Highest Point: {props.trail?.HIGHEST}
                {' feet'}
              </Typography>
            ) : (
              <div />
            )}
            {props.trail?.RATING ? (
              <Typography>
                Rating: {props.trail?.RATING}
                {'/5 from '}
                {props.trail?.RATING_COUNT} Reviews
              </Typography>
            ) : (
              <div />
            )}
            {props.trail?.REGION ? (
              <Typography>Region: {props.trail?.REGION}</Typography>
            ) : (
              <div />
            )}
            {props.trail?.URL ? (
              <Typography>
                Learn More: <a href={props.trail?.URL}>{props.trail?.URL}</a>
              </Typography>
            ) : (
              <div />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
