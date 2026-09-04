"use client";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { IconEmoji } from "@/icons/generated";

/**
 * Figma: Design system → Filters details & Comments
 *   "Desktop Comments" (324:6577)  Type=Default / Active — 1240×124
 *     Default: 1px white 20% box, placeholder "Write comment at 8:30", grey Post
 *     Active:  1px white 60% box, white 90% text, red gradient Post
 *   "Comment" (324:6545)           Type=Default / Active — 350×179 mobile,
 *     Cancel + Save instead of Post.
 * The timestamp in the placeholder is the playhead position, so it is a prop.
 */
export type CommentComposerProps = {
  /** Playhead position shown in the placeholder. */
  at?: string;
  avatarEmoji?: string;
  defaultValue?: string;
  layout?: "desktop" | "mobile";
  /** Storybook only: pin the focused treatment. */
  forceState?: "active";
  onSubmit?: (text: string) => void;
  onCancel?: () => void;
  className?: string;
};

export function CommentComposer({
  at = "8:30",
  avatarEmoji,
  defaultValue = "",
  layout = "desktop",
  forceState,
  onSubmit,
  onCancel,
  className,
}: CommentComposerProps) {
  const id = useId();
  const [text, setText] = useState(defaultValue);
  const active = forceState === "active" || text.length > 0;
  const mobile = layout === "mobile";

  return (
    <div
      data-state={forceState}
      className={cn(
        "group/composer flex items-start gap-4",
        mobile ? "w-[350px]" : "w-[1240px]",
        "max-w-full",
        className,
      )}
    >
      <Avatar emoji={avatarEmoji} className={mobile ? "size-[44px] text-[20px]" : ""} />
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div
          className={cn(
            "flex flex-col gap-2 rounded-lg border px-5 py-4 transition-colors",
            active ? "border-white-60" : "border-white-20",
            "focus-within:border-white-60",
          )}
        >
          <label htmlFor={id} className="sr-only">
            Write a comment at {at}
          </label>
          <textarea
            id={id}
            rows={mobile ? 2 : 1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Write comment at ${at}`}
            className={cn(
              "w-full resize-none bg-transparent font-sans text-[18px] leading-[1.2] font-medium outline-none",
              "placeholder:text-white-60",
              active ? "text-white-90" : "text-white-60",
            )}
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Add emoji"
              className="outline-none hover:opacity-80 focus-visible:opacity-80"
            >
              <IconEmoji />
            </button>
            {!mobile && (
              <Button
                variant={active ? "primary-red" : "primary-white"}
                size="sm"
                disabled={!active}
                forceState={active ? undefined : "disabled"}
                onClick={() => onSubmit?.(text)}
                className="w-[100px] px-0"
              >
                Post
              </Button>
            )}
          </div>
        </div>
        {mobile && (
          <div className="flex items-center justify-between">
            <Button variant="tertiary" size="sm" onClick={onCancel} className="w-[100px] px-0">
              Cancel
            </Button>
            <Button
              variant={active ? "primary-red" : "primary-white"}
              size="sm"
              disabled={!active}
              forceState={active ? undefined : "disabled"}
              onClick={() => onSubmit?.(text)}
              className="w-[100px] px-0"
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
