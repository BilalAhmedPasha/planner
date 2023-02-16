export const errorMessagesMap = {
  "auth/wrong-password": "Password is incorrect.",
  "auth/email-already-in-use":
    "The email address is already in use by another account.",
  "auth/too-many-requests":
    "We have blocked all requests from this user due to unusual activity. Try again later.",
  "auth/code-expired":
    "The SMS code has expired. Please re-send the verification code to try again.",
  "auth/credential-already-in-use":
    "This credential is already associated with a different account.",
  "auth/requires-recent-login":
    "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
  "auth/cancelled-popup-request":
    "This operation has been cancelled due to another conflicting popup being opened.",
  "auth/invalid-verification-code":
    "The SMS verification code used to create the account is incorrect. Please resend the verification code sms and be sure to use the verification code provided by the user.",
  "auth/invalid-email": "The email address is invalid.",
  "auth/invalid-verification-id":
    "The verification ID used to create the account is invalid.",
  "auth/missing-phone-number":
    "To send verification codes, provide a phone number for the recipient.",
  "auth/missing-verification-id":
    "The account was created with an empty verification ID.",
  "auth/app-deleted": "This instance of planner app has been deleted.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
  "auth/network-request-failed":
    "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
  "auth/popup-blocked":
    "Unable to establish a connection with the popup. It may have been blocked by the browser.",
  "auth/popup-closed-by-user":
    "The popup has been closed by the user before finalizing the operation.",
  "auth/provider-already-linked":
    "User can only be linked to one identity for the given provider.",
  "auth/quota-exceeded":
    "The planner app quota for this operation has been exceeded.",
  "auth/redirect-cancelled-by-user":
    "The redirect operation has been cancelled by the user before finalizing.",
  "auth/redirect-operation-pending":
    "A redirect sign-in operation is already pending.",
  "auth/rejected-credential": "The request contains mismatching credentials.",
  "auth/timeout": "The operation has timed out.",
  "auth/user-token-expired":
    "The user's credential is no longer valid. The user must sign in again.",
  "auth/user-cancelled":
    "The user did not grant your application the permissions it requested.",
  "auth/user-not-found":
    "There is no user account corresponding to this identifier or the account may have been deleted.",
  "auth/user-disabled": "The account has been disabled by an administrator.",
  "auth/user-mismatch":
    "The credentials do not correspond to the previously signed in user.",
  "auth/user-signed-out": "The user is signed out",
  "auth/weak-password": "The password must be 6 characters long or more.",
  "auth/web-storage-unsupported":
    "This browser is not supported or 3rd party cookies and data may be disabled.",
};
