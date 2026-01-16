export enum ErrorCode {
  // Authentication - Validation
  MSG1 = "MSG1",
  MSG2 = "MSG2",
  MSG3 = "MSG3",
  MSG4 = "MSG4",
  MSG5 = "MSG5",
  MSG6 = "MSG6",
  MSG7 = "MSG7",
  MSG8 = "MSG8",
  MSG9 = "MSG9",
  MSG10 = "MSG10",
  MSG11 = "MSG11",
  MSG12 = "MSG12",
  MSG13 = "MSG13",
  MSG14 = "MSG14",
  MSG15 = "MSG15",
  MSG16 = "MSG16",
  MSG17 = "MSG17",

  // Authentication - Exceptions
  MSG18 = "MSG18",
  MSG19 = "MSG19",
  MSG20 = "MSG20",
  MSG21 = "MSG21",
  MSG22 = "MSG22",
  MSG23 = "MSG23",
  MSG24 = "MSG24",
  MSG25 = "MSG25",

  // User Management - Validation
  MSG26 = "MSG26",
  MSG27 = "MSG27",
  MSG28 = "MSG28",
  MSG29 = "MSG29",
  MSG30 = "MSG30",
  MSG31 = "MSG31",
  MSG32 = "MSG32",
  MSG33 = "MSG33",
  MSG34 = "MSG34",

  // Role Management - Validation
  MSG35 = "MSG35",
  MSG36 = "MSG36",
  MSG37 = "MSG37",
  MSG38 = "MSG38",
  MSG39 = "MSG39",
  MSG40 = "MSG40",
  MSG41 = "MSG41",

  // Role Management - Exceptions
  MSG42 = "MSG42",
  MSG43 = "MSG43",
  MSG44 = "MSG44",
  MSG45 = "MSG45",
  MSG46 = "MSG46",
  // MSG47 is missing in the documented source
  MSG48 = "MSG48",
  MSG49 = "MSG49",
  MSG50 = "MSG50",

  // User Registration - Public
  MSG51 = "MSG51",
  MSG52 = "MSG52",
  MSG53 = "MSG53",
  MSG54 = "MSG54",
  MSG55 = "MSG55",
  MSG56 = "MSG56",
  MSG57 = "MSG57",

  // Password Policy
  MSG58 = "MSG58",
  MSG59 = "MSG59",
  MSG60 = "MSG60",
  MSG61 = "MSG61",
  MSG62 = "MSG62",

  // System Error
  MSG63 = "MSG63",

  // Role Management - Additional
  MSG64 = "MSG64",
}

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.MSG1]: "The email address is required.",
  [ErrorCode.MSG2]: "It must be a valid email address.",
  [ErrorCode.MSG3]: "The password is required.",
  [ErrorCode.MSG4]: "The user ID is required.",
  [ErrorCode.MSG5]: "The refresh token is mandatory.",
  [ErrorCode.MSG6]: "The previous password is required.",
  [ErrorCode.MSG7]: "A new password is required.",
  [ErrorCode.MSG8]: "The new password cannot be the same as the old one.",
  [ErrorCode.MSG9]: "You must repeat the new password.",
  [ErrorCode.MSG10]: "The passwords do not match.",
  [ErrorCode.MSG11]: "The token is required.",
  [ErrorCode.MSG12]: "The email address is required.",
  [ErrorCode.MSG13]: "It must be a valid email address.",
  [ErrorCode.MSG14]: "The token is required.",
  [ErrorCode.MSG15]: "The new password is required.",
  [ErrorCode.MSG16]: "You must confirm the new password.",
  [ErrorCode.MSG17]: "The passwords do not match.",
  [ErrorCode.MSG18]: "The email address is incorrect or inactive.",
  [ErrorCode.MSG19]: "The email address or password is incorrect.",
  [ErrorCode.MSG20]: "Invalid refresh token.",
  [ErrorCode.MSG21]: "Invalid old password.",
  [ErrorCode.MSG22]: "User not found.",
  [ErrorCode.MSG23]: "Invalid or expired token.",
  [ErrorCode.MSG24]: "Email not found.",
  [ErrorCode.MSG25]: "Invalid or expired token.",
  [ErrorCode.MSG26]: "The email address is required.",
  [ErrorCode.MSG27]: "Must be a valid email.",
  [ErrorCode.MSG28]: "First name is required.",
  [ErrorCode.MSG29]: "Last name is required.",
  [ErrorCode.MSG30]: "Password is required.",
  [ErrorCode.MSG31]: "You must confirm the password.",
  [ErrorCode.MSG32]: "Passwords do not match.",
  [ErrorCode.MSG33]: "You must specify at least one role id.",
  [ErrorCode.MSG34]: "The roles list cannot be empty.",
  [ErrorCode.MSG35]: "The role name is required.",
  [ErrorCode.MSG36]: "Must contain at least 3 characters.",
  [ErrorCode.MSG37]: "Must contain maximum 50 characters.",
  [ErrorCode.MSG38]: "The description is required.",
  [ErrorCode.MSG39]: "Must contain maximum 200 characters.",
  [ErrorCode.MSG40]: "You must specify at least one permission id.",
  [ErrorCode.MSG41]: "The permission list cannot be empty.",
  [ErrorCode.MSG42]: "This role name already exists.",
  [ErrorCode.MSG43]: "Role not found.",
  [ErrorCode.MSG44]: "System roles cannot be modified.",
  [ErrorCode.MSG45]: "The role name already exists.",
  [ErrorCode.MSG46]: "Role not found.",
  [ErrorCode.MSG48]: "One or more permissions do not exist.",
  [ErrorCode.MSG49]: "Permissions to remove not found.",
  [ErrorCode.MSG50]: "System permissions cannot be removed.",

  // User Registration - Public
  [ErrorCode.MSG51]: "The email address is required.",
  [ErrorCode.MSG52]: "Must be a valid email.",
  [ErrorCode.MSG53]: "First name is required.",
  [ErrorCode.MSG54]: "Last name is required.",
  [ErrorCode.MSG55]: "Password is required.",
  [ErrorCode.MSG56]: "You must confirm the password.",
  [ErrorCode.MSG57]: "Passwords do not match.",

  // Password Policy
  [ErrorCode.MSG58]: "Must contain at least 8 characters.",
  [ErrorCode.MSG59]: "Must contain at least one uppercase letter.",
  [ErrorCode.MSG60]: "Must contain at least one lowercase letter.",
  [ErrorCode.MSG61]: "Must contain at least one number.",
  [ErrorCode.MSG62]: "Must contain at least one special character.",

  // System Error
  [ErrorCode.MSG63]: "An internal server error occurred.",

  // Role Management - Additional
  [ErrorCode.MSG64]: "Role not found.",
};
