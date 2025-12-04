import "./history.scss";

export default function HistoryPage() {
  const mockHistory = [
    { name: "merged_01.pdf", date: "2025-01-03" },
    { name: "school_docs.pdf", date: "2025-01-10" },
    { name: "project_merge.pdf", date: "2025-01-30" },
  ];

  return (
    <div className="history-container uk-container">
      <h1 className="uk-heading-medium uk-text-center">History</h1>

      <div className="history-list uk-card uk-card-default uk-card-body">
        {mockHistory.map((item, index) => (
          <div key={index} className="history-row">
            <span>📄 {item.name}</span>
            <span>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
