// <1> - ダミーの環境変数を用意します
process.env.GREETING_TABLE_NAME = 'local-greeting';
process.env.REGION = 'local';

import { GreetingMessage } from '../../../../src/lambda/domains/greeting/hello-world-use-case';
import { DYNAMO, DynamodbGreetingTable, } from '../../../../src/lambda/infrastructures/dynamo/dynamodb-greeting-table';


describe('greeting table service call', (): void => {

  test('greetingStore', async () => {

    // <2> - DynamoDB のSDKをモック化します
    DYNAMO.updateItem = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue(null)
    });

    const parameterInput: GreetingMessage = {
      title: 'hello, Emily',
      description: 'my first message.',
    };

    // インフラのコード（保存処理）を実行します
    await DynamodbGreetingTable.greetingStore(parameterInput);

    // モック化した関数が1回だけコールされたことをテストします
    expect(DYNAMO.updateItem).toHaveBeenCalledTimes(1);

    // よびだしでのパラメータが期待どおりに渡されていることをテストします
    expect(DYNAMO.updateItem).toHaveBeenCalledWith({
      TableName: 'local-greeting',
      Key: {greetingId: {S: expect.any(String)}}, // <3> - uuid は型をチェックします
      UpdateExpression: [
        'set title = :title',
        'description = :description'
      ].join(', '),
      ExpressionAttributeValues: {
        ':title': {S: parameterInput.title},
        ':description': {S: parameterInput.description}
      }
    });
  });
});
