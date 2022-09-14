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
 * @apiBody {string} password Password of the User.
 * @apiBody {number} age Age of the User.
 * @apiBody {number} year Time of the User in Organization.
 * @apiBody {string} course Sector or Course of the User in Organization.
 * @apiBody {string} phrase Phrase of the User.
 * @apiBody {string} img Perfil Image of the User. ???????????????????????
 *
 * @apiSuccess (Success 201) {string} id Id of the User.
 * @apiSuccess (Success 201) {string} name Name of the User.
 * @apiSuccess (Success 201) {string} email Email of the User.
 * @apiSuccess (Success 201) {string} nickname Nickname of the User.
 * @apiSuccess (Success 201) {number} age Age of the User.
 * @apiSuccess (Success 201) {number} year Time of the User in Organization.
 * @apiSuccess (Success 201) {string} course Sector or Course of the User in Organization.
 * @apiSuccess (Success 201) {string} phrase Phrase of the User.
 * @apiSuccess (Success 201) {boolean} is_active=true Status of the User.
 * @apiSuccess (Success 201) {boolean} is_owner=false Is the user owner of the Organization?
 * @apiSuccess (Success 201) {boolean} is_admin=false Is the User admin?
 * @apiSuccess (Success 201) {string} created_at Created Date.
 * @apiSuccess (Success 201) {string} updated_at Updated Date.
 * @apiSuccess (Success 201) {object} organization Organization of the User.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.id Id of the Organization.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.name Name of the Organization.
 * @apiSuccess (Success 201) {object} img Perfil image of the User.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.id Id of the Image.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.url Url of the Image.
 *
 * @apiSuccessExample Success-Response:
 * {
 *	"id": "25fe64f4-6251-4abc-a80c-b25063cb2333",
 *	"name": "João Pedro Porto Teixeira",
 *	"email": "jp@gmail.com",
 *	"nickname": "Elitejp",
 *	"age": 28,
 *	"year": 5,
 *	"course": "ECA",
 *	"phrase": "Faz o certo para não dar errado",
 *	"organization": {
 *		"id": "298410e4-1b24-4db9-9657-83ec439d3f23",
 *		"name": "JP testinf"
 *	},
 *  "schedule": [...]
 *	"img": {
 *		"id": "6b8e1e5e-8cca-4b99-8899-fd318b453ed9",
 *		"url": "criei a img"
 *	},
 *	"is_owner": true,
 *	"is_adm": true,
 *	"is_active": true,
 *	"created_at": "2022-09-14T11:25:37.587Z",
 *	"updated_at": "2022-09-14T11:25:37.587Z"
 * }
 *
 * @apiError {403} Wrong_Org_Password Incorrect organization password.
 * @apiError {404} Wrong_Org_ID Organization not found.
 * @apiError {400} Exists_Email User Already Exists (Verify by email).
 *
 */

/**
 * @api {get} /users List all users
 * @apiName ListUsers
 * @apiGroup Users
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiSuccess (Success 200) {object[]} Array Array of the Users.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.id Id of the User.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.name Name of the User.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.email Email of the User.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.nickname Nickname of the User.
 * @apiSuccess (Success 200) {number} extraInfo.extraInfo.age Age of the User.
 * @apiSuccess (Success 200) {number} extraInfo.extraInfo.year Time of the User in Organization.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.course Sector or Course of the User in Organization.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.phrase Phrase of the User.
 * @apiSuccess (Success 200) {boolean} extraInfo.extraInfo.is_active=true Status of the User.
 * @apiSuccess (Success 200) {boolean} extraInfo.extraInfo.is_owner=false Is the user owner of the Organization?
 * @apiSuccess (Success 200) {boolean} extraInfo.extraInfo.is_admin=false Is the User admin?
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.created_at Created Date.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.updated_at Updated Date.
 * @apiSuccess (Success 200) {object} extraInfo.extraInfo.organization Organization of the User.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.extraInfo.extraInfo.id Id of the Organization.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.extraInfo.extraInfo.name Name of the Organization.
 * @apiSuccess (Success 200) {object} extraInfo.extraInfo.img Perfil image of the User.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.extraInfo.extraInfo.id Id of the Image.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.extraInfo.extraInfo.url Url of the Image.
 *
 * @apiSuccessExample Success-Response:
 * [
 * {
 *	"id": "25fe64f...",
 *	"name": "João Pedro Porto Teixeira",
 *	"email": "jp@gmail.com",
 *	"nickname": "Elitejp",
 *	"age": 28,
 *	"year": 5,
 *	"course": "ECA",
 *	"phrase": "Faz o certo para não dar errado",
 *	"organization": {
 *		"id": "298410...",
 *		"name": "JP testinf"
 *	},
 *  "schedule": [...]
 *	"img": {
 *		"id": "6b8e1e...",
 *		"url": "criei a img"
 *	},
 *	"is_owner": true,
 *	"is_adm": true,
 *	"is_active": true,
 *	"created_at": "2022-09-14T11:25:37.587Z",
 *	"updated_at": "2022-09-14T11:25:37.587Z"
 * },
 * {
 *	"id": "25fe64f...",
 *	"name": "João Pedro Porto Teixeira",
 *	"email": "jp@gmail.com",
 *	"nickname": "Elitejp",
 * }
 * ]
 *
 */

