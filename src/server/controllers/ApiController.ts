import { HttpRequestError } from '../errors/HttpRequestError';
import { ErrorType } from '../errors/ErrorType';
import * as bodyParser from 'body-parser';
import { Router } from 'express';
import expressValidator = require('express-validator');
import * as fs from 'fs-extra';

let router = Router();

router.use(bodyParser.json());
router.use(expressValidator());

router.get('/ping', (req, res) => {
    res.json({ time: +new Date });
});

router.post('/v1/catch', (req, res) => {
    console.log(req.headers);
    const file = '/tmp/file.txt';
    fs.outputFile(file, 'hello!', err => {
    console.log(err) // => null

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) return console.error(err)
        console.log(data) // => hello!
    })
    })
    res.json({ time: +new Date });
});

router.use((req, res, next) => res.status(404).json({ error: 'Not found' }));

router.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof HttpRequestError) {
        res.status(400).json(err);
        return;
    }
    res.status(err.status || 500);
    // log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.json(new HttpRequestError(ErrorType.UNEXPECTED_ERROR, err.message));
});

export default (router);