import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { SegmentedToggle } from "@/components/ui/SegmentedToggle";
import { Tabs } from "@/components/ui/Tabs";
import { PaymentOption } from "@/components/ui/PaymentOption";
import { SavedCardRow } from "@/components/ui/SavedCardRow";

const meta: Meta = { title: "Components/Selection", parameters: { layout: "padded" } };
export default meta;

/** Figma: Icons → "checkbox" State=Default / Checked (18px) */
export const Checkboxes: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="All" />
      <Checkbox label="Most Recent" defaultChecked />
      <Checkbox label="Most Played" forceChecked />
      <Checkbox label="A-Z" disabled />
    </div>
  ),
};

/** Figma: Buttons → "Icon" Type=Selected / Default (24px radio) */
export const Radios: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio name="r" label="Default" />
      <Radio name="r" label="Selected" defaultChecked />
      <Radio name="r2" label="Disabled" disabled />
    </div>
  ),
};

/** Figma: "Toggle" Type=Public / Privacy and "Format tab" Selected=Video / Audio */
export const Toggles: StoryObj = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <SegmentedToggle
        label="Visibility"
        options={[
          { value: "public", label: "Public" },
          { value: "privacy", label: "Privacy" },
        ]}
        defaultValue="public"
      />
      <SegmentedToggle
        label="Visibility"
        options={[
          { value: "public", label: "Public" },
          { value: "privacy", label: "Privacy" },
        ]}
        defaultValue="privacy"
      />
      <SegmentedToggle
        label="Format"
        options={[
          { value: "audio", label: "Audio" },
          { value: "video", label: "Video" },
        ]}
        defaultValue="video"
      />
      <SegmentedToggle
        label="Format"
        options={[
          { value: "audio", label: "Audio" },
          { value: "video", label: "Video" },
        ]}
        defaultValue="audio"
      />
    </div>
  ),
};

const tabItems = [
  { value: "explore", label: "Explore" },
  { value: "library", label: "My library" },
] as const;

/** Figma: "Tabs Desktop" (401 wide, 22 SemiBold) and "Tabs Mobile" (350 wide, 18 Medium) */
export const TabsAll: StoryObj = {
  name: "Tabs",
  render: () => (
    <div className="flex flex-col gap-10">
      <Tabs label="Library" size="desktop" items={tabItems} defaultValue="library" />
      <Tabs label="Library" size="desktop" items={tabItems} defaultValue="explore" />
      <Tabs label="Library" size="mobile" items={tabItems} defaultValue="library" />
      <Tabs label="Library" size="mobile" items={tabItems} defaultValue="explore" />
    </div>
  ),
};

/** Figma: Buttons → "Field type of payment" × Card / Google Pay × Default / Hovered / Selected / Disabled */
export const PaymentOptions: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-5">
      <PaymentOption method="card" name="pay-a" />
      <PaymentOption method="google-pay" name="pay-b" />
      <PaymentOption method="card" name="pay-c" forceState="hover" />
      <PaymentOption method="google-pay" name="pay-d" forceState="hover" />
      <PaymentOption method="card" name="pay-e" defaultChecked />
      <PaymentOption method="google-pay" name="pay-f" defaultChecked />
      <PaymentOption method="card" name="pay-g" disabled />
      <PaymentOption method="google-pay" name="pay-h" disabled />
    </div>
  ),
};

export const PaymentOptionsInteractive: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      <PaymentOption method="card" name="pm" value="card" defaultChecked />
      <PaymentOption method="google-pay" name="pm" value="gpay" />
    </div>
  ),
};

/** Figma: Buttons → "Field for card" Default / Variant2 (selected) */
export const SavedCards: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-5">
      <SavedCardRow name="card-a" last4="7684" />
      <SavedCardRow name="card-b" last4="7684" defaultChecked />
    </div>
  ),
};
