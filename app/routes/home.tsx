import { Form, useFetcher } from "react-router";
import type { Route } from "./+types/home";
import type { constants } from "buffer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const bin = formData.get('bin');
  const errors: string[] = [];
  const output = {
    bin: bin,
    errors: errors,
  };
  
  if (bin?.toString().match(/[2-9]/)) {
    output.errors.push('Contains non 0 and 1');
  } 
  
  if (bin?.toString().length > 8) {
    console.log(bin?.toString().length);
    output.errors.push('More than 8 character')
  }
  return output;
}

export default function Home({actionData}: Route.ComponentProps) {
  let fetcher = useFetcher();
  let bin = fetcher.data?.bin;
  let errors = fetcher.data?.errors; 
  
  //console.log(bin, errors)
  errors = errors && errors.length === 0? null : errors;
  
  return (
    <>
      <fetcher.Form method="post">
        <div>
          <p>Binary Number</p>
          <input type="number" name="bin" id="bin"></input>
          <button type="submit">Convert</button>
        </div>
        <div>
          {errors? (
            errors.map((error: String, index: number) => (
              <p key={index}>{error}</p>
            ))
          ): parseInt(bin?.toString(),2)}
        </div>
      </fetcher.Form>
    </>
  );
}
