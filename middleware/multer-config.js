const multer = require('multer');

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
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('file');