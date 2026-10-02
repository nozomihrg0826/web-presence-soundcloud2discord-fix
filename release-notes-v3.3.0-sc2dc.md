# Web Presence SoundCloud2Discord Fix v3.3.0

KanashiiDev/Web Presence をベースにした非公式フォークです。

## この版で違うところ

- KanashiiDev/Web Presence `3.3.0` をベースに更新しています。
- Discord プロフィール横の短い再生中表示を `SongName - Artist` / `Artist - SongName` 形式に変更しています。
- 展開した Rich Presence では、従来どおり `details = SongName`、`state = Artist` のまま維持しています。
- 公式 3.3.0 の `Status Display Type` に `SongName - Artist` / `Artist - SongName` を追加しています。
- Tray メニューの `Short Status Order` から短い表示の順番を切り替えられます。
- Tray メニューの `Open Track Page` から再生中の曲ページを開けます。
- Tray メニューに `Open SoundCloud` を追加しています。
- Tray メニューの `Open Official Web Presence Releases` は元プロジェクトの Release ページを開きます。
- 設定画面に `Short Status Order` のプレビュー表示を追加しています。
- 設定画面に `Start with Windows` を追加し、Windows ログイン時の自動起動を切り替えられます。
- アプリアイコンを差し替えています。

## インストールと使い方

1. ブラウザに Web Presence の拡張機能をインストールします。
2. 拡張機能の設定で、ユーザースクリプトの実行を許可します。
3. 拡張機能の画面で `Discord setup` を開き、ブラウザと Desktop APP を選択します。
4. フォーク版のため、`I have installed the application` を選択します。
5. `Add library` から `SoundCloud` を探して `Download` します。
6. このReleaseの `web-presence-SC2DC-3.3.0-x64.exe` を起動してインストールします。インストール先は自由です。
7. PC右下の通知領域にWeb Presenceのアイコンが表示されれば起動中です。
8. SoundCloudで曲を再生すると、Discordのプロフィール横に `SongName - Artist` または `Artist - SongName` 形式で表示されます。

## 注意

- これは非公式フォークです。元プロジェクトおよび作者による公式配布物ではありません。
- 未署名ビルドのため、Windows SmartScreen の警告が出る場合があります。
- Discord Desktop RPCを使うため、Discordデスクトップアプリを起動しておいてください。
