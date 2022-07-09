import * as b from "bobril";
import { observableProp } from "bobx";
import { appStore } from "../../data/appStore";
import {
  IAdminConfigurationStore,
  IConfigurationItem,
} from "../../data/configuration/types";

const ctxKey = "confCtx";

const styles = {
  groupStyle: b.styleDef({
    border: "solid 1px silver",
    borderRadius: "2px",
    borderBottom: "10px",
  }),
  groupHeader: b.styleDef({
    fontWeight: 700,
    borderTop: "-10px",
    borderBottom: "5px",
  }),
  inlineBlock: b.styleDef({
    display: "inline-block",
    marginRight: "5px",
    float: "left",
  }),
  button: b.styleDef({
    float: "left",
    width: "100px",
    cursor: "pointer",
  }),
  clear: b.styleDef({
    clear: "both",
  }),
};

class ConfigurationPage extends b.Component {
  store: IAdminConfigurationStore | undefined;

  init() {
    this.store = appStore().configurationStore;
    this.store.loadConfiguration();
  }

  render() {
    b.useProvideContext(ctxKey, this.store);
    return (
      <>
        {this.store?.getGroups().map((groupName) => (
          <GroupElement
            groupName={groupName}
            items={this.store?.getGroupItems(groupName)}
          />
        ))}
      </>
    );
  }
}

function GroupElement(data: {
  groupName: string;
  items: IConfigurationItem[] | undefined;
}): b.IBobrilNode {
  return (
    <div style={styles.groupStyle}>
      <div style={styles.groupHeader}>{data.groupName}</div>
      <div>
        {data.items?.map((item) => (
          <ItemElement item={item} />
        ))}
      </div>
    </div>
  );
}

function ItemElement(data: { item: IConfigurationItem }) {
  let store = b.useContext<IAdminConfigurationStore>(ctxKey);
  return (
    <div>
      <span style={[styles.inlineBlock, { width: "150px" }]}>
        {data.item.key}
      </span>
      <span style={[styles.inlineBlock, { width: "20%" }]}>
        {data.item.name}
      </span>
      {store?.isReadonly === true ? (
        <>
          <input
            style={[styles.inlineBlock, { width: "200px%" }]}
            type="text"
            readonly
            value={data.item.value}
          />
          <div style={styles.button}>💾</div>
        </>
      ) : (
        <>
          <input
            style={[styles.inlineBlock, { width: "200px" }]}
            type="text"
            value={observableProp(data.item, "value")}
          />
          <div
            style={styles.button}
            onClick={() => store?.setValue(data.item.key, data.item.value)}
          >
            💾
          </div>
        </>
      )}
      <div style={styles.clear}></div>
    </div>
  );
}

export const configurationPage = b.component(ConfigurationPage);
