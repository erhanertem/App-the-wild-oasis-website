function Logo() {
  return (
    <a href='/' className='flex items-center gap-4 z-10'>
      {/* src attr uses anything from public folder just like vite */}
      <img src='/logo.png' height='60' width='60' alt='The Wild Oasis logo' />
      <span className='text-xl font-semibold text-primary-100'>
        The Wild Oasis
      </span>
    </a>
  );
}

export default Logo;
