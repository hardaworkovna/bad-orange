import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./reference.css";

import * as Icons from "@/icons/generated";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { IconButton } from "@/components/ui/IconButton";
import { AuthButton } from "@/components/ui/AuthButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { TextField } from "@/components/ui/TextField";
import { Select, DropdownMenu, DropdownItem } from "@/components/ui/Select";
import { PaymentOption } from "@/components/ui/PaymentOption";
import { SavedCardRow } from "@/components/ui/SavedCardRow";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { SegmentedToggle } from "@/components/ui/SegmentedToggle";
import { Tabs } from "@/components/ui/Tabs";
import { FilterButton, SortButton, ActiveFilter } from "@/components/ui/FilterChip";
import { ReactionTag, CategoryChip, FreeTag, LockedTag, AccessTile, BestValueIcon } from "@/components/ui/Tag";
import { ActivityBadge } from "@/components/ui/ActivityBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Tooltip, TooltipBubble, InfoIcon } from "@/components/ui/Tooltip";
import { PaginationDots } from "@/components/ui/Pagination";
import { ConfirmPopup, AccountMenu } from "@/components/ui/Popup";
import { ReactionsPicker, EmojiCircle } from "@/components/ui/ReactionsPicker";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { CategoryTile, CATEGORY_PALETTES } from "@/components/ui/CategoryTile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PlayButton } from "@/components/player/PlayButton";
import { ProgressBar } from "@/components/player/ProgressBar";
import { PlayerBar } from "@/components/player/PlayerBar";
import { AudioCard, MiniCard } from "@/components/player/AudioCard";
import { ItemPlay, PopularRow } from "@/components/player/ItemPlay";
import { Comment } from "@/components/comments/Comment";
import { CommentComposer } from "@/components/comments/CommentComposer";

/* ── page chrome ─────────────────────────────────────────────────────── */

const SECTIONS = [
  ["colour", "Colour"],
  ["type", "Typography"],
  ["icons", "Icons"],
  ["buttons", "Buttons & links"],
  ["forms", "Forms"],
  ["selection", "Selection & nav"],
  ["tags", "Tags & badges"],
  ["overlays", "Overlays"],
  ["player", "Player"],
  ["comments", "Comments"],
  ["layout", "Layout"],
  ["open", "Open questions"],
] as const;

function Section({
  id,
  num,
  title,
  note,
  children,
}: {
  id: string;
  num: string;
  title: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 pt-18">
      <div className="ref-rule flex items-baseline gap-4 border-b pb-3.5">
        <span className="ref-mono ref-meta text-[11px]">{num}</span>
        <h2 className="font-display text-h5 text-white uppercase">{title}</h2>
      </div>
      {note && <p className="text-white-60 mt-4 max-w-[68ch] text-[15px]">{note}</p>}
      {children}
    </section>
  );
}

function Group({ title, src, children }: { title: string; src?: string; children: ReactNode }) {
  return (
    <>
      <h3 className="ref-mono ref-meta mt-10 mb-3 text-[11px] font-semibold tracking-[0.12em] uppercase">
        {title} {src && <span className="font-normal tracking-normal normal-case opacity-55">{src}</span>}
      </h3>
      {children}
    </>
  );
}

function Well({ children, scroll, tight }: { children: ReactNode; scroll?: boolean; tight?: boolean }) {
  return <div className={`ref-well ${tight ? "p-6" : "p-8"} ${scroll ? "overflow-x-auto" : ""}`}>{children}</div>;
}

function Cap({ children }: { children: ReactNode }) {
  return <p className="ref-mono ref-meta mt-2.5 text-[11px]">{children}</p>;
}

function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="ref-mono ref-meta text-[11px]">{label}</span>
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="ref-mono ref-spec text-[12.5px]">{children}</code>;
}

/* ── foundations data ────────────────────────────────────────────────── */

