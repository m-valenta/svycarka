import * as b from "bobril";
import { IReservationStore, FormItem } from "../../data/reservation/types";
import * as styles from "./styles";
import { TextSection } from "../textSection/component";
import { t } from "bobril-g11n";
import { DateInput } from "../dateInput/component";
import { observableProp, observable } from "bobx";
import { expander, Expander } from "../expander/component";
import { Spinner } from "../spinner/component";
import { appStore } from "../../data/appStore";
export interface IData {
  store: IReservationStore;
}

export class ReservationForm extends b.Component<IData> {
  render(): b.IBobrilNode {
    return (
      <div style={styles.formWrapper}>
        <TextSection>
          {{
            header: t("Reservation form"),
            content: t(
              "All data must be filled in to complete the reservation."
            )
          }}
        </TextSection>
        <DateInput store={this.data.store} />
        <div style={styles.formInputsWrapper}>
          <FormInput
            placeholder={t("Name and surname")}
            formItem={this.data.store.name}
          />
          <FormInput
            placeholder={t("Street, house number, city, postal code")}
            formItem={this.data.store.address}
          />
          <FormInput
            placeholder={t("Email")}
            formItem={this.data.store.email}
          />
          <FormInput
            placeholder={t("Phone")}
            formItem={this.data.store.phone}
          />
        </div>
        <Expander
          headerText={t("I'm interested in additional services")}
          expandedWidth={440}
          expandedHeight={175}
        >
          <div>
            <Spinner
              item={appStore.reservationStore.beer}
              text={t("Barrel of beer (including bar):")}
              explicitWidth={230}
            />
            <Spinner
              item={appStore.reservationStore.meet}
              text={t("Grill meat for:")}
              explicitWidth={230}
            />
          </div>
        </Expander>
      </div>
    );
  }
}

class FormInput extends b.Component<{
  placeholder: string;
  formItem: FormItem<string>;
}> {
  @observable
  protected focused: boolean = false;

  render() {
    const item = this.data.formItem;
    const style: b.IBobrilStyle[] = [styles.formInput];

    return item.value !== undefined && item.value.length > 0 ? (
      <input type="text" style={style} value={observableProp(item, "value")} />
    ) : (
      <input type="text" style={style} placeholder={this.data.placeholder} />
    );
  }
}
