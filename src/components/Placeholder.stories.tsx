import type { Meta, StoryObj } from '@storybook/nextjs-vite'

function Placeholder() {
  return <p className="p-4 text-sm">Storybook is wired to the app theme. Real components arrive in Phase 1.</p>
}

const meta: Meta<typeof Placeholder> = { title: 'Setup/Placeholder', component: Placeholder }
export default meta
export const Default: StoryObj<typeof Placeholder> = {}
