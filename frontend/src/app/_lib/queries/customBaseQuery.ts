import { UserService } from '@/_lib/services/user.service';
import { CustomBaseQueryType } from './rtk.types';
import { transformToRTKResult } from './rtkHelpers';

export const customBaseQuery =
  () =>
  async ({ endpoint, params }: CustomBaseQueryType) => {
    switch (endpoint) {
      //#region User
      case 'user.getUserProfile':
        return transformToRTKResult(await UserService.getUserProfile());

      // case 'user.getAllUsers':
      //   return transformToRTKResult(
      //     await UserService.getAllUsers({
      //       ...params,
      //       request: params.request,
      //     }),
      //   );

      // case 'user.updateUserProfile':
      //   return transformToRTKResult(
      //     await UserService.updateUserProfile({
      //       ...params,
      //       request: params.request,
      //     }),
      //   );
      //#endregion

      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  };
