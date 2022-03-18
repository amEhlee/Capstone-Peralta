package com.capstone.peralta.exceptions;

import org.springframework.security.core.AuthenticationException;

public class EmailNotFoundException extends AuthenticationException {
    public EmailNotFoundException(String msg) { super(msg); }
    public EmailNotFoundException(String msg, Throwable cause) {
            super(msg, cause);
        }

}
