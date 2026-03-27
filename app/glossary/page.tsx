import { GlossaryClient } from "@/components/glossary/GlossaryClient"
import { glossaryTerms, categories } from "@/lib/glossary"

export const metadata = {
  title: "Glossary — UX Engineer Training",
}

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Glossary</h1>
        <p className="text-muted-foreground">
          Acronyms, terms, and concepts used throughout the curriculum — with plain-language definitions.
        </p>
      </div>
      <GlossaryClient terms={glossaryTerms} categories={categories} />
    </div>
  )
}
