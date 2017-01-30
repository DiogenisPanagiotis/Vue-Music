const path = require('path');

module.exports = function(app, express){
    let router = express.Router();
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, './index.html'));
    });
}