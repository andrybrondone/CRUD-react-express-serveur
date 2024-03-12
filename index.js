const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.json())
app.use(cors())

const db = require("./models");

// routers
const locationRouter = require("./routes/Location")
app.use("/locations", locationRouter)

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
    console.log(process.env.DB_USERNAME);
  });
});

//Run app, then load http://localhost:3001 in a browser to see the output.