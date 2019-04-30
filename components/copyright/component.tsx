import * as b from "bobril";
import { DateInput } from "../dateInput/component";
import { contentSize, colors } from "../../styleConstants";

const style = b.styleDef({
  textAlign: "right",
  margin: "0 auto",
  fontSize: 12,
  color: colors.calendarSilver
});

export class CopyRight extends b.Component {
  protected text: string;
  init() {
    this.text = `Copyright © ${new Date().getFullYear()} kachnapult@gmail.com, All rights reserved.`;
  }
  render() {
    return <div style={[contentSize, style]}>{this.text}</div>;
  }
}

export const copyRight = b.component(CopyRight);
