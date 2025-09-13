import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-2_PL0uhAXtu", // Remember to hide these in AWS amplify env variables
    ClientId: "6vr341tq7hqvg3o3ffetjjn1l"
};

export const userPool = new CognitoUserPool(poolData);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();
        if (!cognitoUser) {
            return resolve(null);
        }

        cognitoUser.getSession((err, session) => {
            if (err || !session.isValid()) {
                return resolve(null);
            }
            resolve({
                username: cognitoUser.getUsername(),
                email: session.getIdToken().decodePayload().email,
                idToken: session.getIdToken().getJwtToken(),
                accessToken: session.getAccessToken().getJwtToken(),
                refreshToken: session.getRefreshToken().getToken()
            });
        })
    })
}

