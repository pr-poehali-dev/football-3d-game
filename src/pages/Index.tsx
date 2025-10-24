import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type GameMode = 'player' | 'manager';
type Screen = 'menu' | 'create' | 'career' | 'transfers' | 'leaderboard';

interface Player {
  id: number;
  name: string;
  position: string;
  rating: number;
  club: string;
  value: number;
}

interface Club {
  id: number;
  name: string;
  league: string;
  budget: number;
}

const CLUBS: Club[] = [
  { id: 1, name: 'Реал Мадрид', league: 'Ла Лига', budget: 150000000 },
  { id: 2, name: 'Барселона', league: 'Ла Лига', budget: 120000000 },
  { id: 3, name: 'Манчестер Сити', league: 'АПЛ', budget: 180000000 },
  { id: 4, name: 'Бавария', league: 'Бундеслига', budget: 130000000 },
  { id: 5, name: 'ПСЖ', league: 'Лига 1', budget: 200000000 },
  { id: 6, name: 'Ливерпуль', league: 'АПЛ', budget: 140000000 },
];

const PLAYERS: Player[] = [
  { id: 1, name: 'Криштиану Роналду', position: 'НАП', rating: 91, club: 'Аль-Насср', value: 15000000 },
  { id: 2, name: 'Лионель Месси', position: 'НАП', rating: 93, club: 'Интер Майами', value: 25000000 },
  { id: 3, name: 'Килиан Мбаппе', position: 'НАП', rating: 92, club: 'Реал Мадрид', value: 180000000 },
  { id: 4, name: 'Эрлинг Холанд', position: 'НАП', rating: 91, club: 'Манчестер Сити', value: 170000000 },
  { id: 5, name: 'Винисиус Жуниор', position: 'ЛВ', rating: 89, club: 'Реал Мадрид', value: 150000000 },
  { id: 6, name: 'Жуде Беллингем', position: 'ПЗ', rating: 88, club: 'Реал Мадрид', value: 140000000 },
  { id: 7, name: 'Кевин Де Брюйне', position: 'ПЗ', rating: 90, club: 'Манчестер Сити', value: 80000000 },
  { id: 8, name: 'Родри', position: 'ОП', rating: 88, club: 'Манчестер Сити', value: 120000000 },
];

const LEADERBOARD: Player[] = [
  { id: 1, name: 'Эрлинг Холанд', position: 'НАП', rating: 91, club: 'Манчестер Сити', value: 170000000 },
  { id: 2, name: 'Килиан Мбаппе', position: 'НАП', rating: 92, club: 'Реал Мадрид', value: 180000000 },
  { id: 3, name: 'Лионель Месси', position: 'НАП', rating: 93, club: 'Интер Майами', value: 25000000 },
  { id: 4, name: 'Кевин Де Брюйне', position: 'ПЗ', rating: 90, club: 'Манчестер Сити', value: 80000000 },
  { id: 5, name: 'Винисиус Жуниор', position: 'ЛВ', rating: 89, club: 'Реал Мадрид', value: 150000000 },
];

