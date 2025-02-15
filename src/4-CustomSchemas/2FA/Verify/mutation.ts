import speakeasy from "speakeasy";

export default (_: unknown, { userId, token }: {userId: string, token: string}) => {
    const secret = "LZTUEVRMGNJTEMBIOY7XMKRELNGU6Q3M";
    // if (!secret) throw new Error("2FA для пользователя не настроена");
    //
    const verified = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 2,
    });

    return { success: verified };

}
