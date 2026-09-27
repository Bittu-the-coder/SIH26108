import litellm
from app.config import settings
import logging

logger = logging.getLogger(__name__)

async def translate_to_english(text: str) -> str:
    prompt = f"Translate the following Hindi text to English. Respond ONLY with the translation.\n\nText: {text}"
    try:
        response = await litellm.acompletion(
            api_key=settings.GEMINI_API_KEY,
            model="gemini/gemini-2.0-flash",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"Translation failed: {e}")
        return text # fallback to original
