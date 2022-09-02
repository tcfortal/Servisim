require('dotenv').config()
//require('./redis/blacklist-acess-token');
//require('./redis/refresh_token_list');

const app = require('./app');
const port = 3002;

const routes = require('./rotas');

routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));