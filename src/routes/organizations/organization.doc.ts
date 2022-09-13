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
 *     HTTP/1.1 200 OK
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
 * @apiPermission Private
 *
 * @apiHeader (UserToken) {string} Authorization The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 * {
 *    Authorization: "Bearer 8070b..."
 * }
 *
 *
 * @apiParam {string} org_id Organization unique ID.
 *
 * @apiSuccess {String} id Id of the Organization.
 * @apiSuccess {String} name  Name of the Organization.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "id": "64af8d8c-99b1-4e81-b6b6-beee869845b1",
 *        "name": "Testing 8",
 *        "password": "Toca-0914"
 *      }
 *
 * @apiError {404} OrganizationNotFound Organization not found.
 * @apiError {401} [Unauthorizated] Only authenticated can access the data.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *	      "status": "error",
 *	      "message": "Unauthorizated"
 *     }
 */

/**
 * @api {post} /organizations Create a Organization
 * @apiName CreateOrganization
 * @apiGroup Organization
 *
 *
 */

/**
 * @api {patch} /organizations/:org_id Update a Organization
 * @apiName UpdateOrganization
 * @apiGroup Organization
 *
 * @apiParam {string} org_id Organization unique ID.
 *
 */
