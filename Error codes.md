# Application Messages Documentation

> **Language**: English 🇺🇸

This document contains all validation and exception messages used throughout the application, indexed with unique message codes for error tracking and localization purposes.

---

## Validation Messages

### Authentication Endpoints

#### Login Endpoint
| Code | Message |
|------|---------|
| MSG1 | The email address is required. |
| MSG2 | It must be a valid email address. |
| MSG3 | The password is required. |

#### Refresh Token Endpoint
| Code | Message |
|------|---------|
| MSG4 | The user ID is required. |
| MSG5 | The refresh token is mandatory. |

#### Change Password Endpoint
| Code | Message |
|------|---------|
| MSG6 | The previous password is required. |
| MSG7 | A new password is required. |
| MSG8 | The new password cannot be the same as the old one. |
| MSG9 | You must repeat the new password. |
| MSG10 | The passwords do not match. |

#### Activate User Endpoint
| Code | Message |
|------|---------|
| MSG11 | The token is required. |

#### Forgot Password Endpoint
| Code | Message |
|------|---------|
| MSG12 | The email address is required. |
| MSG13 | It must be a valid email address. |

#### Reset Password Endpoint
| Code | Message |
|------|---------|
| MSG14 | The token is required. |
| MSG15 | The new password is required. |
| MSG16 | You must confirm the new password. |
| MSG17 | The passwords do not match. |

### User Management

#### Register User By Admin Endpoint
| Code | Message |
|------|---------|
| MSG26 | The email address is required. |
| MSG27 | Must be a valid email. |
| MSG28 | First name is required. |
| MSG29 | Last name is required. |
| MSG30 | Password is required. |
| MSG31 | You must confirm the password. |
| MSG32 | Passwords do not match. |
| MSG33 | You must specify at least one role id. |
| MSG34 | The roles list cannot be empty. |

### Role Management

#### Create/Update Role Endpoint
| Code | Message |
|------|---------|
| MSG35 | The role name is required. |
| MSG36 | Must contain at least 3 characters. |
| MSG37 | Must contain maximum 50 characters. |
| MSG38 | The description is required. |
| MSG39 | Must contain maximum 200 characters. |

#### Assign Permissions Endpoint
| Code | Message |
|------|---------|
| MSG40 | You must specify at least one permission id. |
| MSG41 | The permission list cannot be empty. |

---

## Exception Messages

### Authentication Service

#### Login Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG18 | The email address is incorrect or inactive. | ValidationException |
| MSG19 | The email address or password is incorrect. | ValidationException |

#### Refresh Token Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG20 | Invalid refresh token. | ValidationException |

#### Change Password Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG21 | Invalid old password. | ValidationException |
| MSG22 | User not found. | ValidationException |

#### Activate User Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG23 | Invalid or expired token. | ValidationException |

#### Request Password Reset Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG24 | Email not found. | ValidationException |

#### Reset Password Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG25 | Invalid or expired token. | ValidationException |

### Role Service

#### Create Role Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG42 | This role name already exists. | ValidationException |

#### Update Role Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG43 | Role not found. | KeyNotFoundException |
| MSG44 | System roles cannot be modified. | ValidationException |
| MSG45 | The role name already exists. | ValidationException |

#### Get Role By ID Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG43 | Role not found. | KeyNotFoundException |

#### Assign Permission To Role Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG46 | Role not found. | KeyNotFoundException |
| MSG48 | One or more permissions do not exist. | ValidationException |

#### Remove Permissions From Role Operation
| Code | Message | Exception Type |
|------|---------|-----------------|
| MSG49 | Permissions to remove not found. | KeyNotFoundException |
| MSG50 | System permissions cannot be removed. | ValidationException |

---

## Message Code Summary

**Total Messages**: 50

### Distribution by Category
- **Validation Messages**: 34 (MSG1-MSG17, MSG26-MSG41)
- **Exception Messages**: 16 (MSG18-MSG25, MSG42-MSG50)

### Distribution by Module
- **Authentication**: 17 messages (MSG1-MSG17, MSG18-MSG25)
- **User Management**: 9 messages (MSG26-MSG34)
- **Role Management**: 13 messages (MSG35-MSG50)

### Distribution by Operation Type
- **Validation Rules**: 34 messages
- **Business Logic Exceptions**: 16 messages

---

## Implementation Details

All messages are prefixed with their corresponding message code (MSG1, MSG2, etc.) in the format:

```
"MSG{number} {message text}"
```

This format enables:
- **Error Tracking**: Easy identification of error sources in logs
- **Localization**: Support for multi-language implementations
- **Documentation**: Clear mapping between codes and messages
- **Debugging**: Quick reference for developers during troubleshooting

---

## Related Files

### Controllers
- `Controllers/AuthController.cs`

### Services
- `Services/AuthService.cs`
- `Services/RoleService.cs`

### DTOs with Validators - Authentication
- `DTOs/UserDTOs/LoginUserRequestDTO.cs`
- `DTOs/UserDTOs/RefreshTokenRequestDTO.cs`
- `DTOs/UserDTOs/ChangeUserPasswordRequestDTO.cs`
- `DTOs/UserDTOs/ActivateRequestDTO.cs`
- `DTOs/UserDTOs/PasswordResetRequestDTO.cs`
- `DTOs/UserDTOs/ResetPasswordRequestDTO.cs`

### DTOs with Validators - User Management
- `DTOs/UserDTOs/RegisterUserByAdminRequestDTO.cs`

### DTOs with Validators - Role Management
- `DTOs/RoleDTOs/CreateUpdRolRequestDTO.cs`
- `DTOs/RoleDTOs/AssignPermissionsRequestDTO.cs`

---

*Last Updated: January 8, 2026*
