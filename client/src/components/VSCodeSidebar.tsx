import { FileText, Folder, Code2, Mail, Github, Linkedin } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: 'folder' | 'file';
  children?: SidebarItem[];
}

interface VSCodeSidebarProps {
  activeFile: string;
  onFileSelect: (fileId: string) => void;
}

export default function VSCodeSidebar({ activeFile, onFileSelect }: VSCodeSidebarProps) {
  const sidebarItems: SidebarItem[] = [
    {
      id: 'about',
      label: 'About.py',
      icon: <FileText size={16} />,
      type: 'file',
    },
    {
      id: 'skills',
      label: 'Skills.py',
      icon: <FileText size={16} />,
      type: 'file',
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <Folder size={16} />,
      type: 'folder',
      children: [
        {
          id: 'project-1',
          label: 'DataAnalysisDashboard.py',
          icon: <FileText size={16} />,
          type: 'file',
        },
        {
          id: 'project-2',
          label: 'DatabaseOptimization.py',
          icon: <FileText size={16} />,
          type: 'file',
        },
        {
          id: 'project-3',
          label: 'WebScraper.py',
          icon: <FileText size={16} />,
          type: 'file',
        },
        {
          id: 'project-4',
          label: 'BootstrapDashboard.html',
          icon: <FileText size={16} />,
          type: 'file',
        },
      ],
    },
    {
      id: 'contact',
      label: 'Contact.py',
      icon: <FileText size={16} />,
      type: 'file',
    },
  ];

  const renderItem = (item: SidebarItem, level: number = 0) => (
    <div key={item.id}>
      <div
        onClick={() => onFileSelect(item.id)}
        className={`vscode-file-item ${activeFile === item.id ? 'active' : ''}`}
        style={{ paddingLeft: `${level * 16 + 16}px` }}
      >
        <span className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
      </div>
      {item.children && item.type === 'folder' && (
        <div>
          {item.children.map((child) => renderItem(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="vscode-sidebar">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-sm font-bold text-sidebar-foreground mb-4">EXPLORER</h2>
        <div className="space-y-1">
          {sidebarItems.map((item) => renderItem(item))}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase">Connect</h3>
        <div className="space-y-2">
          <a
            href="https://github.com/yash-pawade"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yash-pawade-6125a5379"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=yashpawade19@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <Mail size={16} />
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
