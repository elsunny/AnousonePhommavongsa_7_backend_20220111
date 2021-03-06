const multer = require('multer');
const path = require('path');

// indique aux naviguateur la nature des fichiers
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
    'video/webm' : 'webm',
    'video/ogg' : 'ogg'
}

// upload image sauce et création du nom de fichier
const storage = multer.diskStorage ({
    
    destination: (req, file, callback) => {
        callback(null, 'public/images'); //null ne prend pas en compte d'erreur
    },
    filename: (req, file, callback) =>  {
        const extension = MIME_TYPES[file.mimetype];
        const name = path.basename(file.originalname.split(' ').join('_'), extension);
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('file');