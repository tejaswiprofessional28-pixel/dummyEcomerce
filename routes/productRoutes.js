import express from 'express';
import { productAdd , productGet} from "../controller/productController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { upload } from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/addproduct', authMiddleware, adminMiddleware, upload.single("imageUrl"), productAdd);
productRouter.get('/getproduct', authMiddleware, productGet);

export default productRouter;