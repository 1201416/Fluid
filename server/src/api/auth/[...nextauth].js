import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import axios from 'axios';

const env = process.env;

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET,
      tenantId: env.NEXT_PUBLIC_AZURE_AD_TENANT_ID,
      authorization: {
        params: { scope: 'openid email profile User.Read offline_access' },
      },
      httpOptions: { timeout: 10000 },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.id_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Check if the token is expired
      if (Date.now() < token.accessTokenExpires - 100000) {
        return token;
      }

      // Refresh the access token
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

async function refreshAccessToken(token) {
  try {
    const url = `https://login.microsoftonline.com/${env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;
    const response = await axios.post(url, new URLSearchParams({
      client_id: env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
      client_secret: env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      scope: 'openid email profile User.Read offline_access'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth(authOptions);