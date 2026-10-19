import { Menu, X } from "lucide-react";

type Props = {
  open: boolean;
};

export function AnimatedMenuIcon({ open }: Props) {
  return (
    <span className="relative block size-5" aria-hidden>
      <Menu
        className={`absolute inset-0 size-5 transition-all duration-200 ease-out ${
          open ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <X
        className={`absolute inset-0 size-5 transition-all duration-200 ease-out ${
          open ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
        }`}
      />
    </span>
  );
}
