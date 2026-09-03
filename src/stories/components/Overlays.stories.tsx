import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConfirmPopup, AccountMenu } from "@/components/ui/Popup";
import { ReactionsPicker, EmojiCircle } from "@/components/ui/ReactionsPicker";
import { Tooltip, TooltipBubble, InfoIcon } from "@/components/ui/Tooltip";
import { Avatar } from "@/components/ui/Avatar";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

const meta: Meta = { title: "Components/Overlays", parameters: { layout: "padded" } };
export default meta;

/** Figma: "Pop-up/Delete comment" */
export const Confirm: StoryObj = {
  render: () => <ConfirmPopup />,
};

/** Figma: "Account/Settings" */
export const AccountSettings: StoryObj = {
  render: () => (
    <AccountMenu
      items={[
        { label: "Account settings", href: "/account" },
        { label: "Manage my subscription", href: "/account/subscription" },
        { label: "Log out" },
      ]}
    />
  ),
};

/** Figma: "Pop-up/Reactions" + "Icon Change emoji" (Default / Active) */
export const Reactions: StoryObj = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      <ReactionsPicker value="👄" />
      <div className="flex gap-4">
        <EmojiCircle emoji="👄" />
        <EmojiCircle emoji="👄" selected />
      </div>
    </div>
  ),
};

/** Figma: Icons → "icon" State=Default/Hovered/Active + "icon/Tooltip" */
export const Tooltips: StoryObj = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      <div className="flex items-center gap-4">
        <InfoIcon />
        <InfoIcon state="hovered" />
        <InfoIcon state="active" />
      </div>
      <TooltipBubble>
        Private accounts comments are hidden to nonmembers and are not findable on search engines.
      </TooltipBubble>
      <Tooltip
        content="Private accounts comments are hidden to nonmembers and are not findable on search engines."
        forceOpen
      />
      <Tooltip content="Hover or click me." />
    </div>
  ),
};

/** Figma: Icons → "Component 3" (Desktop/Avatar/Header, Frame 425 = 18+) */
export const Avatars: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <Avatar />
      <Avatar emoji="😈" />
      <Avatar ageGate />
    </div>
  ),
};

/** Figma: Design common sections → "Mobile Desktop" Question=Default / Opened */
export const FAQ: StoryObj = {
  render: () => (
    <div className="w-[712px] max-w-full">
      <Accordion>
        <AccordionItem question="Can I cancel anytime?">
          Yes. Cancel from your account page at any time; access continues until the end of the billing period.
        </AccordionItem>
        <AccordionItem question="Is my subscription private?" defaultOpen>
          Yes. Your account and listening history are completely private. We do not share your personal data with third
          parties. Charges on your statement will appear as &quot;Bad Orange LLC&quot; — not Daddy Sounds.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
