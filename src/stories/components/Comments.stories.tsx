import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Comment } from "@/components/comments/Comment";
import { CommentComposer } from "@/components/comments/CommentComposer";

const meta: Meta = { title: "Components/Comments", parameters: { layout: "padded" } };
export default meta;

/** Figma: "Desktop Comments" Type=Default / Active — 1240×124 */
export const ComposerDesktop: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-10">
      <CommentComposer />
      <CommentComposer defaultValue="I can’t stop listening this story..." forceState="active" />
    </div>
  ),
};

/** Figma: "Comment" Type=Default / Active — 350×179 mobile, Cancel + Save */
export const ComposerMobile: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      <CommentComposer layout="mobile" defaultValue="I can’t stop listening this story..." forceState="active" />
      <CommentComposer layout="mobile" />
    </div>
  ),
};

/** Figma: "Comment" Size=Comment desktop with thread — 1240×193 */
export const Thread: StoryObj = {
  render: () => (
    <div className="w-[1240px] max-w-full">
      <Comment
        author="Pony"
        at="12:20"
        ago="2d"
        likes={1}
        body="I’ve never been this early to anything in my life omg. Thank you insomnia"
      >
        <Comment author="Emilia" ago="2d" likes={1} emoji="💋" replyingTo="pony" body="OMG" />
      </Comment>
    </div>
  ),
};

/** Figma: "Comment" Size=Comment mobile — 350×97 */
export const Mobile: StoryObj = {
  render: () => (
    <div className="w-[350px]">
      <Comment layout="mobile" author="Pony" at="12:20" ago="2d" likes={1} body="Thank you insomnia" />
    </div>
  ),
};
