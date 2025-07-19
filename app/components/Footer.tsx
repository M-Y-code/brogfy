export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerContent">
          <div className="footerSection">
            <h3>ゲーム情報ブログ</h3>
            <p>
              ソーシャルゲームの最新情報、イベント、攻略情報をお届けするブログサイトです。
              ゲームファンの皆様に役立つ情報を日々更新しています。
            </p>
          </div>
          <div className="footerSection">
            <h3>カテゴリ</h3>
            <p>
              ・最新ニュース
              <br />
              ・イベント情報
              <br />
              ・攻略ガイド
              <br />
              ・ガチャ情報
              <br />
              ・メンテナンス情報
            </p>
          </div>
          <div className="footerSection">
            <h3>お問い合わせ</h3>
            <p>
              ご意見・ご要望がございましたら、
              <br />
              お気軽にお問い合わせください。
            </p>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid #495057",
          }}
        >
          <p>&copy; 2024 ゲーム情報ブログ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
