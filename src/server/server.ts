import * as express from 'express';
import ApiController from './controllers/ApiController';

const port = 5858;

let app = express();
app.use(ApiController);

app.listen(port, () => {
    console.log(`Server (worker ${process.pid}) running on port ${port}`);
});