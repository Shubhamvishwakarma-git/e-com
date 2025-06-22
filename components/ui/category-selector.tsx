" use client";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Categoryselectorprops {
  categories: Category[];
}

export function Categoryselectorcomponent({
  categories,
}: Categoryselectorprops) {
  const [open, setopen] = useState(false);
  const [value, setvalue] = useState<string>("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setopen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find((categories) => categories._id === value)?.title
            : "Select category..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLocaleLowerCase()
                    .includes(e.currentTarget.value.toLocaleLowerCase())
                );
                if (selectedCategory?.slug?.current) {
                  setvalue(selectedCategory._id);
                  router.push(`/categories/${selectedCategory.slug.current}`);
                  setopen(false);
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    setvalue(value === category._id ? "" : category._id);
                    router.push(`/categories/${category.slug?.current}`);
                  }}
                >
                  {category.title}
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
