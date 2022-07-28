const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.once('open', () => {
    console.log("Connection Successful.");
});

require("./Category");
require("./Recipe");