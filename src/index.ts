const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());

const public = path.join(__dirname, '../public');

app.use(express.static(public));

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});