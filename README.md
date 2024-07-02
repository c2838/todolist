# todolist
此專案為繳交 ALPHA Camp Dev C7 指標作業所製作。
運用 React 與 styled-cmponent 及 HTML5 進行 todolist 之 CRUD 邏輯與頁面互動製作 (切版為課程提供範例)。


## 版本
Ver 1.0 (now)


## 功能
### signup 頁面
* 使用者輸入帳號、Email及密碼等欄位並點擊註冊按鈕即可註冊帳號。
* 點擊取消按鈕可回到 Login 頁面。
### Login 頁面
* 使用者輸入帳號與密碼欄位並點擊登入按鈕即可進去 todos 頁面。
* 點擊註冊按鈕可進入 Signup 頁面。
### todos 頁面
* 點擊最上方新增欄位輸入欲新增之 todo 事項，可使用 Enter 或右側新增按鍵增加。
* 雙擊可針對原有 todo 事項進行編輯。
* 點擊 todo 事項最前方可勾選，並將事項加入刪除線。
* 點擊 todo 事項最右側刪除(X)按鍵，可將 todo 事項刪除，同時剩餘項目樹也會產生變化。

## 環境建置
* Visual Studio Code - 開發工具
* Git Bash - 指令終端
* React - 前端框架

## 安裝與執行步驟
1. Clone 專案至本機(自行cd至指定資料夾位置)
```
git clone https://github.com/c2838/alpha-shop.git
```
2. 初始化環境
```
cd todolist //切換至檔案資料夾
npm install //安裝npm套件
```
3. 啟動程式
```
npm start
```
4. 至瀏覽器網址列輸入 http://localhost:3000/todos，即可瀏覽 todolist 主要操作頁面並進行操作~

5. 也可至瀏覽器網址列輸入https://c2838.github.io/todolist/login，此頁面已利用 github 部署完成，並可進行簡易測試。


## 專案畫面
![Alt text](https://i.imgur.com/o33RnYy.png)
![Alt text](https://i.imgur.com/4ifrWue.png)
![Alt text](https://i.imgur.com/nHcsqlw.png)
