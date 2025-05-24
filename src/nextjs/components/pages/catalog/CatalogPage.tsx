import { useForm, SubmitHandler } from "react-hook-form";
import { prefectureOptions } from "../../../utils/prefectures";
import liff from "@line/liff";
import Button from "../../ui/Button/Button";
import Checkbox from "../../ui/Checkbox/Checkbox";
import Input from "../../ui/Input/input";
import Select from "../../ui/Select/Select";
import Textarea from "../../ui/Textarea/Textarea";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";

type MessageProps = {
  to: string;
  messages: { type: "text"; text: string }[];
};

async function sendData<T>(url: string, { arg }: { arg: T }) {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

type CatalogPageProps = {
  name: string; // お名前
  email: string; // メールアドレス
  tel: string; // お電話番号
  postalcode: string; // 郵便番号
  prefecture: string; // 都道府県
  city: string; // 市区町村
  address: string; // 町名・番地
  message: string; // ご意見・ご質問
  privacyPolicy: boolean; // プライバシーポリシー同意
};

export default function CatalogPage({
  setIsComplete,
}: {
  setIsComplete: (isComplete: boolean) => void;
}) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (liff) {
      liff.ready.then(() => {
        liff
          .getProfile()
          .then((profile) => {
            console.log("profile", profile);
            console.log("profile_userID", profile.userId);
            setUserId(profile.userId);
          })
          .catch((error) => {
            console.error("Failed to get profile:", error);
          });
      });
    }
  }, [liff]);

  async function updateUser(url: string, { arg }: { arg: CatalogPageProps }) {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(arg),
    });
  }

  const { trigger: catalogTrigger, isMutating } = useSWRMutation(
    "api/catalog",
    sendData<CatalogPageProps>,
  );

  const { trigger: messageTrigger } = useSWRMutation(
    "api/message",
    sendData<MessageProps>,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CatalogPageProps>();

  const onSubmit: SubmitHandler<CatalogPageProps> = (data) => {
    console.log(data);
    catalogTrigger(data, {
      onSuccess: () => {
        setIsComplete(true);
        messageTrigger({
          to: userId,
          messages: [
            {
              type: "text",
              text: "カタログをご請求いただきありがとうございます！カタログのご到着までしばしお待ち下さい。",
            },
          ],
        });
      },
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-medium text-center p-12">
          資料請求フォーム
        </h1>
        <div className="text-center">
          <p>カタログをご希望の方はこちらからお問い合わせください。</p>
          <p>※同業の方の情報収集目的でのお問い合わせはご遠慮ください。</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-10">
        <Input
          label="お名前"
          required={true}
          placeholder="例）山田 太郎"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name", { required: "お名前を入力してください" })}
        />
        <Input
          label="メールアドレス"
          required={true}
          placeholder="例）sample@gmail.com"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "メールアドレスを入力してください ",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "メールアドレスの形式が不正です",
            },
          })}
        />
        <Input
          label="お電話番号"
          required={true}
          placeholder="例）0123-44-555"
          error={!!errors.tel}
          helperText={errors.tel?.message}
          {...register("tel", {
            required: "電話番号を入力してください",
            pattern: {
              value: /^(?!-)(\d{2,4}-?\d{2,4}-?\d{3,4}|\d{10,11})$/,
              message: "電話番号の形式が不正です",
            },
          })}
        />
        <Input
          label="郵便番号"
          required={true}
          formSize=""
          placeholder="例）1234455"
          error={!!errors.postalcode}
          helperText={errors.postalcode?.message}
          {...register("postalcode", {
            required: "郵便番号を入力してください",
            pattern: {
              value: /^(\d{3}-\d{4}|\d{7})$/,
              message: "郵便番号の形式が不正です",
            },
          })}
        />
        <Select
          label="都道府県"
          required={true}
          placeholder="例）- 都道府県 -"
          error={!!errors.prefecture}
          helperText={errors.prefecture?.message}
          options={prefectureOptions}
          {...register("prefecture", {
            required: "都道府県を選択してください",
          })}
        />
        <Input
          label="市区町村"
          required={true}
          placeholder="例）つくば市"
          error={!!errors.city}
          helperText={"errors.city?.message"}
          {...register("city", {
            required: "市区町村を入力してください",
          })}
        />
        <Input
          label="町名・番地"
          required={true}
          placeholder="例）松代4-28 427-102"
          error={!!errors.address}
          helperText={errors.address?.message}
          {...register("address", {
            required: "町名・番地を入力してください",
          })}
        />
        <Textarea
          label="ご意見・ご質問"
          placeholder="例）住宅ローンについて質問したい"
          {...register("message")}
        />
        <Checkbox
          label="プライバシーポリシーに同意する"
          error={!!errors.privacyPolicy}
          helperText={errors.privacyPolicy?.message}
          {...register("privacyPolicy", {
            required: "プライバシーポリシーへの同意は必須です",
          })}
        />
        <Button type="submit" label="送信する" isLoading={isMutating} />
      </form>
    </div>
  );
}
