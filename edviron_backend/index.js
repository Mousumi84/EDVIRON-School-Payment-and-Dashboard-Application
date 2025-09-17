const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { mongoose } =  require("mongoose");
const session = require("express-session");
const mongoDbsession = require("connect-mongodb-session")(session);
const { mongoAtlas, port, sessionSecret } = require("./ConfigModule");


//--------Files-Import----------------
const {AuthRouter} = require("./Routers/AuthRouter");
const {PaymentRouter} = require("./Routers/PaymentRouter");
const { WebhookRouter }= require("./Routers/WebhookRouter");
const { TransactionRouter } = require("./Routers/TransactionRouter");


//--------Connect mongodb--------------
mongoose.connect(mongoAtlas)
.then(() => { console.log("MongoDb Connected")})
.catch((er) => { console.log(er)});


//--------Constants----------------
const app = express();
const PORT = port|| 8050;
const store = new mongoDbsession({
    uri : mongoAtlas,
    collection : "sessions",
})


//--------Middlewares----------------
app.use(cors({
    origin: "https://edviron-school-payment-and-dashboar.vercel.app",
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
    session({
        secret : sessionSecret,
        store : store,
        resave : true,
        saveUninitialized : false,
    })
);


//--------Routers----------------
app.use('/api/auth',AuthRouter);
app.use('/api/payment',PaymentRouter);
app.use('/api/',WebhookRouter); 
app.use('/api/',TransactionRouter);

app.get("/",(req,res) => {
    res.send({
        activStatus: true,
        error: false,
    })
})

//--------Listener----------------
app.listen(PORT,() => {
    console.log(`server running at:`);
    console.log(`http://localhost:${PORT}`);
});