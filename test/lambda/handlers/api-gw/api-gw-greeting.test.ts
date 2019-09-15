import { User } from '../../../../src/lambda/domains/greeting/hello-world-use-case';
import { handler } from '../../../../src/lambda/handlers/api-gw/api-gw-greeting';
import { DynamodbGreetingTable } from '../../../../src/lambda/infrastructures/dynamo/dynamodb-greeting-table';

// jest.mock で対象のファイルをモック化します
jest.mock('../../../../src/lambda/infrastructures/dynamo/dynamodb-greeting-table');

describe('greeting Input/Output', (): void => {

  test('hello usecase', async () => {
    const inputEvent: User = {
      name: 'Emily'
    };

    // モック化したモジュールに対して、呼び出される関数ものについては戻り値を定義します
    DynamodbGreetingTable.greetingStore = jest.fn().mockResolvedValue(null);

    // 入力値とモックが準備できたら、 Lambda Function を実行します
    const response = await handler(inputEvent);

    const expected = {
      title: 'hello, Emily',
      description: 'my first message.',
    };

    // モック化した関数が1回だけコールされたことをテストします
    expect(DynamodbGreetingTable.greetingStore).toBeCalledTimes(1);

    // 1回目の呼び出しのひとつめのパラメータが期待どおりに渡されていることをテストします
    // 結果的に、ユースケース内のオブジェクト変換処理のテストにもなっています
    expect(DynamodbGreetingTable.greetingStore).toHaveBeenCalledWith(expected);

    // レスポンスが期待どおりであることをテストします
    expect(response).toEqual(expected);
  });

});
