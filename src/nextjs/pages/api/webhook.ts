//ユーザーの行動を追跡するため、ユーザーの状態を管理するmapを作成
const userState = new Map();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { events } = req.body;

    //LINE Webhookからのリクエストがない場合は終了
    if (!events || events.length === 0) {
      return res.status(200).json({ message: "No events" });
    }

    //メッセージイベントを処理
    const event = events[0]; //最初のイベントを取得
    if (event.type === "message" && event.message.type === "text") {
      //イベント情報から、テキストの内容とユーザーIDを取得
      const userMessage = event.message.text;
      const userId = event.source.userId;

      const options = [
        "物件情報の問い合わせ",
        "お家探しの情報収集のやり方",
        "住宅購入資金の考え方・予算について",
        "新築と中古どちらを買うべきか？",
        "リノベーションの流れについて",
        "湘南エリアの魅力",
        "リノベ不動産辻堂羽鳥店について",
        "その他",
      ];

      // ">お問い合わせ"の場合にFlex Messageを送信
      if (userMessage === "お問い合わせ") {
        userState.set(userId, { step: "categorySelection" });

        const flexMessage = {
          type: "flex",
          altText: "質問メニュー",
          contents: {
            type: "bubble",
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "ご質問内容を選択してください",
                      weight: "regular",
                      offsetStart: "xxl",
                      margin: "sm",
                      offsetTop: "md",
                    },
                    {
                      type: "separator",
                      margin: "xxl",
                      color: "#e5e5e5",
                    },
                  ],
                  backgroundColor: "#fafafa",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    ...options.map((option) => ({
                      type: "button",
                      action: {
                        type: "message",
                        label: option,
                        text: option,
                      },
                    })),
                  ],
                  paddingTop: "md",
                  paddingBottom: "md",
                },
              ],
              paddingAll: "none",
            },
            styles: {
              footer: {
                separator: true,
              },
            },
          },
        };

        await sendLoading({ userId });
        await sendReply(event.replyToken, [flexMessage]);
      } else if (options.includes(userMessage)) {
        userState.set(userId, { step: "detailsInput", category: userMessage });

        await sendLoading({ userId });
        await sendReply(event.replyToken, [
          { type: "text", text: "お問い合わせ内容を入力してください。" },
        ]);
      } else if (
        userState.has(userId) &&
        userState.get(userId).step === "detailsInput"
      ) {
        const state = userState.get(userId);
        const category = state.category;
        const details = userMessage;

        await sendLoading({ userId });

        await saveToSpreadSheet({ userId, category, details });

        userState.delete(userId);

        await sendReply(event.replyToken, [
          {
            type: "text",
            text: "お問い合わせいただきありがとうございます！ご回答には通常2営業日以内に返答いたします。なにかご不明点があれば、お気軽にお問合せください！",
          },
        ]);
      }
    }

    //他のイベントは無視
    return res.status(200).json({ message: "Event not processed" });
  } else {
    //POST以外のリクエストを拒否
    req.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

async function sendReply(replyToken, message) {
  const url = "https://api.line.me/v2/bot/message/reply";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: message,
    }),
  });
}

async function saveToSpreadSheet(data) {
  await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL_INQUIRY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function sendLoading({ userId }: { userId: string }) {
  const url = "https://api.line.me/v2/bot/chat/loading/start";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ chatId: userId }),
  });
}
