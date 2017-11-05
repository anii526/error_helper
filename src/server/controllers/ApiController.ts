import { HttpRequestError } from '../errors/HttpRequestError';
import { ErrorType } from '../errors/ErrorType';
import * as bodyParser from 'body-parser';
import { Router } from 'express';
import expressValidator = require('express-validator');
import * as fs from 'fs-extra';
import * as useragent from 'express-useragent';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as sanitize from 'sanitize-filename';


let router = Router();

router.use(bodyParser.json());
router.use(expressValidator());

router.get('/ping', (req, res) => {
    res.json({ time: +new Date });
});

router.post('/v1/catch', (req, res) => {
    const source = req.headers['user-agent'];
    const temphost = req.headers["host"];

    let tempstr, hostname: string = ' ';

    tempstr = _.isArray(source) ? source.join(' ') : source;
    hostname = _.isArray(temphost) ? temphost.join(' ') : temphost;

    const index = temphost.lastIndexOf(":");
    if (index !== -1)
        hostname = hostname.substring(0, index);

    const ua = useragent.parse(tempstr);

    let now = moment().format().replace(/:/g, ".");

    let filename = now + " " + ua.os + " " + ua.browser + " " + ua.version + ".txt";
    let file = './' + hostname + '/' + filename;

    let data;
    try {
        data = JSON.stringify(req.body);
    } catch (error) {
        return console.error('Bad JSON ' + error);
    }
    fs.outputFile(file, data, err => {
        if (err) return console.error(err);
        console.log('success!')
        /*if (!req.session) {
            throw new Error("Session doesn't exist");
        }*/
    });
    res.json({ msg: "success" });
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