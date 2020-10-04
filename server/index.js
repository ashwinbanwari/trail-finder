const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: true }));

app.get('/model/:trail', async (req, res) => {
    //TODO: geopipe model (low priority)
});

app.get('/model', (req, res) => {

});

app.get('/map')

const port = 3000;
app.listen(port, () => (console.log(`Listening on port ${port}...`)));