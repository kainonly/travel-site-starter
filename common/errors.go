package common

import "github.com/cloudwego/hertz/pkg/common/errors"

var ErrAuthenticationExpired = errors.NewPublic("Authentication expired, please log in again")
var ErrLoginNotExists = errors.NewPublic("The login account does not exist or is frozen")
var ErrLoginMaxFailures = errors.NewPublic("Login failure exceeded the maximum number of times")
var ErrLoginInvalid = errors.NewPublic("Login verification is invalid")
var ErrSession = errors.NewPrivate("Session establishment failed")
var ErrSessionInconsistent = errors.NewPublic("Inconsistent session tokens")
var ErrTotpInvalid = errors.NewPublic("Invalid password verification code")
var ErrSmsInvalid = errors.NewPublic("SMS verification code is invalid")
var ErrSmsNotExists = errors.NewPublic("The account does not exist or is frozen")
var ErrEmailInvalid = errors.NewPublic("Email verification code is invalid")
var ErrEmailNotExists = errors.NewPublic("The account does not exist or is frozen")
var ErrCodeFrequently = errors.NewPublic("Your CAPTCHA requests are frequent, please try again later")
