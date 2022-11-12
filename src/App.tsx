import { Container } from "./container";
import { View } from "./View";

export function App() {

  const get_props = Container();

  return <View {...get_props}/>
}
