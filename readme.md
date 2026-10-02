# Web Presence SoundCloud2Discord Fix

> **非公式フォークです。**
>
> このリポジトリは [KanashiiDev/Web Presence](https://github.com/KanashiiDev/web-presence) をベースにした個人改変版です。元プロジェクトおよび作者による公式配布物ではありません。

基本的な使い方、対応サイト、拡張機能、Dashboard、Tray、自動起動などの説明は、元リポジトリを参照してください。

## このフォークで変更した点

- Discord プロフィール横の短い再生中表示を `SongName - Artist` / `Artist - SongName` 形式に変更
- 展開した Rich Presence では従来どおり `details = SongName`、`state = Artist` を維持
- 公式 3.3.0 の `Status Display Type` に `SongName - Artist` / `Artist - SongName` を追加
- 追加した2項目は Discord Activity の `name` に合成文字列を入れ、`statusDisplayType` / `status_display_type` を `name` に向けるよう調整
- Tray メニューの `Short Status Order` から短い表示の順番を切り替え可能
- Tray メニューの `Open Track Page` から再生中の曲ページを開けるように変更
- Tray メニューに `Open SoundCloud` を追加
- Tray メニューの `Open Official Web Presence Releases` は元プロジェクトの Release ページを開くように変更
- 設定画面に `Short Status Order` のプレビュー表示を追加
- 設定画面に `Start with Windows` を追加し、Windowsログイン時の自動起動を設定画面からも切り替え可能に変更
- アプリアイコンを差し替え
- Windows向けNSISインストーラーを `web-presence-SC2DC-3.3.0-x64.exe` として配布

## Discord 表示仕様

Discord の短いプロフィール表示は、Activity の独立した専用文字列を直接指定する形式ではありません。

`statusDisplayType` / `status_display_type` で、短い表示に使うフィールドを次の中から選びます。

| 値  | 表示に使うフィールド |
| --- | -------------------- |
| `0` | `name`               |
| `1` | `state`              |
| `2` | `details`            |

このフォークでは、公式 3.3.0 の `Status Display Type` に `SongName - Artist` と `Artist - SongName` を追加しています。

追加項目を選んだ場合、短い表示だけを `SongName - Artist` または `Artist - SongName` にするため、次の形にしています。

```json
{
  "name": "SongName - Artist",
  "details": "SongName",
  "state": "Artist",
  "statusDisplayType": 0
}
```

これにより、プロフィール横の短い表示は `SongName - Artist` になり、Rich Presence を展開したときは曲名とアーティスト名が分離されたまま表示されます。

`Short Status Order` を `Artist - SongName` に切り替えた場合は、`name` のみ `Artist - SongName` になります。`details` と `state` は入れ替えません。

## リンク

- 元リポジトリ: https://github.com/KanashiiDev/web-presence
- このリポジトリ: https://github.com/nozomihrg0826/web-presence-soundcloud2discord-fix
- Release: https://github.com/nozomihrg0826/web-presence-soundcloud2discord-fix/releases

## ライセンス

元プロジェクトに従い MIT License です。詳細は `LICENSE` を参照してください。
