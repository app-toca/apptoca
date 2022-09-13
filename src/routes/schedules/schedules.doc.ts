/**
 * @api {post} /schedules Create a list of Schedule
 * @apiName CreateSchedules
 * @apiGroup Schedules
 *
 *
 */

/**
 * @api {get} /schedules List all schedules
 * @apiName ListSchedules
 * @apiGroup Schedules
 *
 *
 */

/**
 * @api {get} /schedules/user/:user_id List all schedules from User
 * @apiName ListSchedulesUser
 * @apiGroup Schedules
 *
 * @apiParam {string} user_id User unique ID.
 *
 */

/**
 * @api {get} /schedules/user/:area_id List all schedules from Area
 * @apiName ListSchedulesArea
 * @apiGroup Schedules
 *
 * @apiParam {string} area_id User unique ID.
 *
 */

/**
 * @api {get} /schedules/hours/days/:day/:hour/:area_id List all schedules from Area, filter by day and hour
 * @apiName ListSchedulesHoursArea
 * @apiGroup Schedules
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
 *
 * @apiParam {string} area_id Area unique ID.
 *
 */

/**
 * @api {patch} /schedules Update Schedules
 * @apiName UpdateSchedules
 * @apiGroup Schedules
 *
 *
 */

/**
 * @api {delete} /schedules Delete all Schedules
 * @apiName DeleteSchedules
 * @apiGroup Schedules
 *
 *
 */
