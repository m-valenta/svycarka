import * as b from "bobril";
import { DateInput } from "../dateInput/component";
import { contentSize, colors } from "../../styleConstants";

const style = b.styleDef({
  textAlign: "right",
  margin: "10px auto",
  fontSize: 12,
  color: "#D2C6B8"
});

export class CopyRight extends b.Component {
  protected text: string = "";
  init() {
    this.text = `Copyright © ${new Date().getFullYear()} kachnapult@gmail.com, All rights reserved.`;
  }
  render() {
    return <div style={[contentSize, style]}>{this.text}</div>;
  }
}
