# README

## usersテーブル

|属性|Column|Type|Options|
|---|---|---|---|
|ニックネーム|nickname|string|null: false, limit:20|
|メールアドレス|email|string|null: false, unique: true|
|パスワード|encrypted_password|string|null: false|

### index

- add_index :users, :nickname

### Association

- has_one :profile, dependent: :destroy
- has_one :personal, dependent: :destroy
- has_one :deliver_address, dependent: :destroy
- has_many :items
- has_many :item_comments
- has_many :like_items
- has_many :marketings
- has_one :credit_card

## profilesテーブル

|属性|Column|Type|Options|
|---|---|---|---|
|紹介文|introduction|text|limit:1000|
|プロフィール画像|image|string||
|外部キー|user_id|reference|null: false|

### Association

- belongs_to :user

## personalsテーブル

|属性|Column|Type|Options|
|---|---|---|---|
|姓|last_name|string|null: false, limit:35|
|名|first_name|string|null: false, limit:35|
|セイ|last_name_kana|string|null: false, limit:35|
|メイ|first_name_kana|string|null: false, limit:35|
|郵便番号|zip-code|string|limit:8|
|外部キー|prefecture_id|reference||
|市区町村|city|string|limit:50|
|番地|address|string|limit:100|
|建物名|building|string|limit:100|
|携帯番号|cellular_phone_number|string|limit:35|
|外部キー|user_id|reference||

### Association

- belongs_to :user
- belongs_to :prefecture

## deliver_addressesテーブル

|属性|Column|Type|Options|
|---|---|---|---|
|姓|last_name|string|null: false, limit:35|
|名|first_name|string|null: false, limit:35|
|セイ|last_name_kana|string|null: false, limit:35|
|メイ|first_name_kana|string|null: false, limit:35|
|郵便番号|zip-code|string|null: false, limit:8|
|外部キー|prefecture_id|reference|null: false|
|市区町村|city|string|null: false, limit:50|
|番地|address|string|null: false, limit:100|
|建物名|building|string|limit:100|
|電話|phone_number|string|limit:35|
|外部キー|user_id|reference|null: false

### Association

- belongs_to :user
- belongs_to :prefecture