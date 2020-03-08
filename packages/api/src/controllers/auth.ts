import { createResponse, getError } from '../helpers'
import { WST_login, WST_status } from '../helpers/requests'

/*
 *   POST /api/v1/status
 *
 *   ENCODED
 *   REQ: {
 *     login: {
 *       identifier: String,
 *       password: String,
 *     }
 *   }
 *
 *   RES: {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean
 *     }
 *   }
 */
export async function getStatus(req, res, next) {
    // get stringified tokens from header
    const rawTokens = req.header('tokens')

    if (rawTokens === 'null') {
        return res.json(
            createResponse(200, 'Auth token missing or expired', null, true)
        )
    }

    let statusResponse
    const tokens = JSON.parse(rawTokens)

    console.log('tokens', tokens)

    try {
        statusResponse = await WST_status(tokens)
    } catch (error) {
        return res.json(createResponse(200, getError(error), null, true))
    }

    res.json(createResponse(200, 'Authenticated', statusResponse, false))
}

/*
 *   POST /api/v1/login
 *
 *   ENCODED
 *   REQ: {
 *     login: {
 *       identifier: String,
 *       password: String,
 *     }
 *   }
 *
 *   RES: {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean
 *     }
 *   }
 */
export async function login(req, res, next) {
    const credentials = { ...req.body }

    if (!credentials.email) {
        return res.json(
            createResponse(200, 'An email needs to be present', null, true)
        )
    }

    if (!credentials.password) {
        return res.json(
            createResponse(200, 'A password needs to be present', null, true)
        )
    }

    let loginResponse
    try {
        loginResponse = await WST_login(credentials)
    } catch (error) {
        return res.json(createResponse(200, getError(error), null, true))
    }

    const tokens = {
        access: loginResponse.headers['x-access-token'],
        refresh: loginResponse.headers['x-refresh-token'],
    }

    res.json(
        createResponse(
            200,
            'Successfully logged in!',
            { ...loginResponse.data, tokens },
            false
        )
    )
}
