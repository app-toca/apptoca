import { Express } from 'express'
import { areasRoutes } from './areas/areas.routes'
import { commentsRoutes } from './comments/comments.routes'
import { meetingsRoutes } from './meetings/meetings.routes'
import { organizationsRoutes } from './organizations/organizations.routes'
import { usersRoutes } from './users/users.routes'

export const appRoutes = (app: Express) => {
    app.use('/users', usersRoutes())
    app.use('/organizations', organizationsRoutes())
    app.use('/meetings', meetingsRoutes())
    app.use('/comments', commentsRoutes())
    app.use('/areas', areasRoutes())
    
    
}