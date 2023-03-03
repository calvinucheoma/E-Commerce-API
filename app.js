require('dotenv').config();
require('express-async-errors'); //once we use this package, it is going to be applied to all our controllers automatically. We don't need to do it manually in our try-catch or middleware

//express
const express = require('express');
const app = express();

//rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//database
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// app.use(morgan('tiny'));
app.use(express.json()); //to have access to the json data in our req.body, we use this middleware
app.use(cookieParser(process.env.JWT_SECRET)); //the argument is to sign our cookies

app.use(express.static('./public')); //once we upload the image, we want the url to point to our server
app.use(fileUpload());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.use(notFoundMiddleware); // this error middleware comes first because if the user enters a wrong route path, express navigates all the routers in the code and checks if the route the user specified exists, if it doesn't, it moves on to this line of code which is the 404 route not found middleware
app.use(errorHandlerMiddleware); //needs to be the last error middleware by express rules. It is set on purpose per express rules as the last one because we only hit it when we throw an error from an existing route, not a wrong specified route

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
