const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000
    }
});

let app = express();

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next)=>{
    res.json({
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
    })
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port ' + (process.env.PORT || 3000));
});