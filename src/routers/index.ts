import { Router } from 'express';
import * as RouterAuth from './auth';
import * as RouterPlan from './plan';
import * as RouterEvent from './event';
import * as RouterWebHook from './webhook';
import * as RouterPayment from './payment';
import * as RouterSubscription from './subscription';

const router = Router();

router.use('/auth', RouterAuth.default);
router.use('/plan', RouterPlan.default);
router.use('/event', RouterEvent.default);
router.use('/payment', RouterPayment.default);
router.use('/webhook', RouterWebHook.default);
router.use('/subscription', RouterSubscription.default);

export default router;
