import { HttpRequestError } from '../errors/HttpRequestError';
import { ErrorType } from '../errors/ErrorType';
import * as bodyParser from 'body-parser';
import { Router } from 'express';
import expressValidator = require('express-validator');
import * as fs from 'fs-extra';
import * as useragent from 'express-useragent';
import * as _ from 'lodash';
import * as moment from 'moment';
// const useragent = require('express-useragent');

let router = Router();

router.use(bodyParser.json());
router.use(expressValidator());

router.get('/ping', (req, res) => {
    res.json({ time: +new Date });
});

router.post('/v1/catch', (req, res) => {
    const source = req.headers['user-agent'];
    const temphost = req.headers["host"];
    let tempstr: string = ' ';
    let hostname: string = ' ';
    tempstr = _.isArray(source) ? source.join(' ') : source;
    hostname = _.isArray(temphost) ? temphost.join(' ') : temphost;

    let index = temphost.lastIndexOf(":");
    if (index !== -1) {
        hostname = hostname.substring(0, index);
        // console.log(hostname);
    }
    const ua = useragent.parse(tempstr);
    console.log("")
    console.log("Хост: " + temphost)
    console.log("")
    console.log(ua)
    // const data = new Date().valueOf();
    console.log(new Date());
    let now = moment().format();
    console.log(now);

    /*console.log(req);
    console.log(req.headers);*/
    // let filename = new Date() /*+ " " + ua.os + " " + ua.browser + " " + ua.version*/ + ".txt";
    let filename = ua.os + " " + ua.browser + " " + ua.version + ".txt";
    // const file = './' + hostname + '/' + filename;
    const file = './' + hostname + '/' + filename;
    console.log(file);

    fs.outputFile(file, 'hello!', err => {
    console.log(err) // => null

    /*fs.readFile(file, 'utf8', (err, data) => {
        if (err) return console.error(err)
        console.log(data) // => hello!
    })*/
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