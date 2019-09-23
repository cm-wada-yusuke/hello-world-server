import * as SSM from 'aws-sdk/clients/ssm';
import { load } from '../util/config';

const SSM_API_VERSION = '2014-11-06';
const REGION = 'ap-northeast-1';

const NAME_SPACE = load('nameSpace');
const APP_NAME = load('appName');

export const ssm = new SSM({
  apiVersion: SSM_API_VERSION,
  region: REGION,
});

export class SsmParamHelper {

  public static async getParameterList(
    env: string,
    paramNameList: ParamNameList,
  ): Promise<ParamList> {
    const getParameterRequest: SSM.GetParametersRequest = {
      Names: paramNameList.map(function (paramName) {
        return `/${NAME_SPACE}/${APP_NAME}/${env}/${paramName}`;
      }),
    };
    const result = await ssm.getParameters(getParameterRequest).promise();
    return result
      .Parameters!.map((param) => {
      const name = param.Name!.replace(
        `/${NAME_SPACE}/${APP_NAME}/${env}/`,
        '',
      );
      return {
        [name]: param.Value!,
      };
    })
      .reduce((previous, current) => {
        return Object.assign(previous, current);
      }, {});
  }
}

type ParamName = string;
type ParamNameList = ParamName[];

interface ParamList {
  [key: string]: string;
}
