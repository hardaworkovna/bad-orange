import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextField } from "@/components/ui/TextField";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select, DropdownMenu, DropdownItem } from "@/components/ui/Select";
import { IconButton } from "@/components/ui/IconButton";
import { IconEyeClosed, IconEyeOpen } from "@/icons/generated";

const meta: Meta = { title: "Components/Inputs", parameters: { layout: "padded" } };
export default meta;

/** Figma: Buttons → "Field" — Default / Hovered / Typing / Disabled / Filled / Failed */
export const TextFieldStates: StoryObj = {
  render: () => (
    <div className="grid w-[305px] gap-8">
      <TextField label="Email" placeholder="name@gmail.com" />
      <TextField label="Email" placeholder="name@gmail.com" forceState="hover" />
      <TextField label="Email" placeholder="name@gmail.com" defaultValue="name@gmail.com" forceState="typing" />
      <TextField label="Email" placeholder="name@gmail.com" disabled />
      <TextField label="Email" placeholder="name@gmail.com" defaultValue="name@gmail.com" forceState="filled" />
      <TextField label="Email" defaultValue="fkdkdksksks" error="Enter a valid email" />
    </div>
  ),
};

export const TextFieldInteractive: StoryObj = {
  render: () => (
    <div className="w-[305px]">
      <TextField label="Email" placeholder="name@gmail.com" type="email" />
    </div>
  ),
};

/** Password field with the "Password eye" icon (Icons → Type=Eye opened / closed) */
export const Password: StoryObj = {
  render: () => (
    <div className="grid w-[305px] gap-8">
      <TextField
        label="Password"
        type="password"
        defaultValue="hunter2hunter2"
        trailing={
          <IconButton variant="plain" label="Show password" className="size-6">
            <IconEyeClosed />
          </IconButton>
        }
      />
      <TextField
        label="Password"
        type="text"
        defaultValue="hunter2hunter2"
        trailing={
          <IconButton variant="plain" label="Hide password" className="size-6">
            <IconEyeOpen />
          </IconButton>
        }
      />
    </div>
  ),
};

/** Figma: Buttons → "Search" — Desktop default / Desktop active */
export const Search: StoryObj = {
  render: () => (
    <div className="grid gap-6">
      <SearchInput />
      <SearchInput defaultValue="Audio da" forceState="active" />
    </div>
  ),
};

const countries = [
  { value: "us", label: "United States" },
  { value: "c1", label: "Country" },
  { value: "c2", label: "Country" },
  { value: "c3", label: "Country" },
];

/** Figma: Buttons → "Field dropdown" (Default / Focused) + "Popup" */
export const SelectStates: StoryObj = {
  render: () => (
    <div className="flex items-start gap-16 pb-64">
      <Select label="Country" options={countries} defaultValue="us" />
      <Select label="Country" options={countries} defaultValue="us" forceOpen />
      <Select label="Country" options={countries} placeholder="Select" disabled />
    </div>
  ),
};

export const SelectInteractive: StoryObj = {
  render: () => (
    <div className="pb-64">
      <Select label="Country" options={countries} placeholder="Select country" />
    </div>
  ),
};

/** Figma: "Popup" (325:2781) — bare menu surface */
export const Dropdown: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownItem selected>United States</DropdownItem>
      <DropdownItem>Country</DropdownItem>
      <DropdownItem>Country</DropdownItem>
      <DropdownItem>Country</DropdownItem>
    </DropdownMenu>
  ),
};
