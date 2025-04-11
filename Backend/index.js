const express = require('express');
const app = express();
const userRouter = require('./routers/Userrouter');
const projectRouter = require('./Routers/projectrouter');
const tasksRouter = require('./Routers/Taskrouter');
const enrollRouter = require('./routers/enrollrouter');
const cors = require('cors');


const port = 5000;

// middleware
app.use(cors({ origin: ['http://localhost:3000']}));
app.use(express.json());  
app.use('/user', userRouter);
app.use('/project',projectRouter);
app.use('/task',tasksRouter);
app.use('/enroll',enrollRouter);


app.listen(port, () => {
    console.log('server started');
});
