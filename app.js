const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const home = require("./Routes/home");
const singleChalet = require("./Routes/singleChalet");
const myChalets = require("./Routes/myChalets");
const comments = require("./Routes/comments");
const users = require("./Routes/users");
const auth = require("./Routes/auth");
const profile = require("./Routes/profile");
const Reservation = require("./Routes/ReservationsControl/reservations");
const ReservationsRequests = require("./Routes/ReservationsControl/reservationsRequests");
const CanceldReservation = require("./Routes/ReservationsControl/canceledReserves");
const acceptedReservations = require("./Routes/ReservationsControl/acceptedReservations");
const myNextReserve = require("./Routes/ReservationsControl/myNextReservation");
const payment = require("./Routes/payment");
const contactForm = require("./Routes/contactForm");
const myOldReserves = require("./Routes/oldReservationsControl/myOldReserves");
const myClientsOldReserves = require("./Routes/oldReservationsControl/myClientsOldReserves");

const dashboard = require("./Routes/dashboardControl/dashboard");
const messageDashboard = require("./Routes/dashboardControl/messagesDashboard");
const usersDashboard = require("./Routes/dashboardControl/usersDashboard");
const postsDashboard = require("./Routes/dashboardControl/postsDashboard");
const commentsDashboard = require("./Routes/dashboardControl/commentsDashbord");

const app = express();

//Conferming exist of the privete key for athuntication
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey not defined");
  process.exit(1);
}

//allowing browser to take data from difrrent URL
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Use routers files

//Dashboard routes
app.use("/dashboard", dashboard);
app.use("/dashboard/messages", messageDashboard);
app.use("/dashboard/users", usersDashboard);
app.use("/dashboard/posts", postsDashboard);
app.use("/dashboard/comments", commentsDashboard);

//Main website routes
app.use("/home", home);
app.use("/myChalets/myChaletsPage", myChalets);
app.use("/register", users);
app.use("/login", auth);
app.use("/profile", profile);
app.use("/comment", comments);

app.use("/contact", contactForm);
app.use("/home/chalet", singleChalet);
app.use("/payment", payment);
// app.use("/home/chalet", Reservation);

//Reservations routes
app.use("/myChalets/reservationsRequests", Reservation);
app.use("/myChalets/reservationsRequests", ReservationsRequests);
app.use("/myChalets/myChaletsReservations", acceptedReservations);
app.use("/myChalets/canceledRequests", CanceldReservation);
app.use("/myChalets/upcomingReservations", myNextReserve);
app.use("/myChalets/oldReservations", myOldReserves);
app.use("/myChalets/myclientsoldreserves", myClientsOldReserves);

//connecting to database ( MongooDb )
mongoose
  .connect("mongodb://localhost/Estrahtk", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connecting to MongoDb..."))
  .catch((err) => {
    console.error("Could not connect to MongoDb");
  });

//Server port
const port = 5000;
app.listen(port, () => console.log(`App listening on port ${port}`));
