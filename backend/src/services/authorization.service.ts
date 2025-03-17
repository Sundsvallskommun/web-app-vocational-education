// import { AUTHORIZED_GROUPS } from '@/config';
import { APP_NAME, MUNICIPALITY_ID } from '@/config';
import { Permissions } from '@interfaces/users.interface';
import { UserRoleEnum, UserRolesOnUser } from '@prisma/client';
import { getRandomValues } from 'node:crypto';
import ApiService from './api.service';

// export function authorizeGroups(groups) {
//   const authorizedGroupsList = AUTHORIZED_GROUPS.split(',');
//   const groupsList = groups.split(',').map((g: string) => g.toLowerCase());
//   return authorizedGroupsList.some(authorizedGroup => groupsList.includes(authorizedGroup));
// }

export const defaultPermissions: () => Permissions = () => ({
  adminEdit: false,
  adminRegistrate: false,
  adminEditAccounts: false,
  userSaveSearches: false,
  userSaveInterests: false,
});

const roles = new Map<UserRoleEnum, Partial<Permissions>>([
  [
    'ADMIN',
    {
      adminEdit: true,
      adminRegistrate: true,
      adminEditAccounts: true,
      userSaveSearches: true,
      userSaveInterests: true,
    },
  ],
  [
    'EDITOR',
    {
      adminEdit: true,
      adminRegistrate: true,
      adminEditAccounts: false,
      userSaveSearches: true,
      userSaveInterests: true,
    },
  ],
  [
    'EDUCATIONCOORDINATOR',
    {
      adminEdit: false,
      adminRegistrate: true,
      adminEditAccounts: false,
      userSaveSearches: true,
      userSaveInterests: true,
    },
  ],
  ['USER', {}],
]);

const roleADMapping = {
  sg_appl_yrkesutbildningar_admin: 'ADMIN',
  sg_appl_yrkesutbildningar_editor: 'EDITOR',
  sg_appl_yrkesutbildningar_registrator: 'EDUCATIONCOORDINATOR',
  sg_appl_yrkesutbildningar_read: 'USER',
};

export const getRoles = (roles: UserRolesOnUser[]): UserRoleEnum[] => roles.map(role => role.role);

/**
 *
 * @param groups Array of groups/roles
 * @param internalGroups Whether to use internal groups or external group-mappings
 * @returns collected permissions for all matching role groups
 */
export const getPermissions = (groups: UserRoleEnum[], internalGroups = false): Permissions => {
  const permissions: Permissions = defaultPermissions();
  if (groups?.length < 1) return permissions;
  groups.forEach(group => {
    const groupLower = group.toUpperCase();
    const role = internalGroups ? (groupLower as UserRoleEnum) : (roleADMapping[groupLower] as UserRoleEnum);
    if (roles.has(role)) {
      const groupPermissions = roles.get(role);
      Object.keys(groupPermissions).forEach(permission => {
        if (groupPermissions[permission] === true) {
          permissions[permission] = true;
        }
      });
    }
  });
  return permissions;
};

function generateRandom6DigitCode() {
  const randomNumber = getRandomValues(new Uint32Array(1))[0];
  const sixDigitString = ('000000' + randomNumber).slice(-6);
  return sixDigitString;
}

export const generate2FACode = () => `${generateRandom6DigitCode()}`;

const messageHTML = OTP => {
  const msg = `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP: Engångslösenord för YrkesutbildningMitt</title>
</head>
<body>
    <h1>Ditt engångslösenord: ${OTP}</h1>
</body>
</html>
  `;
  return msg.trim();
};

const base64Encode = (str: string) => {
  return Buffer.from(str, 'utf-8').toString('base64');
};

export const send2FACodeToEmail = async (email: string, twoFactorCode: string) => {
  // send code to email
  const apiService = new ApiService();
  const sendOTP = {
    sender: {
      name: APP_NAME,
      address: 'no-reply@sundsvall.se',
    },
    emailAddress: email,
    subject: `OTP - ${APP_NAME}`,
    message: twoFactorCode,
    htmlMessage: base64Encode(messageHTML(twoFactorCode)),
  };
  const url = `messaging/6.1/${MUNICIPALITY_ID}/email`;
  return await apiService.post({ url, data: sendOTP, headers: { 'x-issuer': APP_NAME } });
};
