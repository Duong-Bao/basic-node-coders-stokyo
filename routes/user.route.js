var express = require('express')
const multer = require('multer') // thử viện dùng để lưu ảnh

const controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate')

const upload = multer({ dest: './public/uploads/' }) // nơi file hình ảnh được lưu

var router = express.Router()

router.get('/', controller.index);

router.get('/cookie', function(req, res, next) { //phần này để test cookie
    res.cookie('user-id', 12345); //giá trị cookie được gửi về clien
    res.send('Hello');
})

/**----------------Hàm này được dùng để lấy thông tin người cần tìm kiếm và tìm kiếm người cần tìm kiếm thông qua query parameter */
router.get('/search', controller.search);
/**--------------Hết hàm tìm kiếm user------------------*/


/**-------------Hàm này được dùng để hiện thị trang thêm user--------------------------------- */
router.get('/create', controller.create);
/**------------Hết hàm thêm thông tin người dùng------------- */

/**------------Hàm này tìm lấy dữ liệu người dùng và gắn id phía sau router cài này gọi là router parameter-------------------------------*/
router.get('/:id', controller.get);
/**------------------------------Hết trang chi tiết thông tin người dùng------------------------------------------------- */


/**----------Hàm này được dùng để lấy giá trị của form để lưu vào trong data----------------------------------------------*/
router.post('/create',
    upload.single('avatar'), // truyền thêm một middleware vào để lưu ảnh hàm này làm của thư viện 
    validate.postCreate,
    controller.postCreate
);
/**-----------------------------Hết phần lấy lưu thông tin người dùng---------------------------------*/

module.exports = router;