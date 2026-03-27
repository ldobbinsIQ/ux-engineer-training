interface Term {
  term: string
  definition: string
}

interface KeyTermsProps {
  terms?: Term[]
}

export function KeyTerms({ terms = [] }: KeyTermsProps) {
  if (!terms || terms.length === 0) return null
  return (
    <div className="not-prose my-6 rounded-xl border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b bg-muted/30">
        <p className="text-sm font-semibold text-foreground">Key Terms</p>
      </div>
      <dl className="divide-y">
        {terms.map(({ term, definition }) => (
          <div key={term} className="px-4 py-3 flex gap-3">
            <dt className="text-sm font-semibold text-foreground min-w-[120px] shrink-0">{term}</dt>
            <dd className="text-sm text-muted-foreground">{definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
