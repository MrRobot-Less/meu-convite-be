import { Router } from 'express';
import * as RouterAuth from './auth';
import * as EventsAuth from './event';

const router = Router();

router.use('/auth', RouterAuth.default);
router.use('/event', EventsAuth.default);

export default router;