export default function Index() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('player');
  const [playerName, setPlayerName] = useState('');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const startCareer = () => {
    if (playerName && selectedClub) {
      setScreen('career');
    }
  };

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4 font-roboto">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="relative z-10 text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-oswald font-bold tracking-wider bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
              FC SOCCER 26
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Построй футбольную карьеру мечты
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-md mx-auto pt-8">
            <Button 
              size="lg" 
              className="text-xl py-7 font-oswald tracking-wide bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-2xl"
              onClick={() => setScreen('create')}
            >
              <Icon name="Play" size={24} className="mr-2" />
              НАЧАТЬ КАРЬЕРУ
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-xl py-7 font-oswald tracking-wide border-2 hover:bg-card/50 transition-all duration-300 hover:scale-105"
              onClick={() => setScreen('leaderboard')}
            >
              <Icon name="Trophy" size={24} className="mr-2" />
              ТАБЛИЦА ЛИДЕРОВ
            </Button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Gamepad2" size={14} />
              <span>2 Режима карьеры</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Icon name="Users" size={14} />
              <span>Система трансферов</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>Празднования</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4 md:p-8 font-roboto">
        <Button 
          variant="ghost" 
          onClick={() => setScreen('menu')}
          className="mb-6 hover:bg-card/50"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <div className="max-w-4xl mx-auto space-y-8 animate-scale-in">
          <div className="text-center space-y-2">
            <h2 className="text-5xl font-oswald font-bold text-primary">СОЗДАНИЕ КАРЬЕРЫ</h2>
            <p className="text-muted-foreground">Настройте вашу футбольную судьбу</p>
          </div>

          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-oswald">Выберите режим игры</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={gameMode} onValueChange={(v) => setGameMode(v as GameMode)}>
                <TabsList className="grid w-full grid-cols-2 h-14">
                  <TabsTrigger value="player" className="text-lg font-oswald">
                    <Icon name="User" size={20} className="mr-2" />
                    ИГРОК
                  </TabsTrigger>
                  <TabsTrigger value="manager" className="text-lg font-oswald">
                    <Icon name="Briefcase" size={20} className="mr-2" />
                    ТРЕНЕР
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="player" className="space-y-6 pt-6">
                  <div className="bg-muted/30 p-6 rounded-lg border border-primary/10">
                    <h3 className="font-oswald text-xl mb-2 text-primary">Режим Игрока</h3>
                    <p className="text-sm text-muted-foreground">
                      Создайте собственного футболиста и проведите его через все этапы карьеры - 
                      от молодого таланта до легенды футбола. Переходите в лучшие клубы, выигрывайте трофеи.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="manager" className="space-y-6 pt-6">
                  <div className="bg-muted/30 p-6 rounded-lg border border-primary/10">
                    <h3 className="font-oswald text-xl mb-2 text-primary">Режим Тренера</h3>
                    <p className="text-sm text-muted-foreground">
                      Управляйте клубом, покупайте и продавайте игроков, разрабатывайте тактику. 
                      Стройте непобедимую команду и приведите её к чемпионству.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-oswald">Персонализация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-oswald">
                  {gameMode === 'player' ? 'Фамилия игрока' : 'Фамилия тренера'}
                </Label>
                <Input
                  id="name"
                  placeholder="Введите фамилию..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="text-lg py-6 border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-oswald">Выберите стартовый клуб</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CLUBS.map((club) => (
                    <button
                      key={club.id}
                      onClick={() => setSelectedClub(club)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 ${
                        selectedClub?.id === club.id
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-muted hover:border-primary/50 bg-card'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-oswald text-lg">{club.name}</h4>
                          <p className="text-sm text-muted-foreground">{club.league}</p>
                        </div>
                        {selectedClub?.id === club.id && (
                          <Icon name="CheckCircle2" size={20} className="text-primary" />
                        )}
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Бюджет: €{(club.budget / 1000000).toFixed(0)}M
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                className="w-full text-xl py-7 font-oswald tracking-wide mt-8 bg-primary hover:bg-primary/90 shadow-xl"
                onClick={startCareer}
                disabled={!playerName || !selectedClub}
              >
                <Icon name="Rocket" size={24} className="mr-2" />
                НАЧАТЬ КАРЬЕРУ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'leaderboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4 md:p-8 font-roboto">
        <Button 
          variant="ghost" 
          onClick={() => setScreen('menu')}
          className="mb-6 hover:bg-card/50"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <div className="max-w-5xl mx-auto space-y-8 animate-scale-in">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <Icon name="Trophy" size={48} className="text-accent animate-glow" />
              <h2 className="text-5xl font-oswald font-bold text-primary">ТАБЛИЦА ЛИДЕРОВ</h2>
            </div>
            <p className="text-muted-foreground">Топ футболистов мира</p>
          </div>

          <Card className="border-2 border-accent/20 shadow-2xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b-2 border-primary/20">
                    <tr>
                      <th className="p-4 text-left font-oswald text-lg">#</th>
                      <th className="p-4 text-left font-oswald text-lg">Игрок</th>
                      <th className="p-4 text-left font-oswald text-lg">Позиция</th>
                      <th className="p-4 text-left font-oswald text-lg">Клуб</th>
                      <th className="p-4 text-center font-oswald text-lg">Рейтинг</th>
                      <th className="p-4 text-right font-oswald text-lg">Стоимость</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LEADERBOARD.map((player, index) => (
                      <tr 
                        key={player.id}
                        className="border-b border-muted/30 hover:bg-primary/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {index === 0 && <Icon name="Crown" size={20} className="text-accent" />}
                            {index === 1 && <Icon name="Medal" size={20} className="text-gray-400" />}
                            {index === 2 && <Icon name="Award" size={20} className="text-amber-700" />}
                            <span className="font-oswald text-xl">{index + 1}</span>
                          </div>
                        </td>
                        <td className="p-4 font-medium">{player.name}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-oswald">
                            {player.position}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{player.club}</td>
                        <td className="p-4 text-center">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-oswald text-xl font-bold ${
                            player.rating >= 90 
                              ? 'bg-accent text-accent-foreground' 
                              : player.rating >= 85 
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {player.rating}
                          </div>
                        </td>
                        <td className="p-4 text-right font-oswald text-lg">
                          €{(player.value / 1000000).toFixed(0)}M
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
              <CardContent className="p-6 text-center">
                <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-accent" />
                <div className="text-3xl font-oswald font-bold text-accent">156</div>
                <div className="text-sm text-muted-foreground">Активных игроков</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
              <CardContent className="p-6 text-center">
                <Icon name="Globe" size={32} className="mx-auto mb-2 text-primary" />
                <div className="text-3xl font-oswald font-bold text-primary">42</div>
                <div className="text-sm text-muted-foreground">Стран</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
              <CardContent className="p-6 text-center">
                <Icon name="Target" size={32} className="mx-auto mb-2 text-secondary" />
                <div className="text-3xl font-oswald font-bold text-secondary">2,847</div>
                <div className="text-sm text-muted-foreground">Матчей сыграно</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'career') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4 md:p-8 font-roboto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setScreen('menu')}
            className="hover:bg-card/50"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Главное меню
          </Button>
          <div className="flex items-center gap-4">
            <Badge className="px-4 py-2 text-sm font-oswald bg-accent text-accent-foreground">
              <Icon name="User" size={16} className="mr-2" />
              {playerName}
            </Badge>
            <Badge className="px-4 py-2 text-sm font-oswald bg-primary text-primary-foreground">
              {selectedClub?.name}
            </Badge>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-5xl font-oswald font-bold text-primary">ПАНЕЛЬ КАРЬЕРЫ</h2>
            <p className="text-muted-foreground">Управляйте своей футбольной судьбой</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="p-6 text-center">
                <Icon name="Play" size={40} className="mx-auto mb-3 text-primary" />
                <div className="text-2xl font-oswald font-bold">Матч</div>
                <div className="text-sm text-muted-foreground mt-2">Сыграть игру</div>
              </CardContent>
            </Card>

            <Card 
              className="bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setScreen('transfers')}
            >
              <CardContent className="p-6 text-center">
                <Icon name="ArrowLeftRight" size={40} className="mx-auto mb-3 text-accent" />
                <div className="text-2xl font-oswald font-bold">Трансферы</div>
                <div className="text-sm text-muted-foreground mt-2">Купить/Продать</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="p-6 text-center">
                <Icon name="Users" size={40} className="mx-auto mb-3 text-secondary" />
                <div className="text-2xl font-oswald font-bold">Команда</div>
                <div className="text-sm text-muted-foreground mt-2">Состав</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-muted/20 to-muted/10 border-muted/30 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="p-6 text-center">
                <Icon name="BarChart3" size={40} className="mx-auto mb-3 text-foreground" />
                <div className="text-2xl font-oswald font-bold">Статистика</div>
                <div className="text-sm text-muted-foreground mt-2">Ваши показатели</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="font-oswald text-2xl flex items-center gap-2">
                  <Icon name="Calendar" size={24} className="text-primary" />
                  Ближайшие события
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-primary/10">
                  <div>
                    <div className="font-oswald">Чемпионский матч</div>
                    <div className="text-sm text-muted-foreground">Финал Лиги Чемпионов</div>
                  </div>
                  <Badge className="bg-primary">Через 3 дня</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-accent/10">
                  <div>
                    <div className="font-oswald">Празднование</div>
                    <div className="text-sm text-muted-foreground">День рождения клуба</div>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">Через 7 дней</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-secondary/10">
                  <div>
                    <div className="font-oswald">Трансферное окно</div>
                    <div className="text-sm text-muted-foreground">Летний период</div>
                  </div>
                  <Badge variant="outline">Открыто</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="font-oswald text-2xl flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} className="text-accent" />
                  Достижения сезона
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon name="Trophy" size={32} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-oswald text-lg">Голы забито</div>
                    <div className="text-3xl font-bold text-accent">24</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Target" size={32} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-oswald text-lg">Голевые передачи</div>
                    <div className="text-3xl font-bold text-primary">12</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Icon name="Star" size={32} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-oswald text-lg">Рейтинг</div>
                    <div className="text-3xl font-bold text-secondary">87</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'transfers') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4 md:p-8 font-roboto">
        <Button 
          variant="ghost" 
          onClick={() => setScreen('career')}
          className="mb-6 hover:bg-card/50"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к карьере
        </Button>

        <div className="max-w-7xl mx-auto space-y-8 animate-scale-in">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <Icon name="ArrowLeftRight" size={48} className="text-accent" />
              <h2 className="text-5xl font-oswald font-bold text-primary">ТРАНСФЕРНЫЙ РЫНОК</h2>
            </div>
            <p className="text-muted-foreground">Усильте свою команду</p>
          </div>

          <Card className="border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Доступный бюджет</div>
                  <div className="text-4xl font-oswald font-bold text-accent">
                    €{selectedClub ? (selectedClub.budget / 1000000).toFixed(0) : '0'}M
                  </div>
                </div>
                <Icon name="Wallet" size={48} className="text-accent/50" />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="buy" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 h-14">
              <TabsTrigger value="buy" className="text-lg font-oswald">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                КУПИТЬ ИГРОКОВ
              </TabsTrigger>
              <TabsTrigger value="clubs" className="text-lg font-oswald">
                <Icon name="Building2" size={20} className="mr-2" />
                ПЕРЕЙТИ В КЛУБ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              {PLAYERS.map((player) => (
                <Card 
                  key={player.id}
                  className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-oswald text-2xl font-bold ${
                          player.rating >= 90 
                            ? 'bg-accent text-accent-foreground' 
                            : 'bg-primary text-primary-foreground'
                        }`}>
                          {player.rating}
                        </div>
                        <div className="flex-1">
                          <div className="font-oswald text-xl">{player.name}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className="font-oswald">{player.position}</Badge>
                            <span className="text-sm text-muted-foreground">{player.club}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Стоимость</div>
                        <div className="text-2xl font-oswald font-bold text-accent">
                          €{(player.value / 1000000).toFixed(0)}M
                        </div>
                        <Button className="mt-2 font-oswald bg-primary hover:bg-primary/90">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          КУПИТЬ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="clubs" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CLUBS.map((club) => (
                <Card 
                  key={club.id}
                  className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-oswald text-2xl">{club.name}</h3>
                        <p className="text-muted-foreground">{club.league}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">Годовая зарплата</div>
                          <div className="text-xl font-oswald font-bold text-accent">
                            €{(club.budget * 0.1 / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <Button className="font-oswald bg-accent text-accent-foreground hover:bg-accent/90">
                          <Icon name="ArrowRight" size={16} className="mr-2" />
                          ПЕРЕЙТИ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return null;
}
