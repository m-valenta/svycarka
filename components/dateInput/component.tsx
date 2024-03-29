import * as b from "bobril";
import { IReservationStore, IReservation } from "../../data/reservation/types";
import { t } from "bobril-g11n";
import { localizeDateItem } from "../../utils/dateUtils";
import * as styles from "./styles";
import { observable } from "bobx";
import { Buble } from "../buble/component";
import { Calendar } from "../calendar/component";
import { basicReservationStrategy } from "../calendar/reservationStrategies/basicStrategy";
import { appStore } from "../../data/appStore";
import { invalidItemStyle } from "../../styleConstants";

export interface IData {
  store: IReservationStore;
}

export class DateInput extends b.Component<IData> {
  @observable
  protected left: number = 0;
  @observable
  protected top: number = 0;
  @observable
  protected isSelectionOpen: boolean = false;

  render(): b.IBobrilChildren {
    const children = [
      <this.arrival
        currentReservation={this.data.store.currentReservation.value}
      />,
      <div style={styles.dateSeprator}> </div>,
      <this.departure
        currentReservation={this.data.store.currentReservation.value}
      />,
      <div style={{ clear: "both" }} />
    ];

    if (this.isSelectionOpen) {
      children.push(
        <Buble width={574} left={30} maxHeight={900}>
          {{
            mainContent: (
              <Calendar
                store={this.data.store}
                reservationStrategy={basicReservationStrategy}
                onClose={() => (this.isSelectionOpen = false)}
              />
            )
          }}
        </Buble>
      );
    }

    const wrapperStyles: b.IBobrilStyle[] = [styles.wrapper];
    !this.data.store.currentReservation.isValid &&
      wrapperStyles.push(invalidItemStyle);

    return <div style={wrapperStyles}>{children}</div>;
  }

  postInitDom(me: b.IBobrilCacheNode): void {
    [this.left, this.top] = b.nodePagePos(me);
  }

  postUpdateDom(me: b.IBobrilCacheNode): void {
    [this.left, this.top] = b.nodePagePos(me);
  }

  onClick(): boolean {
    appStore().resetPageState();
    this.isSelectionOpen = !this.isSelectionOpen;
    return true;
  }

  protected arrival(data: {
    currentReservation: IReservation | undefined;
  }): b.IBobrilNode {
    const currentReservation = data.currentReservation;
    let content: b.IBobrilChild;

    content =
      currentReservation !== undefined
        ? localizeDateItem(currentReservation.dateItem)
        : t("Arrival");

    return <div style={styles.date}>{content}</div>;
  }

  protected departure(data: {
    currentReservation: IReservation | undefined;
  }): b.IBobrilNode {
    const currentReservation = data.currentReservation;
    let content: b.IBobrilChild;

    content =
      currentReservation !== undefined
        ? localizeDateItem(
            currentReservation.dateItem,
            currentReservation.duration
          )
        : t("Departure");

    return <div style={styles.date}>{content}</div>;
  }
}

export const dateInput = b.component(DateInput);
