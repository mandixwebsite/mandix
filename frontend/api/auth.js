/**
 * Vercel Serverless Function — GitHub OAuth Proxy for Decap CMS
 *
 * Decap CMS cannot directly complete the GitHub OAuth flow from the browser
 * because it requires a server-side secret exchange. This tiny function acts
 * as that proxy. It handles:
 *
 *   GET /api/auth?code=xxx  →  Exchanges code for access token with GitHub
 *                           →  Posts token back to Decap CMS window via postMessage
 *
 * Required environment variables (set in Vercel dashboard):
 *   GITHUB_CLIENT_ID      — from your GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  — from your GitHub OAuth App
 *
 * GitHub OAuth App setup:
 *   https://github.com/settings/developers → OAuth Apps → New OAuth App
 *   Authorization callback URL: https://YOUR_VERCEL_DOMAIN/api/auth
 *
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  const { code } = req.query

  const CLIENT_ID = process.env.GITHUB_CLIENT_ID
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).send(renderError(
      'Server misconfiguration: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set in Vercel environment variables.'
    ))
  }

  if (!code) {
    return res.status(400).send(renderError('Missing OAuth code parameter.'))
  }

  try {
    // Exchange the temporary code for a GitHub access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error) {
      return res.status(401).send(renderError(`GitHub OAuth error: ${tokenData.error_description ?? tokenData.error}`))
    }

    const token = tokenData.access_token

    // Send the token back to the Decap CMS window via postMessage.
    // Decap CMS listens for this exact format.
    return res.status(200).send(renderSuccess(token))

  } catch (err) {
    console.error('[OAuth Proxy] Error:', err)
    return res.status(500).send(renderError('Failed to exchange OAuth code. Please try again.'))
  }
}

// ── HTML templates ──────────────────────────────────────────────────────────

function renderSuccess(token) {
  // Decap CMS expects this postMessage format to complete authentication
  const content = JSON.stringify({ token, provider: 'github' })
  return `<!DOCTYPE html>
<html>
  <head><title>Authenticating...</title></head>
  <body>
    <script>
      (function() {
        function receiveMessage(e) {
          console.log('[OAuth] Sending token to opener');
          window.opener.postMessage(
            'authorization:github:success:${content.replace(/"/g, '\\"')}',
            e.origin
          );
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
    <p style="font-family:sans-serif;text-align:center;margin-top:40px">
      Authenticating with GitHub... this window will close automatically.
    </p>
  </body>
</html>`
}

function renderError(message) {
  return `<!DOCTYPE html>
<html>
  <head><title>Auth Error</title></head>
  <body>
    <script>
      window.opener && window.opener.postMessage(
        'authorization:github:error:${message.replace(/'/g, "\\'")}',
        '*'
      );
    </script>
    <p style="font-family:sans-serif;color:#c00;text-align:center;margin-top:40px">
      Authentication failed: ${message}
    </p>
    <p style="font-family:sans-serif;text-align:center">
      <a href="javascript:window.close()">Close this window</a>
    </p>
  </body>
</html>`
}
