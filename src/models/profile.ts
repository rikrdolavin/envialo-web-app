export interface PersonalInformation {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
