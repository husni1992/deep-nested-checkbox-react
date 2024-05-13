"use client";

import { Category } from "../services/api.service";

export function Checkbox({ data }: { data: Category }) {
  return (
    <div>
      <input type="checkbox" id={data.id} name={data.name} value={Math.random()} />
      <label htmlFor={data.id}>{data.name}</label>
    </div>
  );
}
