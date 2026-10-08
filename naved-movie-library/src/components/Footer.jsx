function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>Naved Movie Library</p>
        <p className="footer-credit">
          Film data and images from{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          . This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
