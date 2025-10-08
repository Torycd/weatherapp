import errorLogo from "../assets/images/icon-error.svg";
import retryLogo from "../assets/images/icon-retry.svg";

function ErrorPage({ handleRetry }) {
  return (
    <div className="mt-5 font-bricolage flex justify-center items-center flex-col text-center gap-1">
      <img src={errorLogo} alt="error image" className="w-12 h-12" />
      <h1 className="text-5xl font-semibold">Something went wrong</h1>
      <p>
        We couldnt connect to the server (Api error). Please try
        <br /> again in a few moments.
      </p>
      <button
        className="flex bg-blue-900 space-x-2 opacity-75 px-3 py-1 rounded-md"
        onClick={handleRetry}
      >
        <img src={retryLogo} />
        <span>Retry</span>
      </button>
    </div>
  );
}

export default ErrorPage;
