/**
 * @api {post} /posts/:area_id Create a Post
 * @apiName CreateArea
 * @apiGroup Posts
 * @apiPermission Admin
 * @apiUse HeaderToken
 * 
 * @apiParam {string} area_id Area unique ID.
 *
 * @apiBody {string} content Content of the Post.
 *
 * @apiSuccess (Success 201) {object} user User owner of the Post.
 * @apiSuccess (Success 201) {string} user.user.name Name of the User.
 * @apiSuccess (Success 201) {string} user.user.id Id of the User.
 * @apiSuccess (Success 201) {object} area Area of the Organization.
 * @apiSuccess (Success 201) {string} area.area.id Id of the Area.
 * @apiSuccess (Success 201) {string} area.area.name Name of the Area.
 * @apiSuccess (Success 201) {string} content Content of the Post.
 * @apiSuccess (Success 201) {string} id Id of the Post.
 * @apiSuccess (Success 201) {string} created_at When the Post was created.
 * @apiSuccess (Success 201) {string} updated_at When the Post was updated.
 * 
 * @apiSuccessExample Success-Response:
{
	"user": {
		"id": "25fe64f4-6251-4abc-a80c-b25063cb2333",
		"name": "João Pedro Porto"
	},
	"area": {
		"id": "e3419c65-e3d3-4cbb-8e51-ba009c46db9c",
		"name": "Markting"
	},
	"content": "isso é um post para te iluminar",
	"id": "b8a38556-1dac-4994-ac0b-0f7bdd788c2a",
	"created_at": "2022-09-14T14:56:03.149Z",
	"updated_at": "2022-09-14T14:56:03.149Z"
}
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {get} /posts List all Posts
 * @apiName ListPosts
 * @apiGroup Posts
 * @apiPermission Member
 * @apiUse HeaderToken
 * 
 * @apiSuccess (Success 200) {array} Array Array of Posts.
 * @apiSuccess (Success 200) {string} Array.Array.id Id of the Post.
 * @apiSuccess (Success 200) {string} Array.Array.content Content of the Post.
 * @apiSuccess (Success 200) {string} Array.Array.created_at When the Post was created.
 * @apiSuccess (Success 200) {string} Array.Array.updated_at When the Post was updated.
 * @apiSuccess (Success 200) {object} Array.Array.user User owner of the Post.
 * @apiSuccess (Success 200) {string} Array.Array.user.user.id Id of the User.
 * @apiSuccess (Success 200) {string} Array.Array.user.user.img Profile Image of the User.
 * @apiSuccess (Success 200) {object} Array.Array.area Area of the Post.
 * @apiSuccess (Success 200) {array} Array.Array.reactions Reactions in the Post.
 * 
 * @apiSuccessExample Success-Response:
[
	{
		"id": "b8a38556-1dac-4994-ac0b-0f7bdd788c2a",
		"content": "isso é um post para te iluminar",
		"created_at": "2022-09-14T14:56:03.149Z",
		"updated_at": "2022-09-14T14:56:03.149Z",
		"user": {
			"id": "25fe64f4-6251-4abc-a80c-b25063cb2333",
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
			],
			"img": {
				"id": "6b8e1e5e-8cca-4b99-8899-fd318b453ed9",
				"url": "criei a img"
			}
		},
		"area": {
			"id": "e3419c65-e3d3-4cbb-8e51-ba009c46db9c"
		},
		"reactions": []
	}
]
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {get} /posts/:post_id Show a Post
 * @apiName ShowPost
 * @apiGroup Posts
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiParam {string} post_id Post unique ID.
 * 
 * @apiSuccess (Success 200) {string} id Id of the Post.
 * @apiSuccess (Success 200) {string} content Content of the Post.
 * @apiSuccess (Success 200) {string} created_at When the Post was created.
 * @apiSuccess (Success 200) {string} updated_at When the Post was updated.
 * @apiSuccess (Success 200) {object} user User owner of the Post.
 * @apiSuccess (Success 200) {string} user.user.id Id of the User.
 * @apiSuccess (Success 200) {string} user.user.name Name of the User.
 * @apiSuccess (Success 200) {string} user.user.nickname Nickname of the User.
 * @apiSuccess (Success 200) {string} user.user.img Profile Image of the User.
 * @apiSuccess (Success 200) {object} area Area of the Post.
 * @apiSuccess (Success 200) {array} reactions Reactions in the Post.
 * 
 * @apiSuccessExample Success-Response:
{
	"id": "b8a38556-1dac-4994-ac0b-0f7bdd788c2a",
	"content": "isso é um post para te iluminar",
	"created_at": "2022-09-14T14:56:03.149Z",
	"updated_at": "2022-09-14T14:56:03.149Z",
	"user": {
		"id": "25fe64f4-6251-4abc-a80c-b25063cb2333",
		"name": "João Pedro Porto",
		"nickname": "Elitejp",
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
		],
		"img": {
			"id": "6b8e1e5e-8cca-4b99-8899-fd318b453ed9",
			"url": "criei a img"
		}
	},
	"area": {
		"id": "e3419c65-e3d3-4cbb-8e51-ba009c46db9c",
		"name": "Markting"
	},
	"comments": [],
	"reactions": []
}
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {get} /posts/area/:area_id List all posts from Area
 * @apiName ListPostsArea
 * @apiGroup Posts
 * @apiPermission Member
 * @apiUse HeaderToken
 *
 * @apiParam {string} area_id Area unique ID.
 *
 * @apiSuccess (Success 200) {string} id Id of the Post.
 * @apiSuccess (Success 200) {string} content Content of the Post.
 * @apiSuccess (Success 200) {string} created_at When the Post was created.
 * @apiSuccess (Success 200) {string} updated_at When the Post was updated.
 * @apiSuccess (Success 200) {object} area Area owner of the Post.
 * @apiSuccess (Success 200) {string} area.area.id Id of the Area.
 * @apiSuccess (Success 200) {string} area.area.name Name of the Area.
 * @apiSuccess (Success 200) {object} user User owner of the Post.
 * @apiSuccess (Success 200) {string} user.user.id Id of the User.
 * @apiSuccess (Success 200) {string} user.user.name Name of the User.
 * @apiSuccess (Success 200) {string} user.user.nickname Nickname of the User.
 * @apiSuccess (Success 200) {string} user.user.img Profile Image of the User.
 * @apiSuccess (Success 200) {object} area Area of the Post.
 * @apiSuccess (Success 200) {array} reactions Reactions in the Post.
 *
 * @apiSuccessExample Success-Response:
[
	{
		"id": "b8a38556-1dac-4994-ac0b-0f7bdd788c2a",
		"content": "isso é um post para te iluminar",
		"created_at": "2022-09-14T14:56:03.149Z",
		"updated_at": "2022-09-14T14:56:03.149Z",
		"area": {
			"id": "e3419c65-e3d3-4cbb-8e51-ba009c46db9c",
			"name": "Markting"
		},
		"user": {
			"id": "25fe64f4-6251-4abc-a80c-b25063cb2333",
			"name": "João Pedro Porto",
			"nickname": "Elitejp",
			"schedule": [
				{
					"id": "494338c7-aa84-4d0c-a46f-cae9820d00f8"
				},
				{
					"id": "fc570ea7-c9e0-4a86-a703-97ba85dd62d8"
				},
				{
					"id": "707daaa9-1b22-4751-9750-0d447dd197f3"
				}
			],
			"img": {
				"id": "6b8e1e5e-8cca-4b99-8899-fd318b453ed9",
				"url": "criei a img"
			}
		},
		"reactions": []
	}
]
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {patch} /posts/:post_id Update a Post
 * @apiName UpdatePost
 * @apiGroup Posts
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} post_id Post unique ID.
 * 
 * @apiBody {string} content Content of the Post.
 *
 * @apiSuccess (Success 200) {string} id Id of the Post.
 * @apiSuccess (Success 200) {string} content Content of the Post.
 * @apiSuccess (Success 200) {string} created_at When the Post was created.
 * @apiSuccess (Success 200) {string} updated_at When the Post was updated.
 * @apiSuccess (Success 200) {object} area Area owner of the Post.
 * @apiSuccess (Success 200) {string} area.area.id Id of the Area.
 * @apiSuccess (Success 200) {string} area.area.name Name of the Area.
 * @apiSuccess (Success 200) {object} user User owner of the Post.
 * @apiSuccess (Success 200) {string} user.user.id Id of the User.
 * @apiSuccess (Success 200) {string} user.user.name Name of the User.
 * @apiSuccess (Success 200) {string} user.user.nickname Nickname of the User.
 * @apiSuccess (Success 200) {string} user.user.img Profile Image of the User.
 * @apiSuccess (Success 200) {object} area Area of the Post.
 * @apiSuccess (Success 200) {array} reactions Reactions in the Post.
 *
 * @apiSuccessExample Success-Response:
[
	{
		"id": "b8a38556-1dac-4994-ac0b-0f7bdd788c2a",
		"content": "isso é um post para te iluminar",
		"created_at": "2022-09-14T14:56:03.149Z",
		"updated_at": "2022-09-14T14:56:03.149Z",
		"area": {
			"id": "e3419c65-e3d3-4cbb-8e51-ba009c46db9c",
			"name": "Markting"
		},
		"user": {
			"id": "25fe64f4-6251-4abc-a80c-b25063cb2333",
			"name": "João Pedro Porto",
			"nickname": "Elitejp",
			"schedule": [
				{
					"id": "494338c7-aa84-4d0c-a46f-cae9820d00f8"
				},
				{
					"id": "fc570ea7-c9e0-4a86-a703-97ba85dd62d8"
				},
				{
					"id": "707daaa9-1b22-4751-9750-0d447dd197f3"
				}
			],
			"img": {
				"id": "6b8e1e5e-8cca-4b99-8899-fd318b453ed9",
				"url": "criei a img"
			}
		},
		"reactions": []
	}
]
 *
 * @apiUse CheckOrganizationErrors
 */

/**
 * @api {delete} /posts/:post_id Delete a Post
 * @apiName DeletePost
 * @apiGroup Posts
 * @apiPermission Admin
 * @apiUse HeaderToken
 *
 * @apiParam {string} post_id Post unique ID.
 *
 * @apiSuccess (Success 204) No_content
 *
 * @apiUse CheckOrganizationErrors
 */
