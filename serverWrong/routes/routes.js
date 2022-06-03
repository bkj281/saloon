const { Router } = require('express');

const authController = require('../middleware/authControllers');
const router = Router();


router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/verifyuser', authController.verifyuser)
router.post('/shopDetails', authController.shopkeeper)
router.get('/shops', authController.shops)
router.get('/data', authController.Data)
router.get('/shopfilter', authController.shopfilterer)
router.get('/shop/:id', authController.singleShop)
router.put('/serviceUpdate/:id', authController.updateServices)
// router.post('/:id', authController.addServices)
router.post('/bookorder', authController.bookOrder)
router.get('/getBookedOrders/:id', authController.getBookedOrders)
router.get('/UserOrder/:id', authController.UserOrders)



// router.post('/:id',upload.single("image"), authController.addServices)

router.get('/logout', authController.logout)


module.exports = router;

