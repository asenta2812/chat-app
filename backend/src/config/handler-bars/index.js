import handleBars from 'express-handlebars';
import { join } from 'path';

export default function configHandleBars(app) {
    // template engine
    app.engine(
        'hbs',
        handleBars({
            extname: '.hbs',
        })
    );
    app.set('view engine', 'hbs');
    app.set('views', join(__dirname, '../../resources/views'));
}
