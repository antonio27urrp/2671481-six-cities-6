import { State } from '..';
import { AuthorizationStatus } from '../../const';
import { User } from '../../types/user.type';
import {
  getAuthorizationStatus,
  getIsAuth,
  getUserData,
} from './user-selectors';

describe('User Selectors', () => {
  const mockUser: User = {
    email: 'test@test.com',
    token: 'secret',
    name: 'John',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
  };

  const mockState = {
    user: {
      user: mockUser,
      authorizationStatus: AuthorizationStatus.Auth,
    },
  } as State;

  it('should return user data from state', () => {
    const result = getUserData(mockState);
    expect(result).toEqual(mockUser);
  });

  it('should return authorization status from state', () => {
    const result = getAuthorizationStatus(mockState);
    expect(result).toBe(AuthorizationStatus.Auth);
  });

  it('should return true when status is Auth', () => {
    const result = getIsAuth(mockState);
    expect(result).toBe(true);
  });

  it('should return false when status is NoAuth', () => {
    const noAuthState = {
      user: {
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    } as State;

    const result = getIsAuth(noAuthState);
    expect(result).toBe(false);
  });
});
