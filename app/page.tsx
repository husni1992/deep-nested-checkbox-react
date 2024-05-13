"use client";

import { CheckboxTree } from "./components/CheckboxTree";
import { checkboxTreeMetadata } from "./services/api.service";

export default function Home() {
  return <CheckboxTree data={checkboxTreeMetadata} />;
}