/**
 * @api {get} /users/:user_id/areas List all Area from a Users
 * @apiName ListAreas
 * @apiGroup Users
 * @apiPermission AdminAndOwner
 * @apiUse HeaderToken
 *
 * @apiParam {string} user_id User unique ID.
 *
 * @apiSuccessExample Success-Response:
 * [
 *	{
 *		"id": "e3419c65-e3d3-4cbb-8e51-ba009c46db9c",
 *		"name": "Administração",
 *		"description": "Nos fazemos tabelas",
 *		"organization": {
 *			"id": "298410e4-1b24-4db9-9657-83ec439d3f23",
 *			"name": "JP testinf",
 *			"password": "JP-2907"
 *		},
 *		"meetings": []
 *	}
 * ]
 *
 */

/**
 * @api {get} /users/:user_id Show a user
 * @apiName ShowUser
 * @apiGroup Users
 * @apiPermission AdminAndOwner
 * @apiUse HeaderToken
 *
 * @apiParam {string} user_id User unique ID.
 *
 * @apiSuccessExample Success-Response:
 * {
 *	"id": "25fe64f...",
 *	"name": "João Pedro Porto Teixeira",
 *	"email": "jp@gmail.com",
 *	"nickname": "Elitejp",
 *	"age": 28,
 *	"year": 5,
 *	"course": "ECA",
 *	"phrase": "Faz o certo para não dar errado",
 *	"organization": {
 *		"id": "298410...",
 *		"name": "JP testinf"
 *	},
 *  "schedule": [...]
 *	"img": {
 *		"id": "6b8e1e...",
 *		"url": "criei a img"
 *	},
 *	"is_owner": true,
 *	"is_adm": true,
 *	"is_active": true,
 *	"created_at": "2022-09-14T11:25:37.587Z",
 *	"updated_at": "2022-09-14T11:25:37.587Z"
 * }
 *
 */

/**
 * @api {patch} /users/:user_id Update a user
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiPermission OwnerAndOwner
 * @apiUse HeaderToken
 *
 * @apiParam {string} user_id User unique ID.
 *
 * @apiBody {string} [name] Name of the User.
 * @apiBody {string} [nickname] Nickname of the User.
 * @apiBody {string} [email] Email of the User (UNIQUE).
 * @apiBody {string} [password] Password of the User.
 * @apiBody {number} [age] Age of the User.
 * @apiBody {number} [year] Time of the User in Organization.
 * @apiBody {string} [course] Sector or Course of the User in Organization.
 * @apiBody {string} [phrase] Phrase of the User.
 * @apiBody {boolean} [is_adm] Set User to Admin - JUST FOR OWNER OF ORGANIZATION.
 *
 *
 * @apiSuccessExample Success-Response:
 * {
 *	"id": "25fe64f...",
 *	"name": "João Pedro Porto Teixeira",
 *	"email": "jp@gmail.com",
 *	"nickname": "Elitejp",
 *	"age": 28,
 *	"year": 5,
 *	"course": "ECA",
 *	"phrase": "Faz o certo para não dar errado",
 *	"organization": {
 *		"id": "298410...",
 *		"name": "JP testinf"
 *	},
 *  "schedule": [...]
 *	"img": {
 *		"id": "6b8e1e...",
 *		"url": "criei a img"
 *	},
 *	"is_owner": true,
 *	"is_adm": true,
 *	"is_active": true,
 *	"created_at": "2022-09-14T11:25:37.587Z",
 *	"updated_at": "2022-09-14T11:25:37.587Z"
 * }
 *
 */

/**
 * @api {delete} /users/:user_id Delete a user
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiPermission OwnerAndOwner
 * @apiUse HeaderToken
 *
 * @apiParam {string} user_id Organization unique ID.
 *
 */
