/**
 * @apiDefine Owner Only owner of the organization
 */

/**
 * @apiDefine Public Any one
 */

/**
 * @apiDefine Member Only members of the organization
 */

/**
 * @apiDefine AreaMember Only members of the area's organization
 */

/**
 * @apiDefine Admin Only admins of the organization
 */

/**
 * @apiDefine AreaAdmin Only admins of the area's organization
 */

/**
 * @apiDefine CommentOwner Only owner of the comments
 */

/**
 * @apiDefine ReactOwner Only owner of the reactions
 */

/**
 * @apiDefine AdminAndOwner Admin of the organization or Request's Onwer
 */

/**
 * @apiDefine OwnerAndOwner Owner of the organization or Request's Onwer
 */

/**
 * @apiDefine HeaderToken
 *
 * @apiHeader {string} Authorization The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 * {
 *    Authorization: "Bearer 8070b..."
 * }
 */

/**
 * @apiDefine CheckOrganizationErrors
 *
 * @apiError {401} Unauthorizated Not have acess to other organizations.
 * @apiError {404} User_not_found User not found.
 * @apiError {401} Invalid_Token Invalid Token.
 */
