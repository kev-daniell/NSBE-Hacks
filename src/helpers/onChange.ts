import { ChangeType } from "@/types/formOnchange";

export default function onChange<Type extends ChangeType>(
  e: Type,
  setInputState: Function
) {
  const newValue = e.currentTarget.value;
  const attributeName = e.currentTarget.name;
  setInputState((prevEve) => ({
    ...prevEve,
    [attributeName]: newValue,
  }));
}
