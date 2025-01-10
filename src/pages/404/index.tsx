const NotFound = (): JSX.Element => {
  return (
    <>
      <div className="text-center flex flex-col gap-6 h-screen justify-center">
        <p className="font-semibold text-2xl">
          Sorry, this page isn't available.
        </p>
        <p>
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <a className="text-blue-900" href="/">
            Go back to Home.
          </a>
        </p>
      </div>
    </>
  );
};

export default NotFound;
