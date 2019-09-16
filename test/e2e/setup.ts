import { SsmParamHelper } from '../helper/ssm/ssm-param-helper';
import { Session } from '../helper/util/session';

module.exports = async () => {
  const ENV = process.env.ENV ? process.env.ENV : 'stg';

  const SSM_PARAMS = await SsmParamHelper.getParameterList(ENV, [
    'ApiEndpoint',
    'ApiVersion',
  ]);

  const APP_URL = `${SSM_PARAMS.ApiEndpoint}/${SSM_PARAMS.ApiVersion}`;

  Session.write('ENV', ENV);
  Session.write('APP_URL', APP_URL);
};
