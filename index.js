const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors())

// routers
const locationRouter = require("./routes/Location")
app.use("/locations", locationRouter)

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
  console.log(process.env.DB_USERNAME);
});

//Run app, then load http://localhost:3001 in a browser to see the output.