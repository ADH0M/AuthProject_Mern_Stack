const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./src/router/usersRoute');
const customer = require('./src/router/customerRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// ENV PATH
dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true,
}));

app.listen(PORT, () => {
  console.log(`port is running on port ${PORT}`);
});

//app router
app.use('/api', router);
app.use('/api/customer', customer);
app.get('/' ,(req,res)=>{
  res.send('Api is running...')
});

// connect to mongoDB

// (async function connectToDB() {
//   try {
//     await mongoose.connect(process.env.MDB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error('Failed to connect to MongoDB', err);
//   }
// })();

mongoose.connect(process.env.MDB, {
  useNewUrlParser: true,   // لاستخدام محلل URL الجديد
  useUnifiedTopology: true // لتحسين إدارة الاتصال مع قاعدة البيانات
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));
