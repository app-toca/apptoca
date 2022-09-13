/**
 * @api {post} /users/:org_id/:password_org Create a user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {string} org_id Organization unique ID.
 * @apiParam {string} password_org Organization password.
 *
 */

/**
 * @api {get} /users List all users
 * @apiName ListUsers
 * @apiGroup Users
 *
 *
 */

/**
 * @api {get} /users/:user_id/areas List all Area from a Users
 * @apiName ListAreas
 * @apiGroup Users
 *
 * @apiParam {string} user_id User unique ID.
 *
 */

/**
 * @api {get} /users/:user_id Show a user
 * @apiName ShowUser
 * @apiGroup Users
 *
 * @apiParam {string} user_id User unique ID.
 *
 */

/**
 * @api {patch} /users/:user_id Update a user
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiParam {string} user_id User unique ID.
 *
 */

/**
 * @api {delete} /users/:user_id Delete a user
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {string} user_id Organization unique ID.
 *
 */
