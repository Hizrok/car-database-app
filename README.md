# car database app

## English
(pro český překlad sjeďte níže...)

this project was created while learning how to work with Node.js Express.js and MySql
but mainly for learning and testing MySql

project is hosted with heroku here: https://cars-db-app.herokuapp.com/

for some reason the app is crashing for me after a while,
so if you're having the same problem feel free to download

### how to run it?
1. install node.js and mysql
2. install required node modules: 

    `npm install`
    
3. create a new mysql connection in mysql workbench
4. create new database in mysql workbench
5. run cars.sql script while having your database selected
6. change database info in server.js

    `const db = mysql.createConnection({host: "localhost", user: "root", password: "your_password", database: "your_database"});`
    
7. run the server

    `npm start`
    
8. open you browser and go to `localhost/3000`

### what can you do in the app?
the app is a simple list of cars

you can:
- create new car and add it to the database
- search for a specific car by it's brand
- edit and delete cars from the database

### mysql commands used:
table creation 

`CREATE TABLE cars (id INT AUTO_INCREMENT, car_brand VARCHAR(50), car_model VARCHAR(50), car_model_year INT, car_vin VARCHAR(50), PRIMARY KEY (id));`

regex search

`WHERE car_brand REGEXP 'search'`

ORDER BY

`ORDER BY car_brand ASC, car_model_year ASC`

LIMIT for multiple pages

`LIMIT (javascript variable * 10), 10`

editing a car

`UPDATE SET car_brand=..., car_model=..., car_model_year=..., car_vin=... WHERE id=...`

deleting a car

`DELETE FROM cars WHERE id=...`

creating a new car

`INSERT INTO cars (car_brand, car_model, car_model_year, car_vin) values (...)`

## Český překlad
(for english translation scroll up...)

tento projekt byl vytvořen při učení Node.js Express.js a Mysql,
ale halvně pro učení a testování MySql

projekt je pomocí heroku hostován zde: https://cars-db-app.herokuapp.com/

z nějakého důvodu mi to občas spadne takže pokud stránka spadne,
můžete si projekt stáhnout a vyzkoušet

### jak projekt zprovoznit?
1. nainstalujte node.js a mysql
2. nainstalujte node moduly pomocí příkazu: 

    `npm install`
    
3. vytvořte nové mysql connection v mysql workbench
4. vytvořte novou databázi v mysql workbench
5. otevřete a spusťte cars.sql script zatímco je máte vybranou databázi
6. změňte informace o databázi v server.js

    `const db = mysql.createConnection({host: "localhost", user: "root", password: "your_password", database: "your_database"});`
    
7. spusťte server

    `npm start`
    
8. open you browser and go to `localhost/3000`

### co můžete v aplikaci dělat?
tato aplikace je jednoduchý seznam aut

můžete:
- vytvářet nové auta a dávat je do databáze
- vyhledávat pro určitou značku auta
- upravovat a mazat data z databáze

### mysql commands used:
vytvoření tabulky

`CREATE TABLE cars (id INT AUTO_INCREMENT, car_brand VARCHAR(50), car_model VARCHAR(50), car_model_year INT, car_vin VARCHAR(50), PRIMARY KEY (id));`

regex vyhledávání

`WHERE car_brand REGEXP 'search'`

ORDER BY

`ORDER BY car_brand ASC, car_model_year ASC`

LIMIT pro úhlednost a více stran

`LIMIT (javascript variable * 10), 10`

upravování aut

`UPDATE SET car_brand=..., car_model=..., car_model_year=..., car_vin=... WHERE id=...`

mazání aut

`DELETE FROM cars WHERE id=...`

vytváření nových aut

`INSERT INTO cars (car_brand, car_model, car_model_year, car_vin) values (...)`
