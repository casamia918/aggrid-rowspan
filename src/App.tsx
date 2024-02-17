import { Tabs, rem } from "@mantine/core";

import { OriginalRowSpanExample } from "./examples/OriginalRowSpan";
import { AutomaticRowSpanExample } from "./examples/AutomaticRowSpan";

import "./automatic-rowspan/style.css";

import classes from "./App.module.css";

function App() {
  return (
    <>
      <Tabs defaultValue="automatic" classNames={classes}>
        <Tabs.List>
          <Tabs.Tab value="original">Original</Tabs.Tab>
          <Tabs.Tab value="automatic">Automatic</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="original">
          <OriginalRowSpanExample />
        </Tabs.Panel>

        <Tabs.Panel value="automatic">
          <AutomaticRowSpanExample />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default App;
