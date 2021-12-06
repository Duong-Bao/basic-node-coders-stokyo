require('dotenv').config(); //đây là thư viện dùng để render ra một đoạn text khẩu nhiêu và gửi về clien thêm vào trong cookie

const express = require('express');
const app = express(); // khai báo app bằng với express để sử dung những phương thức trong thư viện này
var cookieParser = require('cookie-parser'); // thử viện cookie để lưu password cho người dùng đăng nhập 
var csurf = require('csurf'); // viện này này dùng để kiểm tra tocken gửi lên  
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL); //kết nối với database mongoDB

var userRoute = require('./routes/user.route') //đây là route trang chính của trang web
var authRoute = require('./routes/auth.route') //đây là route đăng nhập
var productRoute = require('./routes/product.route') //đây là route đăng nhập
var cartRoute = require('./routes/cart.route')
var transferRoute = require('./routes/transfer.route')

var apiProductRoute = require('./api/routes/product.route')

const authMiddleware = require('./middlewares/auth.middleware'); // đây là middleware phần mềm trung gian dùng để check người dùng đã đăng nhập hay chưa nếu chưa thì chuyển trang login
const sessionMiddleware = require('./middlewares/session.middleware')

const port = 3000 //cổng 300

/**----------Thư viện template enginers làm phần giao diện----------------*/
app.set('view engine', 'pug'); //cầu hình cho thư viện pug 
app.set('views', './views'); //set thằng view vào trong thư mục view 
/**----------hết thư viện templte enginers------------------*/

/**----------------Đây là thử viện bodyParser để đọc dữ liệu người dùng post lên rep.body---------*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
    /**------------------Hết Thử Viện bodyParser---------------------- */

app.use('/api/products', apiProductRoute)

app.use(cookieParser(process.env.SESSION_SECRET)) //middleware để chúng ta có thể xem được giá trị của cookie gửi về serve
app.use(sessionMiddleware); //nó sẽ ảnh hướng đến tất cả các đường dẫn mà chúng ta sử dụng 
// app.use(csurf({ cookie: true }));

/**----------- hàm này dùng để thêm file static(js,css,img)  --------------- */
app.use(express.static('public'))
    /**------------ Hết hàm thêm file tĩnh ---------------- */

app.get('/', (req, res) => { //đây là trang chủ của chúng ta
    res.render('index', { //render ra trang chủ
        name: 'AAA'
    })
});

app.use('/users', authMiddleware.requireAuth, userRoute); // khai báo đường link trang web của chúng ta đã đăng nhập rồi 
app.use('/auth', authRoute); //khai báo trang auth(login) 
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});