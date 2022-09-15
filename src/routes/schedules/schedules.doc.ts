/**
 * @api {post} /schedules Create a list of Schedule
 * @apiName CreateSchedules
 * @apiGroup Schedules
 * @apiPermission Member
 * @apiUse HeaderToken
 * 
 * @apiBody {Array} array Array of Schedules.
 * @apiBody {number} array.array.day Day of the Schedule (0 to 6 = dom to sat).
 * @apiBody {string} array.array.hour Hour of the Schedules.
 * 
 * @apiSuccess {Array} array Array of Schedules.
 * @apiSuccess {string} array.array.day Day of the Schedules.
 * @apiSuccess {number} array.array.day.day.name Name of the Day (0 to 6 = dom to sat).
 * @apiSuccess {string} array.array.hour hour of the Schedules.
 * @apiSuccess {number} array.array.hour.hour.hour Hour of the Hour.
 *
 * @apiSuccessExample Success-Response:
[
	{
		"day": {
			"name": 0
		},
		"hour": {
			"hour": "20:00"
		}
	},
	{
		"day": {
			"name": 3
		},
		"hour": {
			"hour": "11:00"
		}
	}
]
 *
 */

/**
 * @api {get} /schedules List all schedules
 * @apiName ListSchedules
 * @apiGroup Schedules
 * @apiPermission Admin
 * @apiUse HeaderToken
 * 
 * @apiSuccess {Array} array Array of Schedules.
 * @apiSuccess {string} array.array.id Id of the User.
 * @apiSuccess {string} array.array.name Name of the User.
 * @apiSuccess {array} array.array.schedules Array of Schedule.
 * @apiSuccess {string} array.array.schedules.schedules.id Id of the Schedule.
 * @apiSuccess {object} array.array.schedules.schedules.day Day of the Schedule.
 * @apiSuccess {string} array.array.schedules.schedules.day.day.name Name of the Day (0 to 6 = dom to sat).
 * @apiSuccess {object} array.array.schedules.schedules.hour Hour of the Schedule.
 * @apiSuccess {string} array.array.schedules.schedules.hour.hour.hour Hour of the Hour.
 * 
 * @apiSuccessExample Success-Response:
[
  {
    "id": "25e05f93-0d92-482f-996c-272c84c024e1",
    "name": "Ana",
    "schedules": [
      {
        "id": "79836480-8393-4fa4-b4d6-6d5165b6584f",
        "day": {
          "name": 0
        },
        "hour": {
          "hour": "20:00"
        }
      },
      {
        "id": "104972ae-ee80-4849-b7ee-1386192b12c1",
        ...
    ]
  },
]
 *
 *
 */

/**
 * @api {get} /schedules/user/:user_id List all schedules from User
 * @apiName ListSchedulesUser
 * @apiGroup Schedules
 * @apiPermission AdminAndOwner
 * @apiUse HeaderToken
 *
 * @apiParam {string} user_id User unique ID.
 * 
 * @apiSuccess {array} array.array.schedules Array of Schedule.
 * @apiSuccess {string} array.array.schedules.schedules.id Id of the Schedule.
 * @apiSuccess {object} array.array.schedules.schedules.day Day of the Schedule.
 * @apiSuccess {string} array.array.schedules.schedules.day.day.id ID of the Day
 * @apiSuccess {string} array.array.schedules.schedules.day.day.name Name of the Day (0 to 6 = dom to sat).
 * @apiSuccess {object} array.array.schedules.schedules.hour Hour of the Schedule.
 * @apiSuccess {string} array.array.schedules.schedules.hour.hour.id ID of the Hour.
 * @apiSuccess {string} array.array.schedules.schedules.hour.hour.hour Hour of the Hour.
 * 
 * @apiSuccessExample Success-Response:
[
	{
		"id": "707daaa...",
		"day": {
			"id": "6650a21...",
			"name": 0
		},
		"hour": {
			"id": "a7161ff...",
			"hour": "20:00"
		}
	},
	{
		"id": "fc570ea...",
		...
]
 *
 */

/**
 * @api {get} /schedules/user/:area_id List all schedules from Area
 * @apiName ListSchedulesArea
 * @apiGroup Schedules
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} area_id User unique ID.
 *
 */

/**
 * @api {get} /schedules/hours/days/:day/:hour/:area_id List all schedules from Area, filter by day and hour
 * @apiName ListSchedulesHoursArea
 * @apiGroup Schedules
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {number} day Day of the week - 0 to 6, sun to sat.
 * @apiParam {string} hour Hour of the day - ex. "20:00".
 * @apiParam {string} area_id Area unique ID.
 *
 */

/**
 * @api {get} /schedules/:area_id/report List all schedules from Area, by quantitie
 * @apiName ListSchedulesReport
 * @apiGroup Schedules
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} area_id Area unique ID.
 * 
 * @apiSuccess {array} array.array.schedules Array of Schedule.
 * @apiSuccess {number} array.array.day Day of the week (0 to 6 = dom to sat).
 * @apiSuccess {string} array.array.hour Hour of the day.
 * @apiSuccess {number} array.array.qqt_users Quantitie of User free in the day and hour.
 * 
 * @apiSuccessExample Success-Response:
[
	{
		"day": 5,
		"hour": "20:00",
		"qtt_users": 3
	},
	{
		"day": 6,
		"hour": "21:00",
		"qtt_users": 1
	},
	{
		"day": 4,
		...
]
 *
 */

/**
 * @api {patch} /schedules Update Schedules
 * @apiName UpdateSchedules
 * @apiGroup Schedules
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiBody {Array} array Array of Schedules.
 * @apiBody {number} array.array.day Day of the Schedule (0 to 6 = dom to sat).
 * @apiBody {string} array.array.hour Hour of the Schedules.
 * 
 * @apiSuccess {Array} array Array of Schedules.
 * @apiSuccess {string} array.array.day Day of the Schedules.
 * @apiSuccess {number} array.array.day.day.name Name of the Day (0 to 6 = dom to sat).
 * @apiSuccess {string} array.array.hour hour of the Schedules.
 * @apiSuccess {number} array.array.hour.hour.hour Hour of the Hour.
 *
 * @apiSuccessExample Success-Response:
[
	{
		"day": {
			"name": 0
		},
		"hour": {
			"hour": "20:00"
		}
	},
	{
		"day": {
			"name": 3
		},
		"hour": {
			"hour": "11:00"
		}
	}
]
 *
 */

/**
 * @api {delete} /schedules Delete all Schedules
 * @apiName DeleteSchedules
 * @apiGroup Schedules
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiSuccess (Success 204) No_content
 *
 *
 */
