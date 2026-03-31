import { X } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  isDirty?: boolean;
}

interface VSCodeTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export default function VSCodeTabs({ tabs, activeTab, onTabSelect, onTabClose }: VSCodeTabsProps) {
  return (
    <div className="vscode-tabs">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabSelect(tab.id)}
          className={`vscode-tab ${activeTab === tab.id ? 'active' : ''}`}
        >
          <span className="flex-1">{tab.label}</span>
          {tab.isDirty && <span className="text-primary">●</span>}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            className="hover:bg-secondary p-0.5 rounded"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
