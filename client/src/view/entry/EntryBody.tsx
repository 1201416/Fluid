import { TextField } from "@fluentui/react";
import { EntryData } from "../types/EntryData";
import { ColorId, ColorOptions } from "./Colors";

export type EntryBodyProps = Readonly<{
  setText(text: string): void;
}> &
  Pick<EntryData, "content">;

export function EntryBody(props: EntryBodyProps) {
  const { setText, content } = props;
  const color: ColorId = "Blue"
  return (
    <div style={{ flex: 1 }}>
      <TextField
        styles={{ fieldGroup: { background:  ColorOptions[color].light  } }}
        borderless
        multiline
        resizable={false}
        autoAdjustHeight
        onChange={(event) => setText(event.currentTarget.value)}
        value={content}
        placeholder={"Enter Text Here"}
      />
    </div>
  );
}