import { Router } from 'express';
import { authenticateUserSchema, registerUserSchema } from '../dtos/auth';
import { ParamsType, validator } from '../middlewares/validator';
import AuthCtrl from '../controllers/auth';

const controller = new AuthCtrl();
const router = Router();
router.post(
	'/register',
	validator({
		schema: registerUserSchema,
		type: ParamsType.BODY,
	}),
	controller.register
);

router.post(
	'/authenticate',
	validator({
		schema: authenticateUserSchema,
		type: ParamsType.BODY,
	}),
	controller.authenticate
);

router.get(
	'/validate/:token',
	controller.validateToken
)

export default router;