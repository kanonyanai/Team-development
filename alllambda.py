#lambda関数1
# スマホとPCの選択ボタンを押したらDBからすべての情報を取ってくる処理

import json
import boto3
import decimal

from boto3.dynamodb.conditions import Key	
#Keyオブジェクトを利用できるようにする

# DynamoDBオブジェクト
dynamodb = boto3.resource('dynamodb') #アクセスのためのオブジェクト取得
table = dynamodb.Table('持ってきたい情報が載っているDBのテーブルの名前')
 #指定テーブルへのアクセス

#テーブルスキャン
def DBscanm_scan()::
	scanData = table.scan()
	items = scanDta['Items']
	print(items)    #レコード一覧を表示
	return scanData





def All_handler(event, context):
#関数の名前は「All_handler」とする　event引数＝関数に渡される値　context引数＝実行環境の情報
	try:
		# テーブルから全データを参照する。
		table = dynamodb.Table('持ってきたい情報が載っているDBのテーブルの名前')
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