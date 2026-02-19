import { QuartzTransformerPlugin } from "../types"
import { Root, Element, ElementContent } from "hast"
import { formatDate } from "../../components/Date"
import readingTime from "reading-time"
import { i18n } from "../../i18n"
import { resolveRelative } from "../../util/path"
import { FullSlug } from "../../util/path"

/**
 * For pages with cssclasses: [hide-title], injects content-meta (date, reading time)
 * and tags directly after the first <h1> in the HTML tree. The corresponding elements
 * in the page header are hidden via CSS (see custom.scss).
 */
export const HideTitle: QuartzTransformerPlugin = () => {
  return {
    name: "HideTitle",
    htmlPlugins(ctx) {
      return [
        () => {
          return (tree: Root, file) => {
            const cssclasses: string[] = file.data.frontmatter?.cssclasses ?? []
            if (!cssclasses.includes("hide-title")) {
              return
            }

            const metaNodes = buildMetaNodes(ctx.cfg.configuration, file)
            const children = tree.children as ElementContent[]

            for (let i = 0; i < children.length; i++) {
              const child = children[i]
              if (child.type === "element" && child.tagName === "h1") {
                children.splice(i + 1, 0, ...metaNodes)
                return
              }
            }

            // No h1 found — prepend
            children.unshift(...metaNodes)
          }
        },
      ]
    },
  }
}

function buildMetaNodes(cfg: any, file: any): Element[] {
  const nodes: Element[] = []

  // Content meta (date + reading time)
  const metaChildren: ElementContent[] = []

  const defaultDateType = cfg.defaultDateType
  const date = file.data.dates?.[defaultDateType]
  if (date) {
    metaChildren.push({
      type: "element",
      tagName: "time",
      properties: { datetime: date.toISOString() },
      children: [{ type: "text", value: formatDate(date, cfg.locale) }],
    })
  }

  const text = file.data.text
  if (text) {
    const { minutes } = readingTime(text)
    const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
      minutes: Math.ceil(minutes),
    })
    if (metaChildren.length > 0) {
      metaChildren.push({ type: "text", value: ", " })
    }
    metaChildren.push({
      type: "element",
      tagName: "span",
      properties: {},
      children: [{ type: "text", value: displayedTime }],
    })
  }

  if (metaChildren.length > 0) {
    nodes.push({
      type: "element",
      tagName: "p",
      properties: { className: ["content-meta"], "show-comma": "true" },
      children: metaChildren,
    })
  }

  // Tags
  const tags: string[] = file.data.frontmatter?.tags ?? []
  if (tags.length > 0) {
    const slug = file.data.slug!
    nodes.push({
      type: "element",
      tagName: "ul",
      properties: { className: ["tags"] },
      children: tags.map(
        (tag: string): Element => ({
          type: "element",
          tagName: "li",
          properties: {},
          children: [
            {
              type: "element",
              tagName: "a",
              properties: {
                href: resolveRelative(slug, `tags/${tag}` as FullSlug),
                className: ["internal", "tag-link"],
              },
              children: [{ type: "text", value: tag }],
            },
          ],
        }),
      ),
    })
  }

  return nodes
}
