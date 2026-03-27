import Image from "next/image"

interface DiagramProps {
  title: string
  src: string
  caption?: string
  alt?: string
}

export function Diagram({ title, src, caption, alt }: DiagramProps) {
  return (
    <figure className="not-prose my-6 rounded-xl border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b bg-muted/30">
        <p className="text-sm font-semibold text-foreground">{title}</p>
      </div>
      <div className="p-4 flex justify-center bg-white dark:bg-zinc-900">
        {src.endsWith(".svg") || src.endsWith(".png") || src.endsWith(".jpg") ? (
          <Image
            src={src}
            alt={alt ?? title}
            width={800}
            height={450}
            className="max-w-full h-auto"
            unoptimized={src.endsWith(".svg")}
          />
        ) : (
          <div className="text-muted-foreground text-sm italic">Diagram: {title}</div>
        )}
      </div>
      {caption && (
        <figcaption className="px-4 py-3 border-t text-xs text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
