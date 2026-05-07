import redirectUser from "./redirectUser";

const redirectUserWithRole = (token: any) => {
  console.log(token);
  if (token) {
    // const tokenPayload = verifyAccessToken(token.value);
    // if (tokenPayload?.role) {
    //   redirectUser(tokenPayload.role);
    // }
  }
};

export default redirectUserWithRole;
