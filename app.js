import express from 'express';
import productRouter from './routers/product.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import morgan from 'morgan';

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(morgan("dev"));

app.use('/ping', (req, res)=>{
    res.send('pong')
})
app.use('/api/vi/product', productRouter);

app.all('*', (req, res)=>{
    res.status(400).send('OOPS! Page not Found')
})
app.use(errorMiddleware)
export default app;