/**
 * @api {post} /meetings/:area_id Create a Meeting
 * @apiName CreateMeeting
 * @apiGroup Meetings
 * @apiPermission Admin
 * @apiUse HeaderToken
 * 
 * @apiParam {string} area_id Area unique ID.
 *
 * @apiBody {string} description Description of the Meeting.
 * @apiBody {string} duration Duration of the Meeting.
 * @apiBody {string} date_time When the meetings will happens.
 * @apiBody {string} ata Link to the ata for Meeting.
 *
 * @apiSuccess (Success 201) {string} description Description of the Meeting.
 * @apiSuccess (Success 201) {date} date_time When the meetings will happens - ISO8601 (ex.: 2022-08-20T01:10:00).
 * @apiSuccess (Success 201) {string} duration Duration of the Meeting.
 * @apiSuccess (Success 201) {string} ata Link to the ata for Meeting.
 * @apiSuccess (Success 201) {object} user User owner of the Meeting.
 * @apiSuccess (Success 201) {string} user.user.name Name of the User.
 * @apiSuccess (Success 201) {string} user.user.id Id of the User.
 * @apiSuccess (Success 201) {object} area Area of the Organization.
 * @apiSuccess (Success 201) {string} area.area.id Id of the Area.
 * @apiSuccess (Success 201) {string} id Id of the Meeting.
 * @apiSuccess (Success 201) {string} created_at When the Meeting was created.
 * 
 * @apiSuccessExample Success-Response:
{
	"description": "Vamos nos reunir",
	"date_time": "2022-08-20T01:10:00",
	"duration": "1 hora",
	"ata": "https://url",
	"user": {
		"id": "25fe64f...",
		"schedule": [
			{
				"id": "707daaa9-1b22-4751-9750-0d447dd197f3"
			},
			{
				"id": "fc570ea7-c9e0-4a86-a703-97ba85dd62d8"
			},
			{
				"id": "494338c7-aa84-4d0c-a46f-cae9820d00f8"
			}
		]
	},
	"area": {
		"id": "e3419c6..."
	},
	"id": "b735b8b...",
	"created_at": "2022-09-14T19:41:07.286Z"
}
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {get} /meetings List all Meetings
 * @apiName ListMeetings
 * @apiGroup Meetings
 * @apiPermission Member
 * @apiUse HeaderToken
 * 
 * @apiSuccess (Success 200) {array} Array Array of Meetings.
 * @apiSuccess (Success 200) {string} Array.Array.id Id of the Meetings.
 * @apiSuccess (Success 200) {string} Array.Array.description Description of the Meetings.
 * @apiSuccess (Success 200) {string} Array.Array.created_at When the Meetings was created.
 * @apiSuccess (Success 200) {string} Array.Array.date_time When the meetings will happens.
 * @apiSuccess (Success 200) {string} Array.Array.duration Duration of the Meetings.
 * @apiSuccess (Success 200) {string} Array.Array.ata Link to the ata for Meeting.
 * 
 * @apiSuccessExample Success-Response:
[
	{
		"id": "b735b8b...",
		"description": "Vamos nos reunir",
		"created_at": "2022-09-14T19:41:07.286Z",
		"date_time": "2022-08-20",
		"duration": "1 hora",
		"ata": "https://url"
	},
  {
		"id": "b735b8b...",
		"description": "Vamos nos reunir",
		...
	}
]
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {get} /meetings/:meeting_id Show a Meeting
 * @apiName ShowMeeting
 * @apiGroup Meetings
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiParam {string} meeting_id Meeting unique ID.
 * 
 * @apiSuccess (Success 200) {string} id Id of the Meetings.
 * @apiSuccess (Success 200) {string} description Description of the Meetings.
 * @apiSuccess (Success 200) {string} created_at When the Meetings was created.
 * @apiSuccess (Success 200) {string} date_time When the meetings will happens.
 * @apiSuccess (Success 200) {string} duration Duration of the Meetings.
 * @apiSuccess (Success 200) {string} ata Link to the ata for Meeting.
 * 
 * @apiSuccessExample Success-Response:
{
	"id": "b735b8bc-83ce-4f2e-8981-43200fafd831",
	"description": "Vamos nos reunir",
	"created_at": "2022-09-14T19:41:07.286Z",
	"date_time": "2022-08-20",
	"duration": "1 hora",
	"ata": "https://url"
}
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {get} /meetings/area/:area_id List all Meetings from Area
 * @apiName ListMeetingsArea
 * @apiGroup Meetings
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiParam {string} area_id Area unique ID.
 *
 * @apiSuccess (Success 200) {array} Array Array of the Meetings from Area.
 * @apiSuccess (Success 200) {string} Array.Array.id Id of the Meetings.
 * @apiSuccess (Success 200) {string} Array.Array.description Description of the Meetings.
 * @apiSuccess (Success 200) {string} Array.Array.created_at When the Meetings was created.
 * @apiSuccess (Success 200) {string} Array.Array.date_time When the meetings will happens.
 * @apiSuccess (Success 200) {string} Array.Array.duration Duration of the Meetings.
 * @apiSuccess (Success 200) {string} Array.Array.ata Link to the ata for Meeting.
 * 
 * @apiSuccessExample Success-Response:
[
{
	"id": "b735b8b...",
	"description": "Vamos nos reunir",
	"created_at": "2022-09-14T19:41:07.286Z",
	"date_time": "2022-08-20",
	"duration": "1 hora",
	"ata": "https://url"
},
{
	"id": "b735b8b...",
	"description": "Vamos nos reunir",
	...
}
]
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {patch} /meetings/:meeting_id Update a Meeting
 * @apiName UpdateMeeting
 * @apiGroup Meetings
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} meeting_id Meeting unique ID.
 * 
 * @apiBody {string} [description] Description of the Meeting.
 * @apiBody {string} [duration] Duration of the Meeting.
 * @apiBody {string} [date_time] When the meetings will happens.
 * @apiBody {string} [ata] Link to the ata for Meeting.
 *
 * @apiSuccess (Success 200) {string} id Id of the Meetings.
 * @apiSuccess (Success 200) {string} description Description of the Meetings.
 * @apiSuccess (Success 200) {string} created_at When the Meetings was created.
 * @apiSuccess (Success 200) {string} date_time When the meetings will happens.
 * @apiSuccess (Success 200) {string} duration Duration of the Meetings.
 * @apiSuccess (Success 200) {string} ata Link to the ata for Meeting.
 * 
 * @apiSuccessExample Success-Response:
{
	"id": "b735b8b...",
	"description": "Vamos nos reunir",
	"created_at": "2022-09-14T19:41:07.286Z",
	"date_time": "2022-08-20",
	"duration": "1 hora",
	"ata": "https://url"
}
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {delete} /meetings/:meeting_id Delete a Meeting
 * @apiName DeleteMeeting
 * @apiGroup Meetings
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} meeting_id Meeting unique ID.
 *
 * @apiSuccess (Success 204) No_content
 *
 * @apiUse CheckOrganizationErrors
 */
