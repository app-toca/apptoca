/**
 * @api {post} /users/:org_id/:password_org Create a user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiPermission Public
 * @apiDescription If is the first User of Organization, he is set is_adm and is_owner to true.
 *
 * @apiParam {string} org_id Organization unique ID.
 * @apiParam {string} password_org Organization password.
 *
 * @apiBody {string} name Name of the User.
 * @apiBody {string} nickname Nickname of the User.
 * @apiBody {string} email Email of the User (UNIQUE).
 * @apiBody {number} age Age of the User.
 * @apiBody {number} year Time of the User in Organization.
 * @apiBody {string} course Sector or Course of the User in Organization.
 * @apiBody {string} phrase Phrase of the User.
 * @apiBody {string} img Perfil Image of the User. ???????????????????????
 *
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
 * @apiError {403} message Incorrect organization password.
 * @apiError {404} message Organization not found.
 * @apiError {400} message User Already Exists (Verify by email).
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
