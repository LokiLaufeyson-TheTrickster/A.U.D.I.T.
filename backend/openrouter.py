import os
from openai import OpenAI
import time

class OpenRouterClient:
    def __init__(self, api_key, model_priority=None):
        self.api_key = api_key
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
        )
        self.model_priority = model_priority or ["google/gemini-2.0-flash-001", "anthropic/claude-3-haiku", "openai/gpt-4o-mini"]

    def chat_completion(self, messages, temperature=0.7):
        for model in self.model_priority:
            try:
                response = self.client.chat.completions.create(
                    model=model,
                    messages=messages,
                    temperature=temperature,
                    extra_headers={
                        "HTTP-Referer": "https://prism.audit.ai", # Optional
                        "X-Title": "A.U.D.I.T. v2.0", # Optional
                    }
                )
                return {
                    "content": response.choices[0].message.content,
                    "model": model,
                    "status": "success"
                }
            except Exception as e:
                print(f"Error with model {model}: {str(e)}")
                continue
        
        return {"content": "All models failed.", "status": "error"}

    def test_connection(self):
        start_time = time.time()
        try:
            # 0-token ping equivalent: list models or just try a tiny completion
            self.client.models.list()
            latency = (time.time() - start_time) * 1000
            return {"status": "connected", "latency": f"{latency:.2f}ms"}
        except Exception as e:
            return {"status": "failed", "error": str(e)}

# Client will be initialized with user key at runtime
