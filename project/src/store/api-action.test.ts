import { Action } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store'
import { createAPI } from "../services/api";
import { checkAuthAction } from "./api-action";
import { APIRoute, AuthorizationStatus } from "../const";
import { State } from "../types/state";

describe('Async actions', () => {

})
