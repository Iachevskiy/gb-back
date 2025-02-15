export default `
  type TwoFA {
    secret: String!
    qrCode: String!
    otpauthUrl: String!
  }

  type Mutation {
    generate2FA(userId: String!): TwoFA!
  }
`;
