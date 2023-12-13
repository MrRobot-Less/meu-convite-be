import { Router } from 'express';
import { authenticateUserSchema, registerUserSchema } from '../dtos/auth';
import { ParamsType, validator } from '../middlewares/validator';
import AuthCtrl from '../controllers/auth';

const service = new AuthCtrl();
const router = Router();
router.post(
	'/register',
	validator({
		schema: registerUserSchema,
		type: ParamsType.BODY,
	}),
	service.register
);

router.post(
	'/authenticate',
	validator({
		schema: authenticateUserSchema,
		type: ParamsType.BODY,
	}),
	service.authenticate
);

export default router;