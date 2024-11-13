package com.NTK.Compiler.DTO;

public record UserOauthInfo(
        String sub,
        String name,
        String given_name,
        String family_name,
        String picture,
        String email,
        boolean email_verified,
        String locale
) {
}
