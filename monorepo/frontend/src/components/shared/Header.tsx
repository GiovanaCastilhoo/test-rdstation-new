import logo from '../../assets/images/logo.png';

export function Header(): JSX.Element {

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-lg text-gray-800">RD Station</span>
        </div>
      </div>

    </header>
  );
}
