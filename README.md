# ThinkLog

## 概要

ThinkLog は、メモ・日記・ToDo リスト・その他覚えておきたいことを記録・管理・整理するためのシンプルなメモアプリケーションです。

React で構築され、メモの作成、編集、削除、閲覧の機能が備わっています。

## インストール方法

ThinkLog をローカルで実行するには、以下の手順に従ってください：

1. リポジトリのクローン

クローンする任意のディレクトリ作成し、移動してから実行してください。

```
git clone https://github.com/hirano-vm4/react-spa.git
```

2. 依存関係のインストール

```
npm install
```

3. アプリケーションの起動

```
npm start
```

アプリは`http://localhost:3000`で起動します。

## 使い方

### 新規作成

アプリを起動し、左のサイドバーの`新規作成`をクリックするとメモの編集画面が表示されます。
メモの 1 行目がタイトルになることに注意してください。

入力が終わったらテキストエリア下にある`保存`ボタンを押します。お使いの PC のローカルストレージに保存され、サイドバーにタイトルが表示されます。

0 文字では保存できない点に注意してください。

### 編集・削除

サイドバーにあるタイトルをクリックすると、編集画面が開きます。編集して再度`保存`を押してください。メモの内容と更新日時が更新され、サイドバーの上部に表示されます。

削除したい場合は`削除`ボタンを押してください。ポップアップで削除して良いか最終確認されます。削除して問題なければ`OK`を押してください。この時点で対象のメモは削除されサイドバーにも表示がなくなります。
