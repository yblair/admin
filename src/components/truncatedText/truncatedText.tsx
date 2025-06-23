const TruncatedText = ({
  text,
  maxLength = 28,
}: {
  text: string;
  maxLength?: number;
}) => {
  if (text.length < maxLength) {
    return <div>{text}</div>;
  }

  return <div title={text}>{text.slice(0, maxLength)}...</div>;
};

export default TruncatedText;
