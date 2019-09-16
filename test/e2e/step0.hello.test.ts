import axios from 'axios';
import { Session } from '../helper/util/session';

const APP_URL: string = Session.read('APP_URL');

describe('Case hello', (): void => {

  const resourcePath = `${APP_URL}/hello`;


  test('response greeting', async (): Promise<void> => {

    const response = await axios({
      url: resourcePath,
      method: 'post',
      data: {
        name: 'emily'
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      title: 'hello, emily',
      description: 'my second message.'
    });
  });
});
