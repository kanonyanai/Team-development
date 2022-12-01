#全権取得とソートができるかもしれないlambda
import json
import boto3

from boto3.dynamodb.conditions import Key	            #Keyオブジェクトを利用できるようにする

dynamodb = boto3.resource('dynamodb')	                #Dynamodbアクセスのためのオブジェクト取得
table = dynamodb.Table("情報を取ってきたいDBの名前")	  #指定テーブルのアクセスオブジェクト取得

# テーブルスキャン
def operation_scan()::
    scanData = table.scan()	        #scan()メソッドでテーブル内をscan。一覧を取得
    items=scanData['Items']	        #応答からレコード一覧を抽出
    print(items)	                #レコード一覧を表示
    return scanData

# レコード検索
def operation_query(partitionKey, sortKey):
    queryData = table.query(	    #query()メソッドでテーブル内を検索
        KeyConditionExpression = Key("DeviceID").eq(partitionKey) & Key("SensorID").eq(sortKey)	#検索キー(DeviceIDとSensorID)を設定
    )
    items=queryData['Items']	    #応答から取得レコードを抽出
    print(items)	                #取得レコードを表示
    return queryData




def lambda_handler(event, context):	                           #Lambdaから最初に呼びされる関数(名前は変更可)
    
    print("Received event: " + json.dumps(event))	            
    #引数：eventの内容を表示(分岐。「event」の中にscanかqueryが入る)
    OperationType = event['OperationType']	                    #どちらになったのかのお知らせ用

    try:
        if OperationType == 'SCAN':                	            #SCANのとき
            return operation_scan()
        PartitionKey = event['Keys']['パーティションキー']      #引数からIDとかの値を取得
        SortKey = event['Keys']['ソートキー']	                    #引数からSensorIDの値を取得
        
        if OperationType == 'QUERY':	                        #QUERYのとき
            return operation_query(PartitionKey, SortKey)
       
       
    except Exception as e:                           #エラーの時
        print("Error Exception.")
        print(e)