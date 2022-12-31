type Color =
  | "orange"
  | "pink"
  | "blue"
  | "orange"
  | "purple"
  | "green"
  | "gray"
  | "aquamarine";

export default function printWithColor(text: string, color: Color = "gray") {
  console.log(`%c${text}`, `color:${color}`);
}
