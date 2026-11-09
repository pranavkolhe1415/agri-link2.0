import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Home, 
  CreditCard, 
  FileText, 
  Briefcase, 
  MessageSquare,
  Calendar,
  Users,
  Settings
} from 'lucide-react'

export function BottomNav({ activeTab, onTabChange, userRole }) {
  const { t } = useLanguage()

  const villagerTabs = [
    { id: 'dashboard', icon: Home, label: t('nav.dashboard') },
    { id: 'taxes', icon: CreditCard, label: t('nav.taxes') },
    { id: 'grievances', icon: MessageSquare, label: t('nav.grievances'), badge: 2 },
    { id: 'jobs', icon: Briefcase, label: t('nav.jobs'), badge: 5 },
    { id: 'events', icon: Calendar, label: t('nav.events') },
  ]

  const adminTabs = [
    { id: 'admin-dashboard', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'grievances', icon: MessageSquare, label: 'Grievances', badge: 8 },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  const tabs = userRole === 'admin' ? adminTabs : villagerTabs

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3 relative"
            size="sm"
          >
            <div className="relative">
              <tab.icon className="h-5 w-5" />
              {tab.badge && tab.badge > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium">{tab.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  )
}