# Hooked-Type について

このアプリは[freeCodeCamp のチュートリアル](https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/)を元に作成し、そこに機能を加えたものです。
master ツリーが公開用で、develop は新しい機能を追加してテストするためのツリーになっています。

**[公開リンク](https://hooked-type.web.app/)**

## 使用している技術

- React での SPA、Ajax の実現
- TypeScript による型定義
- React hooks を用いた状態管理
- API を利用した映画検索機能 (Fetch API, [OMDb API](http://omdbapi.com/))
  - 次ページのシームレスな連続検索機能 (react-device-detect)
    - PC ならスクロール、スマホならページの下端で下にスワイプするか、ボタン押下
- クラウドでのユーザー管理、データベースの利用 (Firebase)
  - グーグルアカウント、または匿名でのログイン機能 (Firebase Authentication)
  - お気に入り機能とお気に入りした映画を一覧表示 (Firebase Cloud Firestore)
- 一部 CSS in JS を使用 (styled-components, styled-system)

## 追加したいこと

- useReducer のロジック、状態の変化をテストする (Jest, react-testing-library)
- バニラ CSS を styled-components へ移行させる
- パフォーマンスの改善
  - Context を機能ごとに分割して再レンダーの範囲を狭める

## 苦労したところ、工夫したところ

- 以前作成した ToDo アプリは見通しが悪くメンテナンスしづらかったので、ディレクトリ構成を機能ごとに分けて管理することで混乱せず作業ができた。
- DOM の構造に一貫性をもたせないまま開発を続けていたため、一度機能を完成させた後に DOM 構成をつくりなおすことがあった。
  - アーキテクチャの学習をもっとしたい。

## DOM Tree

- app-root
  - AppContext
    - ContextProvider
      - App
        - Header
          - Menu
            - Authentication (ポータル元)
        - MovieHolder
          - PageSwitcher
            - Search
            - FavoriteMode
          - MovieStyler
            - Movie []
              - MovieDetail (ポータル元)
              - FavoriteBtn
- modal-root
  - Modal (ポータル先)
    - MovieDetail
      - FavoriteBtn
    - Authentication
