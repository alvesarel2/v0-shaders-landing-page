import { createClient } from "@/lib/supabase/server"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Copy, Calendar, History } from "lucide-react"

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select("id, user_id, specialty, topic, caption, hashtags, image_description, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-sans text-3xl font-light tracking-tight text-foreground mb-2">History</h1>
        <p className="text-foreground/60">Your previously generated content.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="group relative flex flex-col rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-all hover:bg-foreground/10 hover:border-foreground/20"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-medium text-foreground/80">
                {post.specialty}
              </span>
              <span className="flex items-center text-xs text-foreground/40">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR })}
              </span>
            </div>

            <h3 className="mb-2 font-medium text-foreground line-clamp-1">{post.topic}</h3>

            <div className="mb-4 flex-1 rounded-lg bg-background/50 p-3 text-sm text-foreground/80 line-clamp-4">
              {post.caption}
            </div>

            <div className="mt-auto pt-4 border-t border-foreground/5 flex items-center justify-between">
              <div className="text-xs text-foreground/40">{post.hashtags?.length || 0} hashtags</div>
              {/* Note: Copy functionality would need a client component wrapper or simple script */}
              <button className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1">
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
          </div>
        ))}

        {(!posts || posts.length === 0) && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
              <History className="w-6 h-6 text-foreground/40" />
            </div>
            <p className="text-foreground/60">No posts generated yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
