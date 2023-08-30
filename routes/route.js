const router = require('express').Router();
const ctrl = require('../controllers/contoller');
const upload = require('../helpers/localFileUpload')

router.route('/create-product').post(ctrl.createProduct);
router.route('/get-products').get(ctrl.getProducts);
router.route('/findone-product/:id').get(ctrl.findOneProduct);
router.route('/update-product/:id').put(ctrl.updateProduct);
router.route('/delete-product/:id').delete(ctrl.deleteProduct);
router.route('/image-upload').post(upload.single('image'),ctrl.imageUpload);



module.exports = router;