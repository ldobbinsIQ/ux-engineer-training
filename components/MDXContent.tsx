import { MDXRemote } from "next-mdx-remote/rsc"
import { VideoEmbed } from "@/components/mdx/VideoEmbed"
import { Diagram } from "@/components/mdx/Diagram"
import { TermTooltip } from "@/components/mdx/TermTooltip"
import { Callout } from "@/components/mdx/Callout"
import { KeyTerms } from "@/components/mdx/KeyTerms"
import { QuickSummary } from "@/components/mdx/QuickSummary"

const components = {
  VideoEmbed,
  Diagram,
  TermTooltip,
  Callout,
  KeyTerms,
  QuickSummary,
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:overflow-x-auto [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_table]:block [&_table]:overflow-x-auto">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
