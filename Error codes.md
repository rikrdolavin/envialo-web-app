# Message Codes Documentation

This document contains all validation and exception messages used throughout the application. Each message is prefixed with a unique code in the format `MSG#` for easy reference and tracking.

---

## Authentication & Login Messages

### MSG1
**Message:** `The email address is required.`  
**Location:** LoginUserRequestDTO validator  
**Type:** Validation

### MSG2
**Message:** `It must be a valid email address.`  
**Location:** LoginUserRequestDTO validator  
**Type:** Validation

### MSG3
**Message:** `The password is required.`  
**Location:** LoginUserRequestDTO validator  
**Type:** Validation

### MSG18
**Message:** `The email address is incorrect or inactive.`  
**Location:** AuthService.Login  
**Type:** Exception

### MSG19
**Message:** `The email address or password is incorrect.`  
**Location:** AuthService.Login  
**Type:** Exception

---

## Token & Refresh Token Messages

### MSG4
**Message:** `The user ID is required.`  
**Location:** RefreshTokenRequestDTO validator  
**Type:** Validation

### MSG5
**Message:** `The refresh token is mandatory.`  
**Location:** RefreshTokenRequestDTO validator  
**Type:** Validation

### MSG11
**Message:** `The token is required.`  
**Location:** ActivateRequestDTO validator  
**Type:** Validation

### MSG14
**Message:** `The token is required.`  
**Location:** ResetPasswordRequestDTO validator  
**Type:** Validation

### MSG20
**Message:** `Invalid refresh token.`  
**Location:** AuthService.RefreshToken  
**Type:** Exception

### MSG23
**Message:** `Invalid or expired token.`  
**Location:** AuthService.ActivationUser  
**Type:** Exception

### MSG25
**Message:** `Invalid or expired token.`  
**Location:** AuthService.ResetPassword  
**Type:** Exception

---

## Password Management Messages

### MSG6
**Message:** `The previous password is required.`  
**Location:** ChangeUserPasswordRequestDTO validator  
**Type:** Validation

### MSG7
**Message:** `A new password is required.`  
**Location:** ChangeUserPasswordRequestDTO validator  
**Type:** Validation

### MSG8
**Message:** `The new password cannot be the same as the old one.`  
**Location:** ChangeUserPasswordRequestDTO validator  
**Type:** Validation

### MSG9
**Message:** `You must repeat the new password.`  
**Location:** ChangeUserPasswordRequestDTO validator  
**Type:** Validation

### MSG10
**Message:** `The passwords do not match.`  
**Location:** ChangeUserPasswordRequestDTO validator  
**Type:** Validation

### MSG12
**Message:** `The email address is required.`  
**Location:** PasswordResetRequestDTO validator  
**Type:** Validation

### MSG13
**Message:** `It must be a valid email address.`  
**Location:** PasswordResetRequestDTO validator  
**Type:** Validation

### MSG15
**Message:** `The new password is required.`  
**Location:** ResetPasswordRequestDTO validator  
**Type:** Validation

### MSG16
**Message:** `You must confirm the new password.`  
**Location:** ResetPasswordRequestDTO validator  
**Type:** Validation

### MSG17
**Message:** `The passwords do not match.`  
**Location:** ResetPasswordRequestDTO validator  
**Type:** Validation

### MSG21
**Message:** `Invalid old password.`  
**Location:** AuthService.ChangeUserPassword  
**Type:** Exception

### MSG22
**Message:** `User not found.`  
**Location:** AuthService.ChangeUserPassword  
**Type:** Exception

### MSG24
**Message:** `Email already exists.`  
**Location:** AuthService.NotExistsEmail  
**Type:** Exception

### MSG24
**Message:** `Email not found.`  
**Location:** AuthService.RequestPasswordReset  
**Type:** Exception

---

## User Registration Messages (Admin)

### MSG26
**Message:** `The email address is required.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

### MSG27
**Message:** `Must be a valid email.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

### MSG28
**Message:** `First name is required.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

### MSG29
**Message:** `Last name is required.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

### MSG30
**Message:** `Password is required.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

### MSG31
**Message:** `You must confirm the password.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

### MSG32
**Message:** `Passwords do not match.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

### MSG33
**Message:** `You must specify at least one role id.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

### MSG34
**Message:** `The roles list cannot be empty.`  
**Location:** RegisterUserByAdminRequestDTO validator  
**Type:** Validation

