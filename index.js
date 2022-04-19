const express = require("express");
const { google } = require("googleapis");

const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + 'public/js'));
app.set('view engine', 'ejs');
app.get("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    app.get('/Methodology.html', (req, res) => {
        res.render('methodology');  
    });
    app.get('/home', (req, res) => {
        res.render('index.ejs')
    });
    app.get('/What_to_do.html',(req,res) => {
        res.render('What_to_do');
    });
    //create client instance for auth
    const client = await auth.getClient();

    const googlesheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1sjs_IprldJEpTzah50AbffuzeBLxQMI43UM13_GEl08";

    const metadata = await googlesheets.spreadsheets.get({
        auth: auth,

        spreadsheetId,

    });

    const getRowswaste = await googlesheets.spreadsheets.values.get({
        auth: auth,

        spreadsheetId,

        range: "Final Matrix!C7:C7",

    });
    const getRowswater = await googlesheets.spreadsheets.values.get({
        auth: auth,

        spreadsheetId,

        range: "Final Matrix!D7:D7",

    });
    const getRowscarbon = await googlesheets.spreadsheets.values.get({
        auth: auth,

        spreadsheetId,

        range: "Final Matrix!E7:E7",

    });
    const getRowsenergy = await googlesheets.spreadsheets.values.get({
        auth: auth,

        spreadsheetId,

        range: "Final Matrix!F7:F7",

    });
    const getRowslabour = await googlesheets.spreadsheets.values.get({
        auth: auth,

        spreadsheetId,

        range: "Final Matrix!G7:G7",

    });
    var waste=getRowswaste.data.values;
    var water=getRowswater.data.values;
    var energy=getRowsenergy.data.values;
    var carbon=getRowscarbon.data.values;
    var labour=getRowslabour.data.values;

    //res.render('index',{ title: 'food waste'},getRows.data);
    res.render('index',{waste,water,energy,carbon,labour});
    //res.render('index',);
    //res.send(data);

});
app.listen(1337, (req, res) => console.log("running on 1337"));
