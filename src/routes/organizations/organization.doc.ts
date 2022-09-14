/**
 * @api {get} /organizations Request a list of Organizations information
 * @apiName ListOrganization
 * @apiGroup Organization
 * @apiPermission Public
 *
 * @apiSuccess {String} id Id of the Organization.
 * @apiSuccess {String} name  Name of the Organization.
 *
 * @apiSuccessExample Success-Response:
 *     [
 *        {
 *          "id": "079bf873-60cf-4e90-b6a7-11958a96f264",
 *          "name": "Test"
 *        },
 *        {
 *          "id": "1abb07a2-ea66-4f03-a5af-86150e9cf6a7",
 *          "name": "Testing"
 *        }
 *     ]
 */

/**
 * @api {get} /organizations/:org_id Request Organization information
 * @apiName GetOrganization
 * @apiGroup Organization
 * @apiPermission Member
 *
 * @apiUse HeaderToken
 *
 *
 * @apiParam {string} org_id Organization unique ID.
 *
 * @apiSuccess {String} id Id of the Organization.
 * @apiSuccess {String} name  Name of the Organization.
 *
 * @apiSuccessExample Success-Response:
 *      {
 *        "id": "64af8d8c-99b1-4e81-b6b6-beee869845b1",
 *        "name": "Testing 8",
 *        "password": "Toca-0914"
 *      }
 *
 * @apiError {404} Organization_Not_Found Organization not found.
 * @apiError {401} [Unauthorizated] Only authenticated can access the data.
 *
 * @apiErrorExample Error-Response:
 *     {
 *	      "status": "error",
 *	      "message": "Unauthorizated"
 *     }
 */

/**
 * @api {post} /organizations Create a Organization
 * @apiName CreateOrganization
 * @apiGroup Organization
 * @apiPermission Public
 *
 * @apiBody {string} name Name of the Organization
 * @apiBody {string} password Password of the Organization to allow user get in
 *
 * @apiSuccess (Success 201) {string} name Name of the Organization
 * @apiSuccess (Success 201) {string} password Password of the Organization to allow user get in.
 * @apiSuccess (Success 201) {string} id Id of the Organization.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "name": "Toca",
 *    "password": "Toca-0912",
 *    "id": "8070b3e3-5..."
 * }
 *
 * @apiError {400} Organization_Already_Exists Exists other organization with the same name.
 */

/**
 * @api {patch} /organizations/:org_id Update a Organization
 * @apiName UpdateOrganization
 * @apiGroup Organization
 * @apiPermission Owner
 * @apiUse HeaderToken
 *
 * @apiParam {string} org_id Organization unique ID.
 *
 * @apiBody {string} name Name of the Organization
 * @apiBody {string} password Password of the Organization to allow user get in
 *
 * @apiSuccess (Success 200) {string} name Name of the Organization
 * @apiSuccess (Success 200) {string} password Password of the Organization to allow user get in.
 * @apiSuccess (Success 200) {string} id Id of the Organization.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "name": "Toca",
 *    "password": "Toca-0912",
 *    "id": "8070b3e3-5..."
 * }
 *
 * @apiError {400} Organization_Already_Exists Exists other organization with the same name.
 * @apiError {404} Organization_Not_Found Organization not found.
 */
