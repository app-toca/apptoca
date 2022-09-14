/**
 * @api {post} /login Login in app
 * @apiName Login
 * @apiGroup Session
 * @apiPermission Public
 *
 * @apiBody {string} email Email of the User
 * @apiBody {string} password Password of the User
 *
 * @apiSuccess (Success 201) {string} token Token of the User to allow user get in.
 * @apiSuccess (Success 201) {object} user User of the Organization.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.id Id of the User.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.name Name of the User.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.email Email of the User.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.nickname Nickname of the User.
 * @apiSuccess (Success 201) {number} extraInfo.extraInfo.age Age of the User.
 * @apiSuccess (Success 201) {number} extraInfo.extraInfo.year Time of the User in Organization.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.course Sector or Course of the User in Organization.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.phrase Phrase of the User.
 * @apiSuccess (Success 201) {boolean} extraInfo.extraInfo.is_active=true Status of the User.
 * @apiSuccess (Success 201) {boolean} extraInfo.extraInfo.is_owner Is the user owner of the Organization?
 * @apiSuccess (Success 201) {boolean} extraInfo.extraInfo.is_admin=false Is the User admin?
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.created_at Created Date.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.updated_at Updated Date.
 * @apiSuccess (Success 201) {object} extraInfo.extraInfo.organization Organization of the User.
 * @apiSuccess (Success 201) {object} extraInfo.extraInfo.img Perfil image of the User.
 *
 *
 */

/**
 * @api {post} /login/forgot-password/:email Use for recover password
 * @apiName ForgotPassword
 * @apiGroup Session
 *
 * @apiParam {string} email email from user.
 *
 */

/**
 * @api {post} /login/change-password/:email Use for recover password
 * @apiName ChangePassword
 * @apiGroup Session
 *
 * @apiParam {string} email email from user.
 *
 */
