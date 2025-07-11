package edu.birzeit.monitoringsystem.gateway.security.oauth2;

import org.springframework.security.jwt.crypto.sign.SignatureVerifier;

/**
 * Abstracts how to create a {@link SignatureVerifier} to verify JWT tokens with a public key.
 * Implementations will have to contact the OAuth2 authorization server to fetch the public key
 * and use it to build a {@link SignatureVerifier} in a server specific way.
 *
 * @see UaaSignatureVerifierClient
 */
public interface OAuth2SignatureVerifierClient {
    /**
     * Returns the {@link SignatureVerifier} used to verify JWT tokens.
     * Fetches the public key from the Authorization server to create
     * this verifier.
     *
     * @return the new verifier used to verify JWT signatures.
     * Will be null if we cannot contact the token endpoint.
     * @throws Exception if we could not create a {@link SignatureVerifier} or contact the token endpoint.
     */
    SignatureVerifier getSignatureVerifier() throws Exception;
}
