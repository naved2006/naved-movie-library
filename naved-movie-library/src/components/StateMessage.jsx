function StateMessage({ title, children, action, tone = "neutral" }) {
  return (
    <div
      className={`state${tone === "error" ? " state-error" : ""}`}
      role={tone === "error" ? "alert" : undefined}
    >
      <p className="state-title">{title}</p>
      {children && <p className="state-text">{children}</p>}
      {action}
    </div>
  );
}

export default StateMessage;
