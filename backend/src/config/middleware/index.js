import { join } from 'path';
import morgan from 'morgan';
import cors from 'cors';

export default function useMiddleware(app, express) {
    // use static
    app.use(express.static(join(__dirname, '..', 'public')));

    // middleware body parse and json
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    app.use(express.json());

    // render home when path is /
    app.get('/', (req, res) => {
        res.render('home');
    });
    // config CORS
    if (process.env.NODE_ENV !== 'production') {
        app.use(cors());
    } else {
        app.use(cors(configCors()));
    }

    // http logger
    // app.use(morgan('combined'));
}
function configCors() {
    const allowString = process.env.ALLOW_CORS;
    const allowlist = allowString.split(';');
    return {
        origin: function (origin, callback) {
            if (allowlist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    };
}
