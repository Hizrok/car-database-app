const express = require('express');
const mysql = require('mysql');
const vinGenerator = require('vin-generator');
const expressLayouts = require('express-ejs-layouts');

let pageIndex = 0;
let currentQuery = 0;
let lastSearch = '';

const app = express();

const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database'
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(db_config);

    db.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log("Connected to the database");
        }   
    });

    db.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {        
    let search = '';    
    if (req.query.search){
        pageIndex = 0;
        search = `WHERE car_brand REGEXP '${req.query.search}'`;
    }
    if (req.query.search != lastSearch) {
        pageIndex = 0;
        lastSearch = req.query.search;
    }
    let order = `ORDER BY car_brand ASC, car_model_year ASC`;
    if (req.query.page) {
        pageIndex = parseInt(req.query.page)-1;
    }
    let limit = `LIMIT ${pageIndex*10}, 10`;    

    let sql = `SELECT * FROM cars ${search} ${order}`;

    db.query(sql, (err, result, fields) => {
        if (err) throw err; 
        currentQuery = result.length;
    });

    sql = `SELECT * FROM cars ${search} ${order} ${limit}`;

    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.render('index', {
            cars: result,
            pages: Math.ceil(currentQuery/10),
            search: req.query.search,
            currentPage: pageIndex+1
        });
    });    
});

app.get('/edit/:id', (req, res) => {
    let sql = `SELECT * FROM cars WHERE id=${req.params.id}`;    
    db.query(sql, (err, result, fields) => {
        if (err) throw err; 
        res.render('edit', {
            car: result[0]
        });
    }); 
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/edit/:id', (req, res) => {
    let sql = `UPDATE cars SET 
        car_brand = '${req.body.car_brand}',
        car_model = '${req.body.car_model}',
        car_model_year = ${req.body.car_model_year},
        car_vin = '${req.body.car_vin}'
    WHERE id=${req.params.id}`;  

    db.query(sql, (err, result, fields) => {
        if (err) throw err; 
        res.redirect(`/?search=${req.body.car_brand}`);
    }); 
});

app.post('/new', (req, res) => {
    let sql = `INSERT INTO cars (car_brand, car_model, car_model_year, car_vin) values 
    ('${req.body.car_brand}', 
    '${req.body.car_model}', 
    ${req.body.car_model_year}, 
    '${vinGenerator.generateVin()}')`;  

    db.query(sql, (err, result, fields) => {
        if (err) throw err; 
        res.redirect(`/?search=${req.body.car_brand}`);
    }); 
});

app.post('/delete/:id', (req,res) => {
    let sql = `DELETE FROM cars WHERE id=${req.params.id}`;

    db.query(sql, (err, result, fields) => {
        if (err) throw err; 
        res.redirect(`/?search=${lastSearch}&page=1`);
    }); 
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));