const BASE = [
  ["black", "#121212", "Group/Black · page ground", "bg-black border border-white-20"],
  ["white", "#FFFFFF", "Group/White", "bg-white"],
  ["gray", "#7D7D7D", "Group/Gray · disabled fills", "bg-gray"],
  ["light-gray", "#D1D1D1", "Group/Light Gray", "bg-light-gray"],
  ["red", "#F50C22", "Group/Red · error, active dot", "bg-red"],
  ["stroke", "#FF6464", "Group/Stroke gradient", "bg-stroke"],
];
const ALPHAS = [
  ["white-90", "90%", "primary text on dark"],
  ["white-80", "80%", "secondary text"],
  ["white-60", "60%", "labels, nav, muted"],
  ["white-30", "30%", "glow-button stroke"],
  ["white-20", "20%", "default stroke, rules"],
  ["white-15", "15%", "tile stroke, popup"],
  ["white-10", "10%", "hover fill, tracks"],
  ["white-02", "2%", "glass surfaces"],
];
const GRADIENTS = [
  ["gradient-red", "109° #FF0000 → #D80505", "primary red button", "bg-gradient-red"],
  ["gradient-red-active", "109° #FF0000 → #AB0505", "pressed", "bg-gradient-red-active"],
  ["gradient-red-10", "Red linear 10%", "selected fills", "bg-gradient-red-10 border border-white-20"],
  ["shadow-red-glow", "0 12 15 rgba(255,28,28,.3)", "primary red hover", "bg-red shadow-red-glow"],
  [
    "shadow-red-ring",
    "0 0 30 rgba(244,2,1,.4)",
    "mobile icon buttons",
    "bg-black border border-white-30 shadow-red-ring",
  ],
  ["shadow-red-pill", "0 0 20 rgba(244,2,1,.6)", "toggle “on”", "bg-red-solid shadow-red-pill"],
];
const ACCENTS = [
  ["reaction-feral", "#F50C22", "bg-reaction-feral"],
  ["reaction-melted", "#D80BBA", "bg-reaction-melted"],
  ["reaction-begging", "#FF5213", "bg-reaction-begging"],
  ["reaction-ruined", "#771BE5", "bg-reaction-ruined"],
  ["badge-founding", "#FF6464", "bg-badge-founding"],
  ["badge-hours", "#FF8FF0", "bg-badge-hours"],
  ["badge-streak", "#FFB18F", "bg-badge-streak"],
  ["badge-legend", "#9C01F6", "bg-badge-legend"],
];

function Swatch({ name, value, note, cls }: { name: string; value: string; note?: string; cls: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className={`block h-19 rounded ${cls}`} />
      <b className="ref-mono text-[12px] font-semibold text-white">{name}</b>
      <span className="ref-mono ref-meta text-[11px] leading-normal">
        <em className="ref-spec not-italic">{value}</em>
        {note ? ` ${note}` : ""}
      </span>
    </div>
  );
}

const DISPLAY_STYLES: [string, string, string][] = [
  ["type-extra-big", "1440/Extra big 62 · Mobile 42", "Be bad tonight"],
  ["type-h1", "1440/H1 52 · Mobile 34", "Audio library"],
  ["type-h2", "1440/H2 44 · Mobile 26", "Most played"],
  ["type-h3", "1440/H3 35 · no mobile style", "Dark romance"],
  ["type-h4", "1440/H4 30 · Mobile 24", "Choose your plan"],
  ["type-h5", "1440/H5 25 · Mobile 20", "Can I cancel anytime?"],
  ["type-tags", "1440/Tags 20 · Mobile 15", "Dom daddy"],
];
const TEXT_STYLES: [string, string, string][] = [
  ["type-body-tags", "1440 22 SemiBold · Mobile 18 Medium", "My library"],
  ["type-body-lg", "1440 18 · Mobile 16", "Ten minutes, headphones on, door closed."],
  ["type-body-md", "1440 16 · Mobile 14", "New audios every Friday, and the back catalogue never expires."],
  ["type-xs-bold", "14 SemiBold", "Enter a valid email"],
  ["type-xs", "14 Regular", "Billed monthly · cancel anytime"],
];

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "br", label: "Brazil" },
  { value: "ua", label: "Ukraine" },
  { value: "pt", label: "Portugal" },
];

const OPEN_QUESTIONS: [string, string, string][] = [
  [
    "Layout grid",
    "The Grids frame returns no column data through the Figma connector, so the layout constants come from the header and footer instead: 60px side padding and a 1220px content column at 1440, 20px at 390.",
    "Needed: column count and gutter from the Figma layout grid.",
  ],
  [
    "Category gradients",
    "Each of the 21 categories has its own two-stop gradient plus two blurred ellipses. Dom Daddy and Spicy are read exactly; the rest use the Dom Daddy palette as a placeholder.",
    "Read the remaining 19 when the Categories page is built — no action needed from you.",
  ],
  [
    "Logo format",
    "The logo comes out of Figma as a raster export at 190×40 and 120×25 (@2x). It is sharp at those two sizes and nowhere else.",
    "Needed: the logo as SVG, if a vector version exists.",
  ],
  [
    "Transport order in the play bar",
    "Figma puts skip-forward-15 to the left of play/pause and skip-back-15 to the right — the reverse of the usual order. The code follows Figma.",
    "Confirm this is deliberate, or I swap them.",
  ],
  [
    "Payment option, selected",
    "Figma turns the card glyph white when the option is selected; the exported SVG has grey baked in, so the code keeps grey.",
    "Tell me which you prefer — it is a two-line fix.",
  ],
  [
    "Artwork",
    "Every cover on this page is a placeholder gradient. The Figma file keeps its photography in a separate Pictures section, which is not wired into code.",
    "Needed: where the real artwork will come from (upload, CMS, or the Figma exports).",
  ],
];

