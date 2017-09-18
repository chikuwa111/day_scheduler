# Day Scheduler

[App Page](https://chikuwa111.github.io/day_scheduler/)

## 概要
1日（特に休日）の予定を立てるためのWebアプリです。

## 説明
create-react-appを使って生成しました。  
Progressive Web Appになっているはずですが、Android端末を持ってないので実機では確認できていません。  
`yarn build`で生成されたファイル群を**gh-pages**ブランチにアップロードしています。

## 注意
`yarn build`したものをそのまま使うと、参照パスの先頭に`/`がついているためにパス解決に失敗してしまいました。  
そのため、`yarn build`したら`index.html`と`service-worker.js`の中にあるパスの先頭の`/`を手動で除いています。
