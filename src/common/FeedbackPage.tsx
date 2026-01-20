import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import LinkButton from "./LinkButton";

export default function FeedbackPage({
  title,
  description,
  success,
  redirectButton,
}: Readonly<{
  title: string;
  description: string;
  success: boolean;
  redirectButton?: {
    url: string;
    text: string;
    className?: string;
  };
}>) {
  const icon = success ? (
    <FaCheckCircle className="text-6xl text-brinco" />
  ) : (
    <FaTimesCircle className="text-6xl text-red-500" />
  );
  return (
    <div className="flex flex-col items-center gap-6 justify-center min-h-[70vh] p-4 text-center">
      {icon}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 max-w-md text-lg">{description}</p>
      {redirectButton && (
        <LinkButton
          url={redirectButton.url}
          text={redirectButton.text}
          className={redirectButton.className}
        />
      )}
    </div>
  );
}
