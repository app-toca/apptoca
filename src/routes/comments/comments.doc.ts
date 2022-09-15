/**
 * @api {post} /comments/:post_id Create a Comment
 * @apiName CreateComment
 * @apiGroup Comments
 * @apiPermission Admin
 * @apiUse HeaderToken
 * 
 * @apiParam {string} post_id Post unique ID.
 *
 * @apiBody {string} content Content of the Comment.
 *
 * @apiSuccess (Success 201) {string} content Content of the Comment.
 * @apiSuccess (Success 201) {string} id Id of the Comment.
 * @apiSuccess (Success 201) {string} created_at When the Comment was created.
 * @apiSuccess (Success 201) {string} user User Owner of the Comment ID.
 * @apiSuccess (Success 201) {string} post Post of the Comment.
 * @apiSuccess (Success 201) {string} area Area of the Comment.
 * 
 * @apiSuccessExample Success-Response:
{
	"content": "não gostei desse post",
	"id": "cafc972d-2213-416b-976c-d210cde8bd2f",
	"created_at": "2022-09-14T21:30:08.982Z",
	"user": "25fe64f4-6251-4abc-a80c-b25063cb2333",
	"post": "68ad096d-7ba6-4f50-9675-e55a5e5aed93",
	"area": "Markting"
}
 *
 */

/**
 * @api {get} /comments/:user_id List all Comments from User
 * @apiName ListCommentsUser
 * @apiGroup Comments
 * @apiPermission Member
 * @apiUse HeaderToken
 * 
 * @apiParam {string} user_id Post unique ID.
 * 
 * @apiSuccess (Success 200) {string} id Id of the Comment.
 * @apiSuccess (Success 200) {string} content Content of the Comment.
 * @apiSuccess (Success 200) {string} created_at When the Comment was created.
 * @apiSuccess (Success 200) {object} user User Owner of the Comment.
 * @apiSuccess (Success 200) {string} user.user.id Id of the Comment.
 * 
 * @apiSuccessExample Success-Response:
[
	{
		"id": "cafc972d-2213-416b-976c-d210cde8bd2f",
		"content": "não gostei desse post",
		"created_at": "2022-09-14T21:30:08.982Z",
		"user": {
			"id": "25fe64f..."
		}
	}
]
 *
 */

/**
 * @api {get} /comments/post/:post_id List all Comments from Post
 * @apiName ListCommentsPost
 * @apiGroup Comments
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiParam {string} post_id Post unique ID.
 * 
 * @apiSuccess (Success 200) {string} id Id of the Comment.
 * @apiSuccess (Success 200) {string} content Content of the Comment.
 * @apiSuccess (Success 200) {string} created_at When the Comment was created.
 * @apiSuccess (Success 200) {object} user User Owner of the Comment.
 * @apiSuccess (Success 200) {string} user.user.id Id of the Comment.
 * 
 * @apiSuccessExample Success-Response:
[
	{
		"id": "cafc972d-2213-416b-976c-d210cde8bd2f",
		"content": "não gostei desse post",
		"created_at": "2022-09-14T21:30:08.982Z",
		"user": {
			"id": "25fe64f..."
		}
	}
]
 *
 */

/**
 * @api {patch} /comments/:comment_id Update a Comment
 * @apiName UpdateComment
 * @apiGroup Comments
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} comment_id Comment unique ID.
 * 
 * @apiBody {string} content Content of the Comment.
 *
 * @apiSuccess (Success 200) {string} id Id of the Comment.
 * @apiSuccess (Success 200) {string} content Content of the Comment.
 * @apiSuccess (Success 200) {string} created_at When the Comment was created.
 * @apiSuccess (Success 200) {object} user User Owner of the Comment.
 * @apiSuccess (Success 200) {string} user.user.id Id of the Comment.
 * 
 * @apiSuccessExample Success-Response:
{
  "id": "cafc972d-2213-416b-976c-d210cde8bd2f",
  "content": "não gostei desse post",
  "created_at": "2022-09-14T21:30:08.982Z",
  "user": {
    "id": "25fe64f..."
  }
}
 *
 */

/**
 * @api {delete} /comments/:comment_id Delete a Comment
 * @apiName DeleteComment
 * @apiGroup Comments
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} comment_id Comment unique ID.
 *
 * @apiSuccess (Success 204) No_content
 *
 */
