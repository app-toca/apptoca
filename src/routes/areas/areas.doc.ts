/**
 * @api {post} /areas Create a Area
 * @apiName CreateArea
 * @apiGroup Areas
 * @apiPermission Owner
 * @apiUse HeaderToken
 *
 * @apiBody {string} name Name of the Area.
 * @apiBody {string} description Description of the Area.
 *
 * @apiSuccess (Success 201) {string} name Name of the Area.
 * @apiSuccess (Success 201) {string} description Description of the Area.
 * @apiSuccess (Success 201) {object} organization Organization of the Area.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.id Id of the Organization.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.name Name of the Organization.
 * @apiSuccess (Success 201) {string} id Id of the Area.
 * 
 * @apiSuccessExample Success-Response:
{
	"name": "Administração",
	"description": "Nos fazemos tabelas",
	"organization": {
		"id": "298410e...,
		"name": "JP testinf"
	},
	"id": "e3419c6..."
}
 *
 * @apiUse CheckOrganizationErrors
 * 
 */

/**
 * @api {get} /areas List all Areas
 * @apiName ListArea
 * @apiGroup Areas
 * @apiPermission Member
 * @apiUse HeaderToken
 * 
 * @apiSuccess (Success 200) {array} Array Array of Areas.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.id Id of The Area.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.name Name of The Area.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.description Description of The Area.
 * @apiSuccess (Success 200) {array} extraInfo.extraInfo.meetings Meetings of The Area.
 * 
 * @apiSuccessExample Success-Response:
[
	{
		"id": "e3419c6...",
		"name": "Administração",
		"description": "Nos fazemos tabelas",
		"meetings": [...]
	},
  {
		"id": "e3419c6...",
		"name": "Administração",
    ...
	}
]
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {get} /areas/:area_id Show a Area
 * @apiName ShowArea
 * @apiGroup Areas
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiParam {string} area_id Area unique ID.
 * 
 * @apiSuccess (Success 200) {array} Array Array of Areas.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.id Id of The Area.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.name Name of The Area.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.description Description of The Area.
 * @apiSuccess (Success 200) {object} extraInfo.extraInfo.organization Organization of The Area.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.extraInfo.extraInfo.id Id of The Organization.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.extraInfo.extraInfo.name Name of The Organization.
 * @apiSuccess (Success 200) {array} extraInfo.extraInfo.meetings Meetings of The Area.
 * 
 * @apiSuccessExample Success-Response:
	{
	"id": "e3419c6...",
	"name": "Administração",
	"description": "Nos fazemos tabelas",
	"organization": {
		"id": "298410e...",
		"name": "JP testinf"
	},
	"meetings": []
}
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {get} /areas/:area_id/user List all users from Area
 * @apiName ListUsersArea
 * @apiGroup Areas
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiParam {string} area_id Area unique ID.
 *
 * @apiSuccess (Success 200) {array} Array Array of Users.
 * @apiSuccess (Success 200) {string} Array.Array.id Id of The User.
 * @apiSuccess (Success 200) {string} Array.Array.name Name of The User.
 * @apiSuccess (Success 200) {string} Array.Array.email Email of The User.
 * @apiSuccess (Success 200) {string} Array.Array.course Course of The User.
 * @apiSuccess (Success 200) {string} Array.Array.nickname Nickname of The User.
 * @apiSuccess (Success 200) {string} Array.Array.img_url Perfil image of The User.
 *
 * @apiSuccessExample Success-Response:
[
  {
    "id": "25fe64f...",
    "name": "João Pedro Porto Teixeira",
    "email": "jp@gmail.com",
    "nickname": "Elitejp",
    "course": "ECA",
    "img": {"url": "http://image"}
  },
  {
    "id": "25fe64f...",
    "name": "João Pedro Porto Teixeira",
    ...
  }
]
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {patch} /areas/:area_id/user Update a Area
 * @apiName UpdateArea
 * @apiGroup Areas
 * @apiPermission Owner
 * @apiUse HeaderToken
 *
 * @apiParam {string} area_id Area unique ID.
 * 
 * @apiBody {string} [name] Name of the Area.
 * @apiBody {string} [description] Description of the Area.
 *
 * @apiSuccess (Success 200) {string} name Name of the Area.
 * @apiSuccess (Success 200) {string} description Description of the Area.
 * @apiSuccess (Success 200) {object} organization Organization of the Area.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.id Id of the Organization.
 * @apiSuccess (Success 200) {string} extraInfo.extraInfo.name Name of the Organization.
 * @apiSuccess (Success 200) {string} id Id of the Area.
 * 
 * @apiSuccessExample Success-Response:
{
	"name": "Administração",
	"description": "Nos fazemos tabelas",
	"organization": {
		"id": "298410e...,
		"name": "JP testinf"
	},
	"id": "e3419c6..."
}
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {delete} /areas/:area_id/user Delete a Area
 * @apiName DeleteArea
 * @apiGroup Areas
 * @apiPermission Owner
 * @apiUse HeaderToken
 *
 * @apiParam {string} area_id Area unique ID.
 *
 * @apiSuccess (Success 204) No_content
 *
 * @apiUse CheckOrganizationErrors
 */
