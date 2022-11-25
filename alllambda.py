#lambda関数1
# スマホとPCの選択ボタンを押したらDBからすべての情報を取ってくる処理

import json
import boto3
import decimal

# DynamoDBオブジェクト
dynamodb = boto3.resource('dynamodb')

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
       if isinstance(obj, decimal.Decimal):
           return int(obj)
       return json.JSONEncoder.default(self, obj)

#secimalをjsonで返そうとするとダメなのでエンコードする

def All_handler(event, context):
#関数の名前は「All_handler」とする　event引数＝関数に渡される値　context引数＝実行環境の情報
	try:
		# accountbook テーブルから全データを参照する。
		table = dynamodb.Table('持ってきたい情報が載っているDBの名前')
		response = table.scan()

		# 結果を返す
		return {
			    "isBase64Encoded": False,
			    "statusCode": 200,
			    "headers": {
			        'Content-Type': 'application/json',
			        'Access-Control-Allow-Headers': 'Content-Type',
			        'Access-Control-Allow-Methods': 'POST,GET',
			        'Access-Control-Allow-Origin': '*'
    			},
			    "body": json.dumps(response, cls=DecimalEncoder)
		}

	except:
		import traceback
		traceback.print_exc()
		return {
			'statusCode' : 500
		}