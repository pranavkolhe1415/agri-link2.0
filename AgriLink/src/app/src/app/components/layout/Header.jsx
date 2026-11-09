import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { 
  Leaf, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Sun, 
  Moon,
  Languages
} from 'lucide-react'

export function Header({ title, notifications = 0 }) {
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary rounded-lg p-2">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold">{title}</h1>
            <p className="text-xs text-muted-foreground">
              {user?.village} Village • {user?.role === 'admin' ? 'Admin' : 'Villager'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {notifications > 9 ? '9+' : notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    +91-{user?.mobile}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center space-x-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    +91-{user?.mobile}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {/* Language Selector */}
              <div className="px-2 py-1">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  <Languages className="mr-1 h-3 w-3 inline" />
                  Language
                </p>
                <div className="grid grid-cols-3 gap-1">
                  <Button
                    variant={language === 'en' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLanguage('en')}
                    className="text-xs h-7"
                  >
                    EN
                  </Button>
                  <Button
                    variant={language === 'hi' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLanguage('hi')}
                    className="text-xs h-7"
                  >
                    हि
                  </Button>
                  <Button
                    variant={language === 'mr' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLanguage('mr')}
                    className="text-xs h-7"
                  >
                    मर
                  </Button>
                </div>
              </div>
              
              <DropdownMenuSeparator />
              
              {/* Theme Toggle */}
              <DropdownMenuItem onClick={toggleTheme}>
                {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                {t('auth.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}