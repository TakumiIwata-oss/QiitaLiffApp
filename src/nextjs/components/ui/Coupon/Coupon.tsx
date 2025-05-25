import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import Button from "../Button/Button";
import { SetStateAction, Dispatch } from "react";

export default function Coupon({
  onClose,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Card className="w-11/12 bg-red-100 p-8">
      <CardHeader title="ホノルルクッキープレゼント！" />
      <CardMedia
        component="img"
        height="194"
        image="/images/エレガントFood SHop.jpg"
        alt="Food Shop"
      />
      <CardContent>
        <Typography>
          本クーポン提示で、ホノルルクッキーを
          <br />
          プレゼントさせていただきます。
          <br />
          (お一人様一回限り)
        </Typography>
      </CardContent>
      <Button label="クーポンを使う" onClick={() => onClose(false)} />
    </Card>
  );
}
