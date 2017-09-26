//@flow
import {Logger} from "../../lib/logger";
import { stringifyData } from "../../lib/logger";
import type { GetSyncProgressResponse } from '../index';

export default class MockApi {

  // TODO: make this configurable somehow (to simulate certain states)
  async getSyncProgress(): Promise<GetSyncProgressResponse> {
    Logger.debug('MockApi::getSyncProgress called');
    const response = Promise.resolve({ localDifficulty: 100, networkDifficulty: 100 });
    Logger.debug('MockApi::getSyncProgress success: ' + stringifyData(response));
    return response;
  }

  async getWallets() {

  }

}
