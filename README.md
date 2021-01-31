# Hooked-Type について

このアプリは[freeCodeCamp のチュートリアル](https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/)を元に作成し、そこに変更を加えたものです。
master ツリーが公開用で、develop は新しい機能を追加してテストするためのツリーになっています。

**[公開リンク](https://hooked-type.web.app/)**  
**[進捗管理用 Trello](https://trello.com/b/MngMFtmB/hookedtype)**

## 現在の機能

- API を利用した映画検索機能
  - スクロールによる連続検索機能
- Firebase のサポート
  - グーグルアカウントを用いたログイン機能
  - お気に入り機能

## 追加したいこと

- Flux デザインを適用し DOM 構造を簡素で使い回せるようにする

## DOM Tree

- app-root
  - AppContext
    - ContextProvider
      - App
        - Header
          - Menu
            - Modal (ポータル元)
              - Authentication
        - MovieHolder
          - PageSwitcher
            - Search
            - FavoriteMode
          - MovieStyler
            - Movie []
- modal-root
  - Modal (ポータル先)
    - Authentication
