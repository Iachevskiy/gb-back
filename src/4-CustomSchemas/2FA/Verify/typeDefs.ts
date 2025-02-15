export default `
   type TwoFAResponse {
    success: Boolean!
  }

  type Mutation {
    verify2FA(userId: String!, token: String!): TwoFAResponse!
  }
`;
