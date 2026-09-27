from langdetect import detect, DetectorFactory
import logging

# Ensure consistent results
DetectorFactory.seed = 0
logger = logging.getLogger(__name__)

def detect_language(text: str) -> str:
    try:
        lang = detect(text)
        if lang == 'hi':
            return 'hi'
        return 'en' # Default to english for anything else
    except Exception as e:
        logger.warning(f"Language detection failed: {e}")
        return 'en'
