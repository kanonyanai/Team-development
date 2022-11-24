#lambda関数サンプル
#XとYの引数を渡すと戻り値として割り算した結果を返す

import json

def samplelambda (event, context): 
 #defの後は関数の名前(任意)　event引数＝関数に渡される値　context引数＝実行環境の情報
 x = int(event["x"]) #渡された値の取得
 y = int(event["y"])
