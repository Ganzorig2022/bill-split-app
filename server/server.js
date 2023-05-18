const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './.env.local' });

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
