const path = require("path"),
  express = require("express"),
  webpack = require("webpack"),
  webpackConfig = require("./webpack.config.js"),
  app = express(),
  port = process.env.PORT || 3000;

// ADMIN AUTH
// var admin = require("firebase-admin");
// var serviceAccount = require("./admin-credentials.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://recipecards-1.firebaseio.com"
// });

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

let compiler = webpack(webpackConfig);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
  })
);
app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static(path.resolve(__dirname, "dist")));
