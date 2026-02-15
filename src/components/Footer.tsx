const Footer = () => {
  return (
    <footer className="py-10 px-6 md:px-12 border-t border-border/20 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-serif text-lg tracking-wider text-primary">SHIKOR</p>
        <p className="font-sans text-xs text-muted-foreground tracking-wide">
          © {new Date().getFullYear()} Shikor Hunting Club. All rights reserved.
        </p>
        <p className="font-sans text-xs text-muted-foreground">
          Licensed by the State Committee for Ecology, Republic of Uzbekistan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
