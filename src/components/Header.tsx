import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  description: string;
  volume: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
};

type CartItem = Product & { quantity: number };

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
  cartItemsCount: number;
};

const Header = ({
  activeSection,
  setActiveSection,
  cart,
  isCartOpen,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
  cartTotal,
  cartItemsCount,
}: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <img src="https://cdn.poehali.dev/files/лого.png" alt="ÉLÉGANCE" className="h-10" />
          
          <nav className="hidden md:flex items-center gap-8">
            {['home', 'catalog', 'about', 'promo', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  activeSection === section ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'catalog' && 'Каталог'}
                {section === 'about' && 'О бренде'}
                {section === 'promo' && 'Акции'}
                {section === 'contact' && 'Контакты'}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Search" size={20} />
            </Button>
            
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 flex flex-col gap-6">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">Корзина пуста</p>
                  ) : (
                    <>
                      <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4 pb-4 border-b">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.brand}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                              <p className="font-medium">
                                {(item.discount
                                  ? item.price * (1 - item.discount / 100)
                                  : item.price
                                ).toLocaleString('ru-RU')} ₽
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-medium">Итого:</span>
                          <span className="text-2xl font-bold">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;