---

## User Registration Messages (Public)

### MSG51
**Message:** `The email address is required.`  
**Location:** RegisterUserRequestDTO validator  
**Type:** Validation

### MSG52
**Message:** `Must be a valid email.`  
**Location:** RegisterUserRequestDTO validator  
**Type:** Validation

### MSG53
**Message:** `First name is required.`  
**Location:** RegisterUserRequestDTO validator  
**Type:** Validation

### MSG54
**Message:** `Last name is required.`  
**Location:** RegisterUserRequestDTO validator  
**Type:** Validation

### MSG55
**Message:** `Password is required.`  
**Location:** RegisterUserRequestDTO validator  
**Type:** Validation

### MSG56
**Message:** `You must confirm the password.`  
**Location:** RegisterUserRequestDTO validator  
**Type:** Validation

### MSG57
**Message:** `Passwords do not match.`  
**Location:** RegisterUserRequestDTO validator  
**Type:** Validation

---

## Password Policy Messages

### MSG58
**Message:** `Must contain at least 8 characters.`  
**Location:** PasswordRules.PasswordPolicy  
**Type:** Validation

### MSG59
**Message:** `Must contain at least one uppercase letter.`  
**Location:** PasswordRules.PasswordPolicy  
**Type:** Validation

### MSG60
**Message:** `Must contain at least one lowercase letter.`  
**Location:** PasswordRules.PasswordPolicy  
**Type:** Validation

### MSG61
**Message:** `Must contain at least one number.`  
**Location:** PasswordRules.PasswordPolicy  
**Type:** Validation

### MSG62
**Message:** `Must contain at least one special character.`  
**Location:** PasswordRules.PasswordPolicy  
**Type:** Validation

---

## Role Management Messages

### MSG35
**Message:** `The role name is required.`  
**Location:** CreateUpdRolRequestDTO validator  
**Type:** Validation

### MSG36
**Message:** `Must contain at least 3 characters.`  
**Location:** CreateUpdRolRequestDTO validator  
**Type:** Validation

### MSG37
**Message:** `Must contain maximum 50 characters.`  
**Location:** CreateUpdRolRequestDTO validator  
**Type:** Validation

### MSG38
**Message:** `The description is required.`  
**Location:** CreateUpdRolRequestDTO validator  
**Type:** Validation

### MSG39
**Message:** `Must contain maximum 200 characters.`  
**Location:** CreateUpdRolRequestDTO validator  
**Type:** Validation

### MSG40
**Message:** `You must specify at least one permission id.`  
**Location:** AssignPermissionsRequestDTO validator  
**Type:** Validation

### MSG41
**Message:** `The permission list cannot be empty.`  
**Location:** AssignPermissionsRequestDTO validator  
**Type:** Validation

### MSG42
**Message:** `This role name already exists.`  
**Location:** RoleService.CreateRole  
**Type:** Exception

### MSG43
**Message:** `Role not found.`  
**Location:** RoleService.GetRoleById  
**Type:** Exception

### MSG44
**Message:** `System roles cannot be modified.`  
**Location:** RoleService.UpdateRole  
**Type:** Exception

### MSG45
**Message:** `The role name already exists.`  
**Location:** RoleService.UpdateRole  
**Type:** Exception

### MSG46
**Message:** `Role not found.`  
**Location:** RoleService.AssignPermissionToRole  
**Type:** Exception

### MSG64
**Message:** `Role not found.`  
**Location:** RoleService.UpdateRole  
**Type:** Exception

---

## Permission Management Messages

### MSG48
**Message:** `One or more permissions do not exist.`  
**Location:** RoleService.AssignPermissionToRole  
**Type:** Exception

### MSG49
**Message:** `Permissions to remove not found.`  
**Location:** RoleService.RemovePermissionsFromRole  
**Type:** Exception

### MSG50
**Message:** `System permissions cannot be removed.`  
**Location:** RoleService.RemovePermissionsFromRole  
**Type:** Exception

---

## System Error Messages

### MSG63
**Message:** `An internal server error occurred.`  
**Location:** ExceptionHandlingMiddleware  
**Type:** Exception

---

## Summary

- **Total Messages:** 64
- **Validation Messages:** 42
- **Exception Messages:** 22
- **Message Code Range:** MSG1 - MSG64
