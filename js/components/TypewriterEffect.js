const { useState, useEffect } = React;

function TypewriterEffect() {
  const phrases = ['AI Frontend Vibe Coder.', 'Rishabh Yadav.'];
  const [wordIdx, setWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = phrases[wordIdx];
    let delay = isDeleting ? 40 : 85;

    if (!isDeleting && currentText === fullWord) {
      delay = 2400;
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % phrases.length);
      delay = 300;
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) => {
        if (!isDeleting) {
          if (prev === fullWord) {
            setIsDeleting(true);
            return prev;
          }
          return fullWord.substring(0, prev.length + 1);
        } else {
          return fullWord.substring(0, prev.length - 1);
        }
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIdx]);

  return (
    <span>
      {currentText}
      <span className="typewriter-caret">|</span>
    </span>
  );
}
