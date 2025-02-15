import speakeasy from "speakeasy";

export default (_: unknown, { userId }: {userId: string}) => {
    // if (!userId) throw new Error("userId обязателен");

    const secret = speakeasy.generateSecret({ length: 20 });
    // users2FA.set(userId, secret.base32);

    const otpauthUrl = secret.otpauth_url;
    // const qrCode = await QRCode.toDataURL(otpauthUrl);

    return { secret: secret.base32, qrCode: userId, otpauthUrl };
}
