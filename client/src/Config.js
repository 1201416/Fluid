export const config = {
    appId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    redirectUrl: "http://localhost:3000" | undefined,
    scopes: [
        'user.read'
    ]
}