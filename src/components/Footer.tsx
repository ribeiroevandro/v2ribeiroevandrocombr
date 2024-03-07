const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="flex flex-col gap-2 sm:flex-row justify-center items-center max-w-6xl container mx-auto p-10">
        <p className="text-xs font-semibold">
          © {new Date().getFullYear()} Evandro Ribeiro. Todos os direitos
          reservados
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-xs hover:underline underline-offset-4"
            href="https://linkedin.com/in/ribeiroevandro"
          >
            Desenvolvido por: <strong>Evandro Ribeiro</strong>
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
