import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const logoLight = joinSegments(baseDir, "static/gtr-logo.svg")
  const logoDark = joinSegments(baseDir, "static/gtr-logo-negativ.svg")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={logoLight} alt="" class="page-title-logo page-title-logo-light" />
        <img src={logoDark} alt="" class="page-title-logo page-title-logo-dark" />
        <span>{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
.page-title a {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  text-decoration: none;
}
.page-title-logo {
  height: 2.2em;
  width: auto;
  flex-shrink: 0;
}
.page-title-logo-dark { display: none; }
:root[saved-theme="dark"] .page-title-logo-light { display: none; }
:root[saved-theme="dark"] .page-title-logo-dark  { display: inline; }
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
