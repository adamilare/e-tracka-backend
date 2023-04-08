import express, { Router } from 'express'
import authRouter from '../modules/auth/auth.route'
import userRouter from '../modules/user/user.route'

const router = express.Router()

interface RoutesInterface {
  path: string, route: Router
}

const routes: RoutesInterface[] = [
  {
    path: '/auth',
    route: authRouter
  },
  {
    path: '/users',
    route: userRouter
  }
]

routes.forEach(route => router.use(route.path, route.route));

export default router;