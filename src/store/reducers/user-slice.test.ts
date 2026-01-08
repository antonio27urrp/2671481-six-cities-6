import { AuthorizationStatus } from '../../const';
import { User } from '../../types/user.type';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userReducer } from './user-slice';

describe('User Slice', () => {
  const initialState = {
    user: null,
    authorizationStatus: AuthorizationStatus.Unknown,
  };

  const mockUser: User = {
    email: 'test@test.com',
    token: 'secret-token',
    name: 'John Doe',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
  };

  it('should return initial state with empty action', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should set status "Auth" and user data on "checkAuthAction.fulfilled"', () => {
    const result = userReducer(initialState, {
      type: checkAuthAction.fulfilled.type,
      payload: mockUser,
    });

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toEqual(mockUser);
  });

  it('should set status "NoAuth" on "checkAuthAction.rejected"', () => {
    const result = userReducer(initialState, {
      type: checkAuthAction.rejected.type,
    });

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
  });

  it('should set status "Auth" and user data on "loginAction.fulfilled"', () => {
    const result = userReducer(initialState, {
      type: loginAction.fulfilled.type,
      payload: mockUser,
    });

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toEqual(mockUser);
  });

  it('should set status "NoAuth" and null user on "logoutAction.fulfilled"', () => {
    const stateWithAuth = {
      user: mockUser,
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = userReducer(stateWithAuth, {
      type: logoutAction.fulfilled.type,
    });

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
  });
});