/* ── page ────────────────────────────────────────────────────────────── */

function Page() {
  return (
    <div className="mx-auto grid max-w-[1400px] gap-14 px-8 pb-30 lg:grid-cols-[208px_minmax(0,1fr)]">
      <nav aria-label="Sections" className="sticky top-0 hidden h-screen self-start overflow-y-auto py-10 lg:block">
        <p className="ref-mono ref-meta mb-4 text-[11px] tracking-[0.12em] uppercase">Design system</p>
        <ol className="flex list-none flex-col gap-0.5 p-0">
          {SECTIONS.map(([id, label], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-white-60 flex gap-2.5 py-[5px] text-[14px] no-underline transition-colors hover:text-white focus-visible:text-white"
              >
                <span className="ref-mono ref-meta pt-[3px] text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main>
        <header className="ref-rule border-b pt-18 pb-10">
          <p className="ref-mono text-red mb-5 text-[11px] tracking-[0.14em] uppercase">Phase 1 · for review</p>
          <h1 className="type-extra-big text-balance text-white">
            Daddy Sounds
            <br />
            design system
          </h1>
          <p className="text-white-60 mt-6 max-w-[62ch] text-[18px]">
            Every component on the Figma “Design system” page, rendered from the actual React components in{" "}
            <Code>src/components</Code> — not a copy of them. Hover anything: the states are the real ones. Each group
            names its Figma component underneath.
          </p>
          <dl className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-8 gap-y-6">
            {[
              [
                "Source of truth",
                <>
                  Figma <Code>rjr5fYd7zrN1jGSxy4QEVK</Code> → “Design system ✅”
                </>,
              ],
              ["Tokens live in", <Code key="tokens">src/app/globals.css</Code>],
              ["Components", <Code key="components">src/components</Code>],
              [
                "Live version",
                <>
                  <Code>npm run storybook</Code> → localhost:6006
                </>,
              ],
            ].map(([label, value], i) => (
              <div key={i}>
                <dt className="ref-mono ref-meta text-[10px] tracking-[0.12em] uppercase">{label}</dt>
                <dd className="text-white-80 mt-1.5 ml-0 text-[14px]">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* 01 COLOUR */}
        <Section
          id="colour"
          num="01"
          title="Colour"
          note={
            <>
              Named after the Figma variables so a review comment can name either side. White is used at eight fixed
              opacities — those are the file’s <Code>Group/White xx%</Code> variables, not ad-hoc alphas.
            </>
          }
        >
          <Group title="Base" src="Group/*">
            <Well>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-6">
                {BASE.map(([n, v, note, cls]) => (
                  <Swatch key={n} name={n} value={v} note={note} cls={cls} />
                ))}
              </div>
            </Well>
          </Group>
          <Group title="White opacities" src="Group/White 10–90%">
            <Well>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                {ALPHAS.map(([n, v, note]) => (
                  <Swatch key={n} name={n} value={v} note={note} cls={`bg-${n}`} />
                ))}
              </div>
            </Well>
          </Group>
          <Group title="Gradients & glows">
            <Well>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-6">
                {GRADIENTS.map(([n, v, note, cls]) => (
                  <Swatch key={n} name={n} value={v} note={note} cls={cls} />
                ))}
              </div>
            </Well>
          </Group>
          <Group title="Accent scales" src="reactions · activity badges">
            <Well>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                {ACCENTS.map(([n, v, cls]) => (
                  <Swatch key={n} name={n} value={v} cls={cls} />
                ))}
              </div>
            </Well>
          </Group>
        </Section>

        {/* 02 TYPE */}
        <Section
          id="type"
          num="02"
          title="Typography"
          note={
            <>
              Two faces: <strong>Special Gothic Expanded One</strong> for every uppercase heading and tag,{" "}
              <strong>Host Grotesk</strong> for everything read as text. Each utility carries both sizes and switches at
              768px — narrow the window and this table restyles itself.
            </>
          }
        >
          <Group title="Display" src="Special Gothic Expanded One · 400">
            <Well>
              <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-baseline gap-x-10">
                {DISPLAY_STYLES.map(([util, meta, sample]) => (
                  <TypeRow key={util} util={util} meta={meta} sample={sample} />
                ))}
              </div>
            </Well>
          </Group>
          <Group title="Text" src="Host Grotesk">
            <Well>
              <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-baseline gap-x-10">
                {TEXT_STYLES.map(([util, meta, sample]) => (
                  <TypeRow key={util} util={util} meta={meta} sample={sample} />
                ))}
              </div>
            </Well>
          </Group>
        </Section>

        {/* 03 ICONS */}
        <Section
          id="icons"
          num="03"
          title="Icons"
          note={
            <>
              All {Object.keys(Icons).length}, exported from the Figma <em>Icons</em> frame as SVG and generated into
              React components by <Code>scripts/build-icons.mjs</Code>. Colour and gradients are baked in exactly as
              Figma exported them.
            </>
          }
        >
          <Well tight>
            <div className="grid grid-cols-3 gap-0.5 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
              {Object.entries(Icons).map(([name, Icon]) => (
                <div key={name} className="bg-white-02 flex flex-col items-center gap-2.5 px-2 py-4.5">
                  <span className="flex h-8 items-center">
                    <Icon />
                  </span>
                  <span className="ref-mono ref-meta text-center text-[10px] break-words">
                    {name.replace(/^Icon/, "")}
                  </span>
                </div>
              ))}
            </div>
          </Well>
        </Section>

        {/* 04 BUTTONS */}
        <Section
          id="buttons"
          num="04"
          title="Buttons & links"
          note="Four button families, each with the four Figma states. The first column is live — hover it. The rest are pinned so you can compare all four at once."
        >
          <Group title="Button" src="Buttons → Primary/White · Primary/Red · Secondary · Third">
            <Well scroll>
              <div className="grid grid-cols-[max-content_repeat(4,max-content)] items-center gap-x-6 gap-y-3.5">
                <span />
                {["Default", "Hover", "Active", "Disabled"].map((s) => (
                  <span key={s} className="ref-mono ref-meta text-[10px] tracking-[0.1em] uppercase">
                    {s}
                  </span>
                ))}
                {(
                  [
                    ["primary-white", "Login"],
                    ["primary-red", "Get membership"],
                    ["secondary", "Unlock full library now"],
                    ["tertiary", "Get free account"],
                  ] as const
                ).map(([variant, label]) => (
                  <ButtonRow key={variant} variant={variant} label={label} />
                ))}
              </div>
            </Well>
          </Group>
          <Group title="Small & full-width" src="Button/Secondary/Mobile — 350×50">
            <Well>
              <div className="flex flex-col items-start gap-5">
                <Button variant="tertiary" size="sm" className="w-[350px]">
                  Show more
                </Button>
                <Button variant="primary-red" fullWidth>
                  Get membership
                </Button>
              </div>
            </Well>
          </Group>
          <Group title="Text link" src="Buttons → Button see all">
            <Well>
              <div className="flex flex-wrap items-center gap-10">
                <Specimen label="desktop 22">
                  <TextLink size="desktop">See all</TextLink>
                </Specimen>
                <Specimen label="hover">
                  <TextLink size="desktop" forceState="hover">
                    See all
                  </TextLink>
                </Specimen>
                <Specimen label="disabled">
                  <TextLink size="desktop" forceState="disabled" disabled>
                    See all
                  </TextLink>
                </Specimen>
                <Specimen label="mobile 16">
                  <TextLink size="mobile">See all</TextLink>
                </Specimen>
              </div>
            </Well>
          </Group>
          <Group title="Icon buttons" src="Buttons → Arrow · Frame 5 · Search small · Icon/Close">
            <Well>
              <div className="flex flex-wrap items-center gap-7">
                {([undefined, "hover", "focus", "disabled"] as const).map((s) => (
                  <Specimen key={String(s)} label={`arrow · ${s ?? "default"}`}>
                    <IconButton label="Next" forceState={s} disabled={s === "disabled"}>
                      {s === "disabled" ? (
                        <Icons.IconArrowRightDisabled className="rotate-90" />
                      ) : (
                        <Icons.IconArrowUp className="rotate-90" />
                      )}
                    </IconButton>
                  </Specimen>
                ))}
                <Specimen label="glow · menu">
                  <IconButton variant="glow" label="Menu">
                    <Icons.IconMenu />
                  </IconButton>
                </Specimen>
                <Specimen label="glow · search">
                  <IconButton variant="glow" label="Search">
                    <Icons.IconSearch />
                  </IconButton>
                </Specimen>
                <Specimen label="close 28">
                  <IconButton variant="plain" label="Close">
                    <Icons.IconClose size={28} />
                  </IconButton>
                </Specimen>
              </div>
            </Well>
          </Group>
          <Group title="Sign-in" src="Buttons → Continue with Google">
            <Well>
              <div className="flex flex-col items-start gap-4">
                <AuthButton provider="google" />
                <AuthButton provider="email" />
                <AuthButton provider="apple" />
              </div>
            </Well>
          </Group>
        </Section>

        {/* 05 FORMS */}
        <Section
          id="forms"
          num="05"
          title="Forms"
          note="Every field is a 61px pill with a 2px stroke; what changes between states is the stroke colour and whether the red 10% gradient fills it. Type into the first field — it moves to the “typing” treatment on its own."
        >
          <Group title="Field" src="Buttons → Field · 6 types">
            <Well>
              <div className="flex flex-wrap items-start gap-8">
                <Specimen label="Default (live)">
                  <TextField label="Email" placeholder="name@gmail.com" />
                </Specimen>
                <Specimen label="Hovered">
                  <TextField label="Email" placeholder="name@gmail.com" forceState="hover" tabIndex={-1} />
                </Specimen>
                <Specimen label="Typing">
                  <TextField label="Email" defaultValue="name@gmail.com" forceState="typing" tabIndex={-1} />
                </Specimen>
                <Specimen label="Disabled">
                  <TextField label="Email" placeholder="name@gmail.com" disabled />
                </Specimen>
                <Specimen label="Filled">
                  <TextField label="Email" defaultValue="name@gmail.com" forceState="filled" tabIndex={-1} />
                </Specimen>
                <Specimen label="Failed">
                  <TextField label="Email" defaultValue="fkdkdksksks" error="Enter a valid email" tabIndex={-1} />
                </Specimen>
              </div>
            </Well>
          </Group>
          <Group title="Search" src="Buttons → Search · Desktop default / active">
            <Well>
              <div className="flex flex-col items-start gap-5">
                <SearchInput />
                <SearchInput defaultValue="Dark romance" forceState="active" />
              </div>
            </Well>
          </Group>
          <Group title="Dropdown" src="Buttons → Field dropdown + Popup">
            <Well>
              <div className="flex flex-wrap items-start gap-12 pb-64">
                <Specimen label="Default">
                  <Select label="Country" options={COUNTRIES} defaultValue="us" />
                </Specimen>
                <Specimen label="Focused">
                  <Select label="Country" options={COUNTRIES} defaultValue="us" forceOpen />
                </Specimen>
                <Specimen label="Popup">
                  <DropdownMenu>
                    <DropdownItem selected>United States</DropdownItem>
                    <DropdownItem>Brazil</DropdownItem>
                    <DropdownItem>Ukraine</DropdownItem>
                    <DropdownItem>Portugal</DropdownItem>
                  </DropdownMenu>
                </Specimen>
              </div>
            </Well>
          </Group>
          <Group title="Payment" src="Buttons → Field type of payment · Field for card">
            <Well>
              <div className="flex flex-wrap items-center gap-6">
                <Specimen label="Default">
                  <PaymentOption method="card" name="p1" />
                </Specimen>
                <Specimen label="Hovered">
                  <PaymentOption method="card" name="p2" forceState="hover" />
                </Specimen>
                <Specimen label="Selected">
                  <PaymentOption method="card" name="p3" defaultChecked />
                </Specimen>
                <Specimen label="Disabled">
                  <PaymentOption method="card" name="p4" disabled />
                </Specimen>
                <Specimen label="Google Pay">
                  <PaymentOption method="google-pay" name="p5" />
                </Specimen>
              </div>
              <div className="mt-7 flex flex-col gap-5">
                <SavedCardRow name="c1" last4="7684" />
                <SavedCardRow name="c2" last4="7684" defaultChecked />
              </div>
            </Well>
          </Group>
        </Section>

        {/* 06 SELECTION */}
        <Section
          id="selection"
          num="06"
          title="Selection & navigation"
          note="Checkbox and radio are the Figma SVGs, not CSS approximations, so the stroke weight matches. Tabs and the toggle are the two places the system uses a hard 8px shape instead of a pill."
        >
          <Group title="Checkbox & radio" src="Icons → checkbox · Buttons → Icon">
            <Well>
              <div className="flex flex-wrap items-center gap-10">
                <Checkbox label="All" />
                <Checkbox label="Most Recent" defaultChecked />
                <Radio name="r" label="Default" />
                <Radio name="r" label="Selected" defaultChecked />
              </div>
            </Well>
          </Group>
          <Group title="Toggle" src="Toggle Public/Privacy · Format tab Audio/Video">
            <Well>
              <div className="flex flex-wrap items-center gap-7">
                <SegmentedToggle
                  label="Visibility"
                  options={[
                    { value: "public", label: "Public" },
                    { value: "privacy", label: "Privacy" },
                  ]}
                  defaultValue="public"
                />
                <SegmentedToggle
                  label="Visibility 2"
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
              </div>
            </Well>
          </Group>
          <Group title="Tabs" src="Tabs Desktop 401 · Tabs Mobile 350">
            <Well>
              <div className="flex flex-wrap items-start gap-14">
                <Specimen label="desktop · 22 SemiBold">
                  <Tabs
                    label="Library"
                    size="desktop"
                    items={[
                      { value: "explore", label: "Explore" },
                      { value: "library", label: "My library" },
                    ]}
                    defaultValue="library"
                  />
                </Specimen>
                <Specimen label="mobile · 18 Medium">
                  <Tabs
                    label="Library"
                    size="mobile"
                    items={[
                      { value: "explore", label: "Explore" },
                      { value: "library", label: "My library" },
                    ]}
                    defaultValue="explore"
                  />
                </Specimen>
              </div>
            </Well>
          </Group>
          <Group title="Filters" src="Filters · Mobile/Filter · Filter/Selected">
            <Well>
              <div className="flex flex-wrap items-center gap-5">
                <Specimen label="Default">
                  <FilterButton />
                </Specimen>
                <Specimen label="Opened">
                  <FilterButton open />
                </Specimen>
                <Specimen label="Selected">
                  <FilterButton count={2} />
                </Specimen>
                <Specimen label="Selected opened">
                  <FilterButton count={1} open />
                </Specimen>
                <Specimen label="Disabled">
                  <FilterButton count={1} open disabled />
                </Specimen>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Specimen label="Applied chip">
                  <ActiveFilter>Most Recent</ActiveFilter>
                </Specimen>
                <Specimen label="Mobile sort · 351×50">
                  <SortButton />
                </Specimen>
              </div>
            </Well>
          </Group>
        </Section>

        {/* 07 TAGS */}
        <Section
          id="tags"
          num="07"
          title="Tags & badges"
          note="Reaction tags carry their own colour when selected and the shared red 10% fill when not — the only place in the system where a component owns a hue outside the red family."
        >
          <Group title="Reactions" src="Reaction/Tags Selected · Default">
            <Well>
              <div className="flex flex-wrap gap-4">
                {(["feral", "melted", "begging", "ruined"] as const).map((r) => (
                  <ReactionTag key={r} reaction={r} selected />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                {(["feral", "melted", "begging", "ruined"] as const).map((r) => (
                  <ReactionTag key={r} reaction={r} />
                ))}
              </div>
              <Cap>Top row selected · bottom row default</Cap>
            </Well>
          </Group>
          <Group title="Category & access" src="Category tag · Type of user · icon lock/premium · Best value">
            <Well>
              <div className="flex flex-wrap items-center gap-6">
                <CategoryChip>Dark Romance</CategoryChip>
                <FreeTag />
                <LockedTag />
                <AccessTile kind="premium" />
                <AccessTile kind="lock" />
                <BestValueIcon />
              </div>
            </Well>
          </Group>
          <Group title="Activity badges" src="Badges & Tags → Badges for Activity">
            <Well>
              <div className="flex flex-wrap gap-7">
                <ActivityBadge kind="founding-member" />
                <ActivityBadge kind="hundred-hour-club" />
                <ActivityBadge kind="seven-day-streak" />
                <ActivityBadge kind="community-legend" />
              </div>
            </Well>
          </Group>
          <Group title="Avatar & pagination" src="Icons → Component 3 · Pagination">
            <Well>
              <div className="flex flex-wrap items-center gap-7">
                <Avatar />
                <Avatar emoji="😈" />
                <Avatar ageGate />
                <PaginationDots count={5} index={0} />
              </div>
            </Well>
          </Group>
        </Section>

        {/* 08 OVERLAYS */}
        <Section
          id="overlays"
          num="08"
          title="Overlays"
          note={
            <>
              Three surface treatments, and they are not interchangeable: solid <Code>#121212</Code> with a 1px stroke
              for a decision, a 2px stroke for a menu, and the glass 2% fill with 50px blur for anything that floats
              over content.
            </>
          }
        >
          <Group title="Dialogs" src="Pop-up/Delete comment · Account/Settings">
            <Well>
              <div className="flex flex-wrap items-start gap-8">
                <Specimen label="Confirm · 350 wide">
                  <ConfirmPopup />
                </Specimen>
                <Specimen label="Account menu">
                  <AccountMenu
                    items={[{ label: "Account settings" }, { label: "Manage my subscription" }, { label: "Log out" }]}
                  />
                </Specimen>
              </div>
            </Well>
          </Group>
          <Group title="Reactions picker" src="Badges & Tags → Pop-up/Reactions">
            <Well>
              <div className="flex flex-wrap items-start gap-8">
                <ReactionsPicker value="👄" />
                <div className="flex gap-4">
                  <EmojiCircle emoji="👄" />
                  <EmojiCircle emoji="👄" selected />
                </div>
              </div>
            </Well>
          </Group>
          <Group title="Tooltip" src="Icons → icon states · icon/Tooltip">
            <Well>
              <div className="flex flex-wrap items-center gap-6">
                <InfoIcon />
                <InfoIcon state="hovered" />
                <InfoIcon state="active" />
                <TooltipBubble>
                  Private accounts comments are hidden to nonmembers and are not findable on search engines.
                </TooltipBubble>
                <Tooltip content="Hover or click me." />
              </div>
            </Well>
          </Group>
          <Group title="FAQ row" src="Design common sections → Question Default / Opened">
            <Well>
              <Accordion>
                <AccordionItem question="Can I cancel anytime?">
                  Yes. Cancel from your account page at any time; access continues to the end of the billing period.
                </AccordionItem>
                <AccordionItem question="Is my subscription private?" defaultOpen>
                  Yes. Your account and listening history are completely private. Charges on your statement appear as
                  “Bad Orange LLC” — not Daddy Sounds.
                </AccordionItem>
              </Accordion>
            </Well>
          </Group>
        </Section>

        {/* 09 PLAYER */}
        <Section
          id="player"
          num="09"
          title="Player"
          note={
            <>
              Figma’s <em>UI elements / Player</em> frame. The scrubber is the piece to look at: the track is not a
              plain progress fill but a <strong>reaction heatmap</strong> — where listeners reacted. The three segments
              are Figma’s; real listening data replaces them. Drag it.
            </>
          }
        >
          <Group title="Transport button" src="UI elements/Player → Button Pause · 5 variants">
            <Well>
              <div className="flex flex-wrap items-center gap-7">
                <Specimen label="Pause default">
                  <PlayButton action="pause" />
                </Specimen>
                <Specimen label="Pause hovered">
                  <PlayButton action="pause" forceState="hover" />
                </Specimen>
                <Specimen label="Play default">
                  <PlayButton action="play" />
                </Specimen>
                <Specimen label="Play hovered">
                  <PlayButton action="play" forceState="hover" />
                </Specimen>
                <Specimen label="Disabled">
                  <PlayButton action="play" disabled />
                </Specimen>
              </div>
            </Well>
          </Group>
          <Group title="Scrubber" src="the 8px track inside Play bar">
            <Well>
              <ProgressBar caption="Heatmap: Reactions intensity" />
            </Well>
          </Group>
          <Group title="Play bar" src="Play bar 1440 · Default / Variant2 / Variant3 / Variant4 · and 390">
            <Well tight scroll>
              <PlayerBar playing />
              <Cap>Pause · default</Cap>
              <div className="mt-4">
                <PlayerBar />
              </div>
              <Cap>Play · default</Cap>
              <div className="mt-4">
                <PlayerBar forceButtonState="hover" />
              </div>
              <Cap>Play · hovered</Cap>
              <div className="mt-4">
                <PlayerBar playing forceButtonState="hover" />
              </div>
              <Cap>Pause · hovered</Cap>
            </Well>
            <div className="mt-3">
              <Well tight>
                <PlayerBar layout="mobile" />
                <Cap>390 — mobile bar</Cap>
              </Well>
            </div>
          </Group>
          <Group title="Cards" src="Card Main Desktop 289×381 · Main Mobile 198×324 · Card/Secondary 139×202">
            <Well>
              <div className="flex flex-wrap items-start gap-8">
                <AudioCard
                  title="Phone sex"
                  description="Then owning and stretching your pretty slut pussy"
                  duration="2:15"
                  plays="1, 800 Plays"
                />
                <AudioCard
                  layout="mobile"
                  title="Phone sex"
                  description="Then owning and stretching your pretty slut pussy"
                  duration="2:15"
                  plays="1, 800 Plays"
                />
                <MiniCard title="Dark romance" />
              </div>
              <Cap>Artwork is a placeholder — photography lives in the Pictures section of the Figma file.</Cap>
            </Well>
          </Group>
          <Group title="Item play & popular" src="Item play Desktop 606×120 · Mobile 350×156 · Container popular audio">
            <Well>
              <div className="flex flex-wrap items-start gap-8">
                <ItemPlay title="So sexy when she cumes for us" plays="321,123 Plays" />
                <ItemPlay layout="mobile" title="Leaking just for you" plays="321,123 Plays" />
              </div>
              <div className="mt-7 flex flex-col gap-6">
                <PopularRow title="So sexy when she cumes for us" plays="321,123 Plays" />
                <PopularRow layout="mobile" title="So sexy when she cumes for us" plays="321,123 Plays" />
              </div>
            </Well>
          </Group>
        </Section>

        {/* 10 COMMENTS */}
        <Section
          id="comments"
          num="10"
          title="Comments"
          note="Comments are pinned to a moment in the audio: the red chip next to the name is the playhead the comment was left at, and it is what makes the heatmap above possible. Type in the first composer — it moves to the active treatment on its own."
        >
          <Group title="Composer" src="Desktop Comments → Type=Default / Active · 1240×124">
            <Well scroll>
              <CommentComposer />
              <Cap>Default</Cap>
              <div className="mt-6">
                <CommentComposer defaultValue="I can’t stop listening this story..." forceState="active" />
              </div>
              <Cap>Active</Cap>
            </Well>
          </Group>
          <Group title="Composer, mobile" src="Comment → Type=Active / Default · 350×179">
            <Well>
              <div className="flex flex-wrap items-start gap-8">
                <CommentComposer
                  layout="mobile"
                  defaultValue="I can’t stop listening this story..."
                  forceState="active"
                />
                <CommentComposer layout="mobile" />
              </div>
            </Well>
          </Group>
          <Group title="Comment with thread" src="Comment → Size=Comment desktop with thread · 1240×193">
            <Well scroll>
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
            </Well>
          </Group>
        </Section>

        {/* 11 LAYOUT */}
        <Section
          id="layout"
          num="11"
          title="Layout"
          note="Two frames in Figma: 1440 and 390. Header and footer below are at true 1440 width — scroll them sideways inside their well. Side padding is 60px at 1440 and 20px at 390; footer content sits in a 1220px column."
        >
          <Group title="Header" src="Headers&Footers → 1440/Headers · 390/Header">
            <Well tight scroll>
              <Header layout="desktop" user="guest" currentPath="/categories" />
              <Cap>Type=Inkognito — guest</Cap>
              <div className="mt-4">
                <Header layout="desktop" user="free" />
              </div>
              <Cap>Type=Free user</Cap>
              <div className="mt-4">
                <Header layout="desktop" user="premium" />
              </div>
              <Cap>Type=Premium User</Cap>
            </Well>
            <div className="mt-3">
              <Well tight>
                <div className="w-[390px]">
                  <Header layout="mobile" />
                </div>
                <Cap>390/Header — same for every user type</Cap>
              </Well>
            </div>
          </Group>
          <Group title="Footer" src="Headers&Footers → Footers 1440 / 390">
            <Well tight scroll>
              <div className="w-[1440px]">
                <Footer layout="desktop" />
              </div>
              <Cap>Size=1440 — copy verbatim from Figma</Cap>
            </Well>
            <div className="mt-3">
              <Well tight>
                <div className="w-[390px]">
                  <Footer layout="mobile" />
                </div>
                <Cap>Size=390</Cap>
              </Well>
            </div>
          </Group>
          <Group title="Category tiles" src="Tags Category → desktop 289² · small 289×100 · mobile 169×74">
            <Well>
              <Cap>
                Two of the 21 category gradients are read from Figma so far — the rest come with the Categories page.
              </Cap>
              <div className="mt-4 flex flex-wrap items-start gap-6">
                <CategoryTile label="Dom Daddy" palette={CATEGORY_PALETTES["dom-daddy"]} />
                <CategoryTile label="Spicy" palette={CATEGORY_PALETTES.spicy} />
                <div className="flex flex-col gap-5">
                  <CategoryTile size="small" label="Dom Daddy" />
                  <CategoryTile size="mobile" label="Spicy" palette={CATEGORY_PALETTES.spicy} />
                </div>
              </div>
            </Well>
          </Group>
        </Section>

        {/* 12 OPEN */}
        <Section
          id="open"
          num="12"
          title="Open questions"
          note="What the Figma file did not give up, in the order it will block work. Nothing here stops Phase 2 starting."
        >
          <ol className="mt-6 flex list-none flex-col p-0">
            {OPEN_QUESTIONS.map(([title, body, ask], i) => (
              <li key={title} className="ref-rule grid grid-cols-[28px_minmax(0,1fr)] gap-5 border-t py-5.5">
                <span className="ref-mono text-red pt-1 text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4 className="mb-1.5 font-sans text-[17px] font-semibold text-white">{title}</h4>
                  <p className="text-white-60 max-w-[72ch] text-[15px]">{body}</p>
                  <span className="ref-mono ref-spec mt-2 inline-block text-[11.5px]">{ask}</span>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <footer className="ref-rule ref-mono ref-meta mt-20 flex flex-wrap gap-x-7 gap-y-2 border-t pt-7 text-[11px]">
          <span>Daddy Sounds design system · Phase 1</span>
          <span>Rendered from src/components</span>
          <span>Live version: npm run storybook</span>
        </footer>
      </main>
    </div>
  );
}

function TypeRow({ util, meta, sample }: { util: string; meta: string; sample: string }) {
  return (
    <>
      <div className={`ref-rule min-w-0 overflow-x-auto border-b py-5 text-white ${util}`}>{sample}</div>
      <div className="ref-rule ref-mono ref-meta border-b py-5 text-right text-[11px] leading-relaxed whitespace-nowrap tabular-nums">
        <em className="ref-spec block not-italic">.{util}</em>
        {meta}
      </div>
    </>
  );
}

function ButtonRow({
  variant,
  label,
}: {
  variant: "primary-white" | "primary-red" | "secondary" | "tertiary";
  label: string;
}) {
  return (
    <>
      <span className="ref-mono ref-spec text-[11px] whitespace-nowrap">{variant}</span>
      {([undefined, "hover", "active", "disabled"] as const).map((s) => (
        <Button key={String(s)} variant={variant} forceState={s} disabled={s === "disabled"}>
          {label}
        </Button>
      ))}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
