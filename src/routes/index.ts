import { Router } from 'express'
import { authRoutes } from './authRoutes'
import { customerRoutes } from './customerRoutes'
import { adminRoutes } from './adminRoutes'
import { VerificationMiddlaware } from '../app/middlawares/VerificationMiddlaware'

const routes = Router()

const verificationMiddlaware = new VerificationMiddlaware()

routes.use(verificationMiddlaware.verifyPaginationQueryParans)
routes.use(authRoutes)
routes.use(customerRoutes)
routes.use(adminRoutes)

export { routes }
