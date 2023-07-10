import { Spinner } from "./Spinner";

export function LoadScreen() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Spinner />
    </div>
  );
}
