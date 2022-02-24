const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID_G);

const googleVerify = async (tokenId) => {
     const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: process.env.CLIENT_ID_G,
     });

     const { name: nickname, picture: img, email } = ticket.getPayload();

     return { nickname, img, email };
};

module.exports = { googleVerify };
