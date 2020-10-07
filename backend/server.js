const express = require('express');
const app = express();

//cors
const cors = require('cors');
app.use(cors());

const dbpool = require('./created_modules/dbpool');
const db = dbpool['db'];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/whname',(req,res)=>{
    let sql = `
    SELECT DISTINCT Whname FROM inventorydata
    `;
    db.query(sql,(error,result)=>{
        if (error) throw error;
        res.json(result);
    })
})

app.get('/whid', (req, res) => {
    let sql = `
    SELECT DISTINCT Whid FROM inventorydata
    `;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    })
})

app.get('/status', (req, res) => {
    let sql = `
    SELECT DISTINCT Status FROM inventorydata
    `;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    })
})
app.get('/expBucket', (req, res) => {
    let sql = `
    SELECT DISTINCT ExpBucket FROM inventorydata
    `;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    })
})
app.get('/dates',(req,res)=>{
    let sql = `
    SELECT max(Createdat),min(Createdat) FROM inventorydata
    `;
    db.query(sql,(error,result)=>{
        if (error) throw error;
        res.json(result);
    })
})
app.get('/productname', (req, res) => {
    let sql = `
    SELECT DISTINCT Productname FROM inventorydata
    `;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    })
})
app.get('/categoryname', (req, res) => {
    let sql = `
    SELECT DISTINCT Categoryname FROM inventorydata
    `;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    })
})

app.get('/menuid', (req, res) => {
    let sql = `
    SELECT DISTINCT Menuid FROM inventorydata
    `;
    db.query(sql, (error, result) => {
        if (error) throw error
        res.json(result);
    })
})


app.get('/search', (req, res) => {
    let searchedWhname = `('BANGALORE WAREHOUSE', 'HYDERABAD WAREHOUSE','VIJAYAWADA WAREHOUSE')`;
    let searchedStatus = `('AVAILABLE','DAMAGED','NOT AVAILABLE')`;
    let searchedExpBucket = `('30-60','60-90','<30')`;
    let searchedProductName = `('DANTKANTI PATANJANLI','PATANJALI FACEWASH','PONDS FACEWASH','SANTOOR','WHITE FACE POWDER','XIOMI REDMI NOTE4','XIOMI REDMI NOTE5','ZIOX')`;
    let searchedCategoryname = `('BASIC PHONES','FACE WASH','SMART PHONE','SOAP','TALCUM POWDER','TOOTH PASTE')`;
    let searchedWhid = `('WMFO','WMF1','WMF2')`;
    let searchedMenuid = `('C1234','C1252','C1296','C1623','C2533','C7263','C8326','C9372')`;
    let dateLowerRange = `2017-02-07`
    let higherDateRange = `2018-04-15`
    let dataSql = `
    SELECT * FROM inventorydata 
    WHERE 
    Whname IN ${searchedWhname} AND
    Whid IN ${searchedWhid} AND
    Status IN ${searchedStatus} AND
    EXPBucket IN ${searchedExpBucket} AND
    Productname IN ${searchedProductName} AND
    Categoryname IN ${searchedCategoryname} AND
    Menuid IN ${searchedMenuid} AND
    Createdat BETWEEN '${dateLowerRange}' AND '${higherDateRange}'`;
    db.query(dataSql, (err, data) => {
        console.log(dataSql);
        //Summed Parameters
        let inventoryCost = `\`Inventory Cost\``;
        let inventoryProfit = `\`Inventory Profit\``;
        let inventoryValue = `\`Inventory Value\``;
        let QTY = `QTY`;
        //Summed Parameters
        if (err) throw err;
        let summedSql = `
        SELECT SUM(${inventoryCost}),SUM(${inventoryProfit}), SUM(${inventoryValue}),SUM(${QTY}) FROM  
        inventorydata
        WHERE
        Whname IN ${searchedWhname} AND
        Whid IN ${searchedWhid} AND
        Status IN ${searchedStatus} AND
        EXPBucket IN ${searchedExpBucket} AND
        Productname IN ${searchedProductName} AND
        Categoryname IN ${searchedCategoryname} AND
        Menuid IN ${searchedMenuid} AND
        Createdat BETWEEN '${dateLowerRange}' AND '${higherDateRange}'
        `;
        db.query(summedSql, (error, summedResult) => {
            if (error) throw error
            res.json({ 'data': data, 'summedResult': summedResult })
        })
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Process started at port:5000');
})
