/**
 * @api {post} /administration/:user_id/:area_id Create a new realation with user and area
 * @apiName CreateAdministration
 * @apiGroup Administration
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} user_id User unique ID.
 * @apiParam {string} area_id Area password.
 * 
 * @apiSuccess (Success 201) {object} user User of the Organization
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.id id of the User.
 * @apiSuccess (Success 201) {array} extraInfo.extraInfo.schedule Schedules of the User.
 * @apiSuccess (Success 201) {object} area Password of the Organization to allow user get in.
 * @apiSuccess (Success 201) {string} extraInfo.extraInfo.id id of the Area.
 * @apiSuccess (Success 201) {string} id Id of the Relation Area with User.
 * @apiSuccessExample Success-Response:
{
  "user": {
      "id": "cad0a94a-5384-4f5a-8bbf-5af40cd6dbb2",
      "schedule": []
  },
  "area": {
      "id": "f784edb2-d236-4e0a-9d5a-88c5bead1e34"
  },
  "id": "1eb63c51-5170-4ca5-b6e8-89034983c774"
}
 *
 */

/**
 * @api {delete} /administration/:user_id/:area_id Delete a realation with user and area
 * @apiName DeleteAdministration
 * @apiGroup Administration
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} user_id User unique ID.
 * @apiParam {string} area_id Area password.
 *
 * @apiSuccess (Success 204) No_content
 */
