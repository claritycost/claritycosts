export default function PolicyLayout({ tag, title, highlight, subtitle, children }) {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-tag">{tag}</div>
          <h1>{title} <span className="green">{highlight}</span></h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className="prose">
        {children}
      </div>
    </>
  )
}
