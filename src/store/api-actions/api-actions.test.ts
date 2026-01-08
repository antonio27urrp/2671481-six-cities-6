import { configureMockStore } from '@jedmao/redux-mock-store';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { vi } from 'vitest';
import { State } from '..';
import { APIRoute } from '../../const/api';

const axiosInstance = axios.create();
const mockAxiosAdapter = new MockAdapter(axiosInstance);

vi.mock('../../service/api', () => ({
  createAPI: () => axiosInstance,
}));

vi.mock('../../service/token', () => ({
  saveToken: vi.fn(),
  dropToken: vi.fn(),
  getToken: vi.fn(() => ''),
}));

import {
  fetchFullOfferAction,
  fetchOffers,
  loginAction,
  logoutAction,
  postCommentAction,
  toggleFavoriteStatusAction,
} from '.';
import * as tokenStorage from '../../service/token';

type AppThunkDispatch = ThunkDispatch<State, AxiosInstance, Action>;

describe('Async actions', () => {
  const middlewares = [thunk.withExtraArgument(axiosInstance)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(
    middlewares
  );

  beforeEach(() => {
    mockAxiosAdapter.reset();
    vi.clearAllMocks();
  });

  it('should dispatch fetchOffers when server returns 200', async () => {
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

    const store = mockStore();
    await store.dispatch(fetchOffers());

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain(fetchOffers.pending.type);
    expect(actions).toContain(fetchOffers.fulfilled.type);
  });

  it('should dispatch loginAction and save token on 200', async () => {
    const authData = { email: 'test@test.ru', password: 'password123' };
    mockAxiosAdapter
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret-token' });

    const store = mockStore();
    await store.dispatch(loginAction(authData));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain(loginAction.pending.type);
    expect(actions).toContain(loginAction.fulfilled.type);
    expect(tokenStorage.saveToken).toHaveBeenCalledWith('secret-token');
  });

  it('should dispatch logoutAction and drop token on 204', async () => {
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

    const store = mockStore();
    await store.dispatch(logoutAction());

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain(logoutAction.pending.type);
    expect(actions).toContain(logoutAction.fulfilled.type);
    expect(tokenStorage.dropToken).toHaveBeenCalled();
  });

  it('should fetch full offer details on 200', async () => {
    const mockId = 'offer-123';
    mockAxiosAdapter
      .onGet(`${APIRoute.Offers}/${mockId}`)
      .reply(200, { id: mockId });

    const store = mockStore();
    await store.dispatch(fetchFullOfferAction(mockId));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain(fetchFullOfferAction.pending.type);
    expect(actions).toContain(fetchFullOfferAction.fulfilled.type);
  });

  it('should post comment on 201', async () => {
    const commentData = { offerId: '1', comment: 'Excellent', rating: 5 };
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/1`).reply(201, {});

    const store = mockStore();
    await store.dispatch(postCommentAction(commentData));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain(postCommentAction.pending.type);
    expect(actions).toContain(postCommentAction.fulfilled.type);
  });

  it('should toggle favorite status on 200', async () => {
    const toggleData = { id: 'offer-5', status: 1 };
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/offer-5/1`).reply(200, {});

    const store = mockStore();
    await store.dispatch(toggleFavoriteStatusAction(toggleData));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain(toggleFavoriteStatusAction.pending.type);
    expect(actions).toContain(toggleFavoriteStatusAction.fulfilled.type);
  });
